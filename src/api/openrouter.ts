export interface GenerateRequest {
  englishName: string;
  gender: string;
  style: string;
}

export interface NameData {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
}

export interface GenerateResponse {
  names: NameData[];
}

const OPENROUTER_API_KEY = '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';

export const generateNames = async (request: GenerateRequest): Promise<GenerateResponse> => {
  const { englishName, gender, style } = request;

  const genderText = gender === 'male' ? 'male' : gender === 'female' ? 'female' : 'neutral';
  const styleText = {
    traditional: 'traditional and classic',
    modern: 'modern and contemporary',
    business: 'professional and business-like',
    cute: 'cute and playful',
    neutral: 'neutral and balanced'
  }[style] || 'traditional and classic';

  const prompt = `Generate 5 suitable Chinese names for the English name "${englishName}". Requirements:
1. Gender: ${genderText}
2. Style: ${styleText}
3. Each name should include: Chinese characters, pinyin pronunciation, and English meaning explanation
4. Names should follow Chinese cultural traditions with positive meanings
5. Please return strictly in the following JSON format with no other text:

[
  {
    "name": "明杰",
    "pinyin": "Míng Jié", 
    "meaning": "Bright and outstanding, representing intelligence and excellence"
  },
  {
    "name": "文华",
    "pinyin": "Wén Huá",
    "meaning": "Cultured and elegant, symbolizing literary talent and refinement"
  }
]`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from API');
    }

    let parsedNames;
    try {
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      parsedNames = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse API response:', content);
      throw new Error('Failed to parse API response');
    }

    const formattedNames: NameData[] = parsedNames.map((name: any, index: number) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: name.name || `Name${index + 1}`,
      pinyin: name.pinyin || '',
      meaning: name.meaning || 'Beautiful meaning',
      gender: request.gender
    }));

    return { names: formattedNames };

  } catch (error) {
    console.error('Error generating names:', error);

    const fallbackNames: NameData[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '明杰',
        pinyin: 'Míng Jié',
        meaning: 'Bright and outstanding, representing intelligence and excellence',
        gender: request.gender
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '文华',
        pinyin: 'Wén Huá',
        meaning: 'Cultured and elegant, symbolizing literary talent and refinement',
        gender: request.gender
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '志强',
        pinyin: 'Zhì Qiáng',
        meaning: 'Strong-willed and determined, embodying ambition and resilience',
        gender: request.gender
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '思雅',
        pinyin: 'Sī Yǎ',
        meaning: 'Thoughtful and refined, representing wisdom and grace',
        gender: request.gender
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '博文',
        pinyin: 'Bó Wén',
        meaning: 'Knowledgeable and literary, signifying vast learning and culture',
        gender: request.gender
      }
    ];

    return { names: fallbackNames };
  }
};
