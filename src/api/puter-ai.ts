// Puter.js AI 接口
import puter from 'puter';

// 类型定义
export interface GenerateRequest {
  englishName: string;
  gender: 'male' | 'female' | 'neutral';
  style: 'traditional' | 'modern' | 'business' | 'cute' | 'neutral';
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

// 🎯 构建提示词
const buildPrompt = (englishName: string, gender: string, style: string): string => {
  const genderMap = {
    male: '男性',
    female: '女性',
    neutral: '中性'
  };

  const styleMap = {
    traditional: '传统典雅',
    modern: '现代时尚',
    business: '商务专业',
    cute: '可爱活泼',
    neutral: '中性平衡'
  };

  const genderText = genderMap[gender as keyof typeof genderMap] || '中性';
  const styleText = styleMap[style as keyof typeof styleMap] || '传统典雅';

  return `请为英文名 "${englishName}" 生成5个合适的中文名字。要求：
1. 性别倾向：${genderText}
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
};

// 🧹 清理和解析 JSON 响应
const parseAiResponse = (content: string): Array<{ name: string; pinyin: string; meaning: string }> => {
  if (!content) {
    throw new Error('AI未返回有效内容');
  }

  // 清理JSON内容
  const cleanContent = content
    .replace(/```json\s*/g, '')
    .replace(/```\s*/g, '')
    .replace(/^[^[\{]*/, '')
    .replace(/[^}\]]*$/, '')
    .trim();
  
  console.log('🧹 清理后的JSON:', cleanContent);
  
  try {
    const parsedNames = JSON.parse(cleanContent);
    
    if (!Array.isArray(parsedNames)) {
      throw new Error('返回的数据不是数组格式');
    }
    
    return parsedNames.filter(item => 
      item && 
      typeof item === 'object' && 
      typeof item.name === 'string' && 
      typeof item.pinyin === 'string' && 
      typeof item.meaning === 'string'
    );
  } catch (error) {
    console.error('❌ JSON解析失败:', error);
    throw new Error('解析AI响应失败');
  }
};

// 🔄 获取兜底数据
const getFallbackNames = (gender: string): NameData[] => {
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const femaleNames = [
    { id: generateId(), name: '雅琪', pinyin: 'Yǎ Qí', meaning: '优雅如美玉，象征高贵与纯洁', gender },
    { id: generateId(), name: '诗涵', pinyin: 'Shī Hán', meaning: '诗意盎然，内涵丰富，寓意才华与智慧', gender },
    { id: generateId(), name: '梦瑶', pinyin: 'Mèng Yáo', meaning: '如梦似幻，美玉般珍贵，象征美好与希望', gender },
    { id: generateId(), name: '晓萱', pinyin: 'Xiǎo Xuān', meaning: '晨曦中的萱草，寓意清新与活力', gender },
    { id: generateId(), name: '语桐', pinyin: 'Yǔ Tóng', meaning: '语言如梧桐叶，寓意优雅与智慧', gender }
  ];

  const maleNames = [
    { id: generateId(), name: '晓峰', pinyin: 'Xiǎo Fēng', meaning: '晨光中的山峰，象征清新与坚定', gender },
    { id: generateId(), name: '雅轩', pinyin: 'Yǎ Xuān', meaning: '优雅的轩窗，寓意高雅与舒适', gender },
    { id: generateId(), name: '泽宇', pinyin: 'Zé Yǔ', meaning: '恩泽普照天地，象征广阔与福气', gender },
    { id: generateId(), name: '思源', pinyin: 'Sī Yuán', meaning: '不忘初心，常念根源，寓意感恩与踏实', gender },
    { id: generateId(), name: '茗熙', pinyin: 'Míng Xī', meaning: '茶香与晨曦，象征清雅与朝气', gender }
  ];

  const neutralNames = [
    { id: generateId(), name: '晨曦', pinyin: 'Chén Xī', meaning: '清晨的阳光，象征希望与新开始', gender },
    { id: generateId(), name: '悦心', pinyin: 'Yuè Xīn', meaning: '心情愉悦，寓意快乐与满足', gender },
    { id: generateId(), name: '智远', pinyin: 'Zhì Yuǎn', meaning: '智慧深远，象征聪明与远见', gender },
    { id: generateId(), name: '和风', pinyin: 'Hé Fēng', meaning: '温和的风，寓意平和与舒适', gender },
    { id: generateId(), name: '星辰', pinyin: 'Xīng Chén', meaning: '天空中的星星，象征光明与指引', gender }
  ];

  if (gender === 'female') return femaleNames;
  if (gender === 'male') return maleNames;
  return neutralNames;
};

// 🚀 主要的名字生成函数
export const generateNames = async (request: GenerateRequest): Promise<GenerateResponse> => {
  const { englishName, gender, style } = request;

  // 参数验证
  if (!englishName?.trim()) {
    throw new Error('英文名不能为空');
  }

  console.log('🚀 开始使用Puter.js生成名字:', { englishName, gender, style });

  try {
    // 初始化 Puter
    await puter.init();
    console.log('✅ Puter.js 初始化成功');

    const prompt = buildPrompt(englishName, gender, style);
    
    console.log('📤 发送AI请求到Puter.js');

    // 使用 Puter.js 调用 AI 模型
    const response = await puter.ai.chat({
      model: 'mistral-7b-instruct', // 使用 Mistral 模型
      messages: [
        {
          role: 'system',
          content: '你是一个专业的中文起名专家，擅长根据英文名生成有意义的中文名字。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    console.log('📄 Puter.js AI响应:', response);

    const content = response.choices?.[0]?.message?.content || response.content;
    
    if (!content) {
      throw new Error('AI返回了空内容');
    }

    const parsedNames = parseAiResponse(content);
    console.log('✅ 解析成功:', parsedNames.length, '个名字');

    if (parsedNames.length === 0) {
      throw new Error('解析后没有有效的名字');
    }

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
    console.error('❌ Puter.js generateNames错误:', error);

    // 使用兜底数据
    console.log('🔄 使用兜底数据');
    const fallbackNames = getFallbackNames(gender);
    
    return { names: fallbackNames };
  }
};

// 🧪 测试 Puter.js 连接
export const testPuterConnection = async (): Promise<{ success: boolean; message: string; details?: any }> => {
  try {
    console.log('🔍 开始 Puter.js 连接测试...');
    
    // 初始化 Puter
    await puter.init();
    console.log('✅ Puter.js 初始化成功');
    
    // 测试简单的AI调用
    const testResponse = await puter.ai.chat({
      model: 'mistral-7b-instruct',
      messages: [
        {
          role: 'user',
          content: '请回复"测试成功"'
        }
      ],
      max_tokens: 50
    });
    
    console.log('✅ 测试调用成功:', testResponse);
    
    return { 
      success: true, 
      message: 'Puter.js 连接测试成功',
      details: { response: testResponse }
    };
    
  } catch (error) {
    console.error('❌ Puter.js 连接测试失败:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '未知错误',
      details: { error: error instanceof Error ? error.stack : String(error) }
    };
  }
};

// 🔧 调试函数
export const debugPuterConnection = async (): Promise<void> => {
  console.log('🔍 开始完整的 Puter.js 调试...');
  
  try {
    // 1. 环境检查
    console.log('🌍 环境检查:');
    console.log('- 浏览器环境:', typeof window !== 'undefined');
    console.log('- Puter 可用性:', typeof puter !== 'undefined');
    
    // 2. 连接测试
    console.log('\n🌐 Puter.js 连接测试:');
    const testResult = await testPuterConnection();
    console.log('- 测试结果:', testResult.success ? '✅' : '❌');
    console.log('- 消息:', testResult.message);
    if (testResult.details) {
      console.log('- 详细信息:', testResult.details);
    }
    
    // 3. 实际功能测试
    console.log('\n🎯 功能测试:');
    const names = await generateNames({
      englishName: 'Debug',
      gender: 'neutral',
      style: 'neutral'
    });
    console.log('- 生成的名字数量:', names.names.length);
    console.log('- 示例名字:', names.names[0]);
    
  } catch (error) {
    console.error('❌ 调试过程中出错:', error);
  }
};