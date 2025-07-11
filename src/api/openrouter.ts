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

// 确保请求头包含正确的认证信息
headers: {
  'Authorization': `Bearer ${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}`,
  'Content-Type': 'application/json'
}

// 🔧 使用新的API key和DeepSeek模型（删除重复定义）
const OPENROUTER_API_KEY = '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';

// 🔧 方法2：使用环境变量（推荐）
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';

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
        'HTTP-Referer': 'https://chinesecharactername.top', // 使用你的实际域名
        'X-Title': 'Chinese Name Generator' // 添加应用标题
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-llama-70b:free', // 🔧 使用DeepSeek免费模型
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // 日志打印
    console.log('📊 API响应状态:', response.status, response.statusText);
    const rawText = await response.text();
    console.log('📄 API响应内容:', rawText);

    // 检查响应状态
    if (!response.ok) {
      console.error('❌ API请求失败:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    // 解析响应
    let data: any;
    try {
      data = JSON.parse(rawText);
    } catch (jsonErr) {
      console.error('❌ JSON解析失败:', jsonErr);
      throw new Error('Invalid JSON from API');
    }

    const content = data.choices?.[0]?.message?.content;
    console.log('🎯 GPT返回内容:', content);
    
    if (!content) {
      throw new Error('No content received from API');
    }

    // 清理并解析 JSON 数组
    const clean = content
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^[^[\{]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();
    
    console.log('🧹 清理后的JSON:', clean);
    
    const parsedNames = JSON.parse(clean) as Array<{ name: string; pinyin: string; meaning: string }>;
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

    // 兜底示例数据
    const fallbackNames: NameData[] = [
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
