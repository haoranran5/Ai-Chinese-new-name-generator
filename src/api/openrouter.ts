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

  const genderText = gender === 'male' ? 'male'
                   : gender === 'female' ? 'female'
                   : 'neutral';
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
5. Please return only the JSON array, with no additional explanation or markdown.
  
Example format:
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
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // --- 日志打印 ---
    console.log('Fetch status:', response.status, response.statusText);
    const rawText = await response.text();
    console.log('Fetch response text:', rawText);

    // 尝试将 rawText 转为 JSON
    let data: any;
    try {
      data = JSON.parse(rawText);
    } catch (jsonErr) {
      console.error('Failed to JSON.parse response text:', jsonErr);
      throw new Error('Invalid JSON from API');
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const content = data.choices?.[0]?.message?.content;
    console.log('GPT raw content:', content);
    if (!content) {
      throw new Error('No content received from API');
    }

    // 清理并解析 JSON 数组
    const clean = content.replace(/```json[\s\S]*?```/g, '').trim();
    console.log('Cleaned content for JSON.parse:', clean);
    const parsedNames = JSON.parse(clean) as Array<{ name: string; pinyin: string; meaning: string }>;
    console.log('Parsed names array:', parsedNames);

    // 格式化输出
    const formattedNames: NameData[] = parsedNames.map((item, idx) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: item.name || `Name${idx + 1}`,
      pinyin: item.pinyin || '',
      meaning: item.meaning || '',
      gender
    }));

    return { names: formattedNames };

  } catch (error) {
    console.error('Error in generateNames:', error);

    // 兜底示例数据
    const fallbackNames: NameData[] = [
      { id: Math.random().toString(36).substr(2, 9), name: '明杰', pinyin: 'Míng Jié', meaning: 'Bright and outstanding...', gender },
      { id: Math.random().toString(36).substr(2, 9), name: '文华', pinyin: 'Wén Huá', meaning: 'Cultured and elegant...', gender },
      { id: Math.random().toString(36).substr(2, 9), name: '志强', pinyin: 'Zhì Qiáng', meaning: 'Strong-willed and determined...', gender },
      { id: Math.random().toString(36).substr(2, 9), name: '思雅', pinyin: 'Sī Yǎ', meaning: 'Thoughtful and refined...', gender },
      { id: Math.random().toString(36).substr(2, 9), name: '博文', pinyin: 'Bó Wén', meaning: 'Knowledgeable and literary...', gender }
    ];

    return { names: fallbackNames };
  }
};
