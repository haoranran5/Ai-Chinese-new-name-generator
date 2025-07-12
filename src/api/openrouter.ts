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

// 🔧 安全的API密钥获取
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const generateNames = async (request: GenerateRequest): Promise<GenerateResponse> => {
  // 检查API密钥是否配置
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API密钥未配置，请检查环境变量');
  }

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

  const prompt = `请为英文名 "${englishName}" 生成5个合适的中文名字。要求：
1. 性别：${genderText}
2. 风格：${styleText}
3. 每个名字包含：中文字符、拼音发音、寓意解释
4. 遵循中国文化传统，寓意积极正面
5. 请只返回JSON数组，不要其他说明或markdown格式

示例格式：
[
  {
    "name": "明杰",
    "pinyin": "Míng Jié",
    "meaning": "聪明杰出，象征智慧与卓越"
  },
  {
    "name": "文华",
    "pinyin": "Wén Huá",
    "meaning": "文雅华贵，寓意才华横溢，气质高雅"
  }
]`;

  try {
    console.log('🚀 发送API请求...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://chinesecharactername.top',
        'X-Title': 'Chinese Name Generator'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-llama-70b:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    console.log('📊 API响应状态:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API请求失败:', response.status, errorText);
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('📄 API响应内容:', data);

    const content = data.choices?.[0]?.message?.content;
    console.log('🎯 GPT返回内容:', content);
    
    if (!content) {
      throw new Error('API未返回有效内容');
    }

    // 清理并解析 JSON 数组
    const cleanContent = content
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^[^[\{]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();
    
    console.log('🧹 清理后的JSON:', cleanContent);
    
    const parsedNames = JSON.parse(cleanContent) as Array<{ 
      name: string; 
      pinyin: string; 
      meaning: string; 
    }>;
    
    console.log('✅ 解析成功:', parsedNames);

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
    console.error('❌ generateNames错误:', error);

    // 兜底数据
    const fallbackNames: NameData[] = gender === 'female' 
      ? [
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '雅琪',
            pinyin: 'Yǎ Qí',
            meaning: '优雅如美玉，象征高贵与纯洁',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '诗涵',
            pinyin: 'Shī Hán',
            meaning: '诗意盎然，内涵丰富，寓意才华与智慧',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '梦瑶',
            pinyin: 'Mèng Yáo',
            meaning: '如梦似幻，美玉般珍贵，象征美好与希望',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '晓萱',
            pinyin: 'Xiǎo Xuān',
            meaning: '晨曦中的萱草，寓意清新与活力',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '语桐',
            pinyin: 'Yǔ Tóng',
            meaning: '语言如梧桐叶，寓意优雅与智慧',
            gender
          }
        ]
      : [
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '晓峰',
            pinyin: 'Xiǎo Fēng',
            meaning: '晨光中的山峰，象征清新与坚定',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '雅轩',
            pinyin: 'Yǎ Xuān',
            meaning: '优雅的轩窗，寓意高雅与舒适',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '泽宇',
            pinyin: 'Zé Yǔ',
            meaning: '恩泽普照天地，象征广阔与福气',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '思源',
            pinyin: 'Sī Yuán',
            meaning: '不忘初心，常念根源，寓意感恩与踏实',
            gender
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '茗熙',
            pinyin: 'Míng Xī',
            meaning: '茶香与晨曦，象征清雅与朝气',
            gender
          }
        ];

    console.log('🔄 使用兜底数据');
    return { names: fallbackNames };
  }
};
