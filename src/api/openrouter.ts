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

// 🔧 API密钥配置
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';

export const generateNames = async (request: GenerateRequest): Promise<GenerateResponse> => {
  const { englishName, gender, style } = request;

  // 检查API密钥
  if (!OPENROUTER_API_KEY) {
    console.error('❌ OpenRouter API密钥未配置');
    throw new Error('API密钥未配置，请检查环境变量');
  }

  const genderText = gender === 'male' ? '男性'
                   : gender === 'female' ? '女性'
                   : '中性';
  
  const styleText = {
    traditional: '传统经典',
    modern: '现代时尚',
    business: '商务专业',
    cute: '可爱活泼',
    neutral: '中性平衡'
  }[style] || '传统经典';

  // 优化的提示词，要求更严格的JSON格式
  const prompt = `请为英文名 "${englishName}" 生成5个合适的中文名字。

要求：
1. 性别：${genderText}
2. 风格：${styleText}
3. 每个名字必须包含：中文字符、拼音发音、寓意解释
4. 遵循中国文化传统，寓意积极正面
5. 请严格按照以下JSON格式返回，不要包含任何其他文字或markdown格式：

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
]

请确保返回的是有效的JSON数组格式。`;

  try {
    console.log('🚀 开始调用OpenRouter API...');
    console.log('📝 使用模型: deepseek/deepseek-r1-distill-llama-70b:free');
    
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
        messages: [
          {
            role: 'system',
            content: '你是一个专业的中文起名专家，擅长根据英文名生成有意义的中文名字。请严格按照要求的JSON格式返回结果。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    console.log('📊 API响应状态:', response.status);
    console.log('📊 API响应头:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API请求失败:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      // 根据不同错误状态码提供更具体的错误信息
      if (response.status === 401) {
        throw new Error('API密钥无效，请检查配置');
      } else if (response.status === 429) {
        throw new Error('API调用频率过高，请稍后重试');
      } else if (response.status === 500) {
        throw new Error('服务器内部错误，请稍后重试');
      } else {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('📄 完整API响应:', JSON.stringify(data, null, 2));

    // 检查响应结构
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ API响应格式异常:', data);
      throw new Error('API响应格式异常');
    }

    const content = data.choices[0].message.content;
    console.log('🎯 AI返回的原始内容:', content);
    
    if (!content) {
      throw new Error('API未返回有效内容');
    }

    // 更强健的JSON解析
    let parsedNames;
    try {
      // 清理内容，移除可能的markdown格式和多余字符
      let cleanContent = content.trim();
      
      // 移除可能的markdown代码块标记
      cleanContent = cleanContent.replace(/```json\s*/g, '');
      cleanContent = cleanContent.replace(/```\s*/g, '');
      
      // 查找JSON数组的开始和结束
      const startIndex = cleanContent.indexOf('[');
      const endIndex = cleanContent.lastIndexOf(']');
      
      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        cleanContent = cleanContent.substring(startIndex, endIndex + 1);
      }
      
      console.log('🧹 清理后的JSON内容:', cleanContent);
      
      parsedNames = JSON.parse(cleanContent);
      
      // 验证解析结果
      if (!Array.isArray(parsedNames)) {
        throw new Error('解析结果不是数组');
      }
      
      console.log('✅ JSON解析成功:', parsedNames);
      
    } catch (parseError) {
      console.error('❌ JSON解析失败:', parseError);
      console.log('🔄 尝试使用正则表达式提取JSON...');
      
      // 备用解析方法：使用正则表达式
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          parsedNames = JSON.parse(jsonMatch[0]);
          console.log('✅ 正则表达式解析成功:', parsedNames);
        } catch (regexError) {
          console.error('❌ 正则表达式解析也失败:', regexError);
          throw new Error('无法解析AI返回的内容');
        }
      } else {
        throw new Error('无法从AI响应中提取有效的JSON');
      }
    }

    // 验证和格式化数据
    const formattedNames: NameData[] = parsedNames
      .filter((item: any) => item && item.name && item.pinyin && item.meaning)
      .slice(0, 5) // 确保最多5个名字
      .map((item: any, idx: number) => ({
        id: `${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 9)}`,
        name: item.name.trim(),
        pinyin: item.pinyin.trim(),
        meaning: item.meaning.trim(),
        gender
      }));

    if (formattedNames.length === 0) {
      throw new Error('AI返回的名字格式不正确');
    }

    console.log('✅ 最终格式化的名字:', formattedNames);
    return { names: formattedNames };

  } catch (error) {
    console.error('❌ generateNames完整错误信息:', error);

    // 提供更好的兜底数据
    const fallbackNames: NameData[] = gender === 'female' 
      ? [
          {
            id: `fallback-${Date.now()}-1`,
            name: '雅琪',
            pinyin: 'Yǎ Qí',
            meaning: '优雅如美玉，象征高贵与纯洁的品格',
            gender
          },
          {
            id: `fallback-${Date.now()}-2`,
            name: '诗涵',
            pinyin: 'Shī Hán',
            meaning: '诗意盎然，内涵丰富，寓意才华与智慧并重',
            gender
          },
          {
            id: `fallback-${Date.now()}-3`,
            name: '梦瑶',
            pinyin: 'Mèng Yáo',
            meaning: '如梦似幻，美玉般珍贵，象征美好与希望',
            gender
          },
          {
            id: `fallback-${Date.now()}-4`,
            name: '晓萱',
            pinyin: 'Xiǎo Xuān',
            meaning: '晨曦中的萱草，寓意清新活力与朝气蓬勃',
            gender
          },
          {
            id: `fallback-${Date.now()}-5`,
            name: '语桐',
            pinyin: 'Yǔ Tóng',
            meaning: '语言如梧桐叶般优美，寓意智慧与优雅',
            gender
          }
        ]
      : [
          {
            id: `fallback-${Date.now()}-1`,
            name: '晓峰',
            pinyin: 'Xiǎo Fēng',
            meaning: '晨光中的山峰，象征坚定意志与远大理想',
            gender
          },
          {
            id: `fallback-${Date.now()}-2`,
            name: '雅轩',
            pinyin: 'Yǎ Xuān',
            meaning: '优雅的轩窗，寓意高雅品味与舒适生活',
            gender
          },
          {
            id: `fallback-${Date.now()}-3`,
            name: '泽宇',
            pinyin: 'Zé Yǔ',
            meaning: '恩泽普照天地，象征广阔胸怀与福泽深厚',
            gender
          },
          {
            id: `fallback-${Date.now()}-4`,
            name: '思源',
            pinyin: 'Sī Yuán',
            meaning: '不忘初心，常念根源，寓意感恩与踏实品格',
            gender
          },
          {
            id: `fallback-${Date.now()}-5`,
            name: '茗熙',
            pinyin: 'Míng Xī',
            meaning: '茶香与晨曦，象征清雅品味与朝气活力',
            gender
          }
        ];

    console.log('🔄 使用兜底数据，确保用户体验');
    return { names: fallbackNames };
  }
};