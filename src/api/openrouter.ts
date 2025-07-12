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

// API 配置
const API_CONFIG = {
  baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
  modelsEndpoint: 'https://openrouter.ai/api/v1/models',
  model: 'deepseek/deepseek-r1-distill-llama-70b:free',
  fallbackModel: 'anthropic/claude-3-haiku:free',
  temperature: 0.7,
  maxTokens: 1000,
  timeout: 30000,
  maxRetries: 3
} as const;

// 🔧 安全的API密钥管理
const getApiKey = (): string => {
  // 优先使用环境变量
  if (typeof process !== 'undefined' && process.env?.OPENROUTER_API_KEY) {
    return process.env.OPENROUTER_API_KEY;
  }
  
  // 浏览器环境下从配置文件获取
  const apiKey = import.meta.env?.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenRouter API密钥未配置。请设置环境变量OPENROUTER_API_KEY或VITE_OPENROUTER_API_KEY');
  }
  
  return apiKey;
};

// 🔍 API Key 验证
const validateApiKey = (apiKey: string): boolean => {
  // OpenRouter API Key 格式验证
  const apiKeyPattern = /^sk-or-v1-[a-zA-Z0-9]{48,}$/;
  return apiKeyPattern.test(apiKey);
};

// 🌐 带重试的 fetch 函数
const fetchWithRetry = async (
  url: string, 
  options: RequestInit, 
  maxRetries: number = API_CONFIG.maxRetries
): Promise<Response> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 尝试请求 (${attempt}/${maxRetries}):`, url);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log(`✅ 请求成功 (${attempt}/${maxRetries})`);
        return response;
      }
      
      // 如果是客户端错误（4xx），不要重试
      if (response.status >= 400 && response.status < 500) {
        const errorText = await response.text();
        throw new Error(`API错误 ${response.status}: ${errorText}`);
      }
      
      // 服务器错误（5xx）可以重试
      const errorText = await response.text();
      lastError = new Error(`API错误 ${response.status}: ${errorText}`);
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('未知错误');
      
      if (error.name === 'AbortError') {
        lastError = new Error('请求超时');
      }
      
      console.warn(`❌ 请求失败 (${attempt}/${maxRetries}):`, lastError.message);
      
      // 如果不是最后一次尝试，等待后重试
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`⏳ 等待 ${delay}ms 后重试...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

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
const parseApiResponse = (content: string): Array<{ name: string; pinyin: string; meaning: string }> => {
  if (!content) {
    throw new Error('API未返回有效内容');
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
    throw new Error('解析API响应失败');
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

  return gender === 'female' ? femaleNames : maleNames;
};

// 🧪 测试 API 连接
export const testApiConnection = async (): Promise<{ success: boolean; message: string; details?: any }> => {
  try {
    console.log('🔍 开始 API 连接测试...');
    
    // 1. 检查 API Key
    const apiKey = getApiKey();
    console.log('✅ API Key 已配置，长度:', apiKey.length);
    
    if (!validateApiKey(apiKey)) {
      return { 
        success: false, 
        message: 'API Key 格式不正确，应该以 sk-or-v1- 开头',
        details: { keyLength: apiKey.length, keyPrefix: apiKey.substring(0, 10) }
      };
    }
    
    // 2. 测试基本连接
    const response = await fetchWithRetry(API_CONFIG.modelsEndpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('✅ 连接成功，可用模型数量:', data.data?.length || 0);
    
    // 3. 测试实际的名字生成
    const testResult = await generateNames({
      englishName: 'Test',
      gender: 'neutral',
      style: 'neutral'
    });
    
    return { 
      success: true, 
      message: '连接测试成功',
      details: {
        modelsAvailable: data.data?.length || 0,
        testNamesGenerated: testResult.names.length
      }
    };
    
  } catch (error) {
    console.error('❌ 连接测试失败:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '未知错误',
      details: { error: error instanceof Error ? error.stack : String(error) }
    };
  }
};

// 🚀 主要的名字生成函数
export const generateNames = async (request: GenerateRequest): Promise<GenerateResponse> => {
  const { englishName, gender, style } = request;

  // 参数验证
  if (!englishName?.trim()) {
    throw new Error('英文名不能为空');
  }

  console.log('🚀 开始生成名字:', { englishName, gender, style });

  try {
    const apiKey = getApiKey();
    
    if (!validateApiKey(apiKey)) {
      throw new Error('API Key 格式不正确');
    }

    const prompt = buildPrompt(englishName, gender, style);
    
    const requestBody = {
      model: API_CONFIG.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: API_CONFIG.temperature,
      max_tokens: API_CONFIG.maxTokens
    };

    console.log('📤 发送请求:', {
      url: API_CONFIG.baseUrl,
      model: API_CONFIG.model,
      promptLength: prompt.length
    });

    const response = await fetchWithRetry(API_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location?.origin || 'https://chinesecharactername.top',
        'X-Title': 'Chinese Name Generator'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log('📄 API响应:', {
      status: response.status,
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length || 0
    });

    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('API返回了空内容');
    }

    const parsedNames = parseApiResponse(content);
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
    console.error('❌ generateNames错误:', error);

    // 使用兜底数据
    console.log('🔄 使用兜底数据');
    const fallbackNames = getFallbackNames(gender);
    
    return { names: fallbackNames };
  }
};

// 🔧 调试函数
export const debugApiConnection = async (): Promise<void> => {
  console.log('🔍 开始完整的 API 调试...');
  
  try {
    // 1. 环境检查
    console.log('🌍 环境检查:');
    console.log('- 浏览器环境:', typeof window !== 'undefined');
    console.log('- Node.js 环境:', typeof process !== 'undefined');
    console.log('- 当前域名:', window.location?.origin || 'N/A');
    
    // 2. API Key 检查
    console.log('\n🔑 API Key 检查:');
    const apiKey = getApiKey();
    console.log('- API Key 长度:', apiKey.length);
    console.log('- API Key 前缀:', apiKey.substring(0, 15) + '...');
    console.log('- 格式验证:', validateApiKey(apiKey) ? '✅' : '❌');
    
    // 3. 网络连接测试
    console.log('\n🌐 网络连接测试:');
    const testResult = await testApiConnection();
    console.log('- 测试结果:', testResult.success ? '✅' : '❌');
    console.log('- 消息:', testResult.message);
    if (testResult.details) {
      console.log('- 详细信息:', testResult.details);
    }
    
    // 4. 实际功能测试
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
