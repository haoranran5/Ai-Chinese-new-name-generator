// 中文名字数据库
export interface ChineseName {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: 'male' | 'female' | 'neutral';
  style: 'traditional' | 'modern' | 'business' | 'cute' | 'neutral';
  characters: string[];
}

// 常用中文名字字符库
export const chineseCharacters = {
  // 男性常用字
  male: {
    traditional: ['文', '武', '明', '德', '志', '华', '国', '建', '军', '伟', '强', '勇', '刚', '峰', '龙'],
    modern: ['轩', '宇', '晨', '阳', '浩', '凯', '睿', '博', '涛', '鹏', '飞', '杰', '豪', '俊', '帅'],
    business: ['成', '达', '胜', '利', '富', '贵', '荣', '昌', '兴', '旺', '发', '财', '金', '银', '宝'],
    cute: ['小', '乐', '欢', '喜', '甜', '萌', '可', '爱', '宝', '贝', '心', '星', '月', '阳', '光'],
    neutral: ['安', '平', '和', '静', '清', '雅', '正', '直', '善', '良', '真', '诚', '智', '慧', '美']
  },
  // 女性常用字
  female: {
    traditional: ['美', '丽', '雅', '静', '淑', '贤', '慧', '琴', '棋', '书', '画', '诗', '词', '花', '月'],
    modern: ['欣', '悦', '萱', '琪', '瑶', '婷', '娜', '莉', '薇', '蕾', '梦', '雪', '冰', '晶', '珠'],
    business: ['敏', '慧', '智', '能', '才', '艺', '巧', '思', '维', '理', '管', '领', '导', '策', '划'],
    cute: ['甜', '蜜', '糖', '果', '朵', '儿', '妮', '娃', '宝', '贝', '心', '爱', '喜', '乐', '欢'],
    neutral: ['安', '宁', '和', '谐', '平', '静', '清', '纯', '真', '善', '美', '好', '佳', '优', '秀']
  },
  // 通用字
  common: {
    first: ['李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗'],
    second: ['子', '文', '明', '华', '国', '建', '军', '伟', '强', '勇', '刚', '峰', '龙', '凤', '英', '秀', '美', '丽', '雅', '静'],
    third: ['杰', '豪', '俊', '帅', '美', '丽', '雅', '静', '慧', '智', '勇', '强', '伟', '大', '小', '新', '老', '好', '坏', '高']
  }
};

// 拼音映射
export const pinyinMap: Record<string, string> = {
  '文': 'Wén', '武': 'Wǔ', '明': 'Míng', '德': 'Dé', '志': 'Zhì', '华': 'Huá', '国': 'Guó', '建': 'Jiàn',
  '军': 'Jūn', '伟': 'Wěi', '强': 'Qiáng', '勇': 'Yǒng', '刚': 'Gāng', '峰': 'Fēng', '龙': 'Lóng',
  '轩': 'Xuān', '宇': 'Yǔ', '晨': 'Chén', '阳': 'Yáng', '浩': 'Hào', '凯': 'Kǎi', '睿': 'Ruì',
  '博': 'Bó', '涛': 'Tāo', '鹏': 'Péng', '飞': 'Fēi', '杰': 'Jié', '豪': 'Háo', '俊': 'Jùn', '帅': 'Shuài',
  '美': 'Měi', '丽': 'Lì', '雅': 'Yǎ', '静': 'Jìng', '淑': 'Shū', '贤': 'Xián', '慧': 'Huì',
  '琴': 'Qín', '棋': 'Qí', '书': 'Shū', '画': 'Huà', '诗': 'Shī', '词': 'Cí', '花': 'Huā', '月': 'Yuè',
  '欣': 'Xīn', '悦': 'Yuè', '萱': 'Xuān', '琪': 'Qí', '瑶': 'Yáo', '婷': 'Tíng', '娜': 'Nà',
  '莉': 'Lì', '薇': 'Wēi', '蕾': 'Lěi', '梦': 'Mèng', '雪': 'Xuě', '冰': 'Bīng', '晶': 'Jīng', '珠': 'Zhū',
  '安': 'Ān', '平': 'Píng', '和': 'Hé', '宁': 'Níng', '清': 'Qīng', '正': 'Zhèng', '直': 'Zhí',
  '善': 'Shàn', '良': 'Liáng', '真': 'Zhēn', '诚': 'Chéng', '智': 'Zhì', '子': 'Zǐ', '小': 'Xiǎo',
  '乐': 'Lè', '欢': 'Huān', '喜': 'Xǐ', '甜': 'Tián', '萌': 'Méng', '可': 'Kě', '爱': 'Ài',
  '宝': 'Bǎo', '贝': 'Bèi', '心': 'Xīn', '星': 'Xīng', '成': 'Chéng', '达': 'Dá', '胜': 'Shèng',
  '利': 'Lì', '富': 'Fù', '贵': 'Guì', '荣': 'Róng', '昌': 'Chāng', '兴': 'Xīng', '旺': 'Wàng',
  '发': 'Fā', '财': 'Cái', '金': 'Jīn', '银': 'Yín', '敏': 'Mǐn', '能': 'Néng', '才': 'Cái',
  '艺': 'Yì', '巧': 'Qiǎo', '思': 'Sī', '维': 'Wéi', '理': 'Lǐ', '管': 'Guǎn', '领': 'Lǐng',
  '导': 'Dǎo', '策': 'Cè', '划': 'Huà', '糖': 'Táng', '果': 'Guǒ', '朵': 'Duǒ', '儿': 'Ér',
  '妮': 'Nī', '娃': 'Wá', '谐': 'Xié', '纯': 'Chún', '好': 'Hǎo', '佳': 'Jiā', '优': 'Yōu', '秀': 'Xiù',
  '李': 'Lǐ', '王': 'Wáng', '张': 'Zhāng', '刘': 'Liú', '陈': 'Chén', '杨': 'Yáng', '赵': 'Zhào',
  '黄': 'Huáng', '周': 'Zhōu', '吴': 'Wú', '徐': 'Xú', '孙': 'Sūn', '胡': 'Hú', '朱': 'Zhū',
  '高': 'Gāo', '林': 'Lín', '何': 'Hé', '郭': 'Guō', '马': 'Mǎ', '罗': 'Luó', '凤': 'Fèng', '英': 'Yīng',
  '大': 'Dà', '新': 'Xīn', '老': 'Lǎo', '坏': 'Huài'
};

// 字符含义映射（中文）
export const meaningMap: Record<string, string> = {
  '文': '文雅、文化、文学', '武': '武勇、武艺、武力', '明': '光明、聪明、明智', '德': '品德、道德、德行',
  '志': '志向、意志、志气', '华': '华丽、华贵、中华', '国': '国家、国土、爱国', '建': '建设、建立、建功',
  '军': '军人、军队、军功', '伟': '伟大、伟岸、伟业', '强': '强壮、强大、坚强', '勇': '勇敢、勇气、勇士',
  '刚': '刚强、刚毅、刚正', '峰': '山峰、顶峰、高峰', '龙': '龙腾、龙飞、吉祥',
  '轩': '轩昂、轩敞、气宇轩昂', '宇': '宇宙、气宇、宇内', '晨': '晨光、清晨、朝气', '阳': '阳光、太阳、阳刚',
  '浩': '浩大、浩瀚、浩然', '凯': '凯旋、凯歌、胜利', '睿': '睿智、睿见、聪慧',
  '博': '博学、博大、博览', '涛': '波涛、涛声、气势', '鹏': '大鹏、鹏程、远大', '飞': '飞翔、飞跃、高飞',
  '杰': '杰出、英杰、人杰', '豪': '豪杰、豪迈、豪气', '俊': '俊秀、俊杰、英俊', '帅': '帅气、统帅、英帅',
  '美': '美丽、美好、完美', '丽': '美丽、秀丽、华丽', '雅': '优雅、雅致、高雅', '静': '安静、宁静、静雅',
  '淑': '淑女、淑德、贤淑', '贤': '贤德、贤良、贤惠', '慧': '智慧、聪慧、慧心',
  '琴': '琴棋、音乐、才艺', '棋': '棋艺、智慧、策略', '书': '书香、学问、文化', '画': '绘画、艺术、才华',
  '诗': '诗歌、文学、才情', '词': '词章、文采、雅韵', '花': '花朵、美丽、芬芳', '月': '月亮、纯洁、美好',
  '欣': '欣喜、欣然、快乐', '悦': '喜悦、愉悦、快乐', '萱': '萱草、忘忧、快乐', '琪': '美玉、珍贵、美好',
  '瑶': '美玉、瑶池、仙境', '婷': '婷婷、美好、优雅', '娜': '婀娜、美丽、多姿',
  '莉': '茉莉、芬芳、纯洁', '薇': '蔷薇、美丽、高贵', '蕾': '花蕾、希望、美好', '梦': '梦想、理想、美好',
  '雪': '雪花、纯洁、高洁', '冰': '冰清、纯洁、高雅', '晶': '晶莹、透明、纯净', '珠': '珍珠、珍贵、美丽',
  '安': '安全、安宁、平安', '平': '平安、平和、公平', '和': '和谐、和睦、温和', '宁': '安宁、宁静、平宁',
  '清': '清澈、清雅、清新', '正': '正直、正义、端正', '直': '正直、直率、坦直',
  '善': '善良、善美、慈善', '良': '良好、善良、优良', '真': '真诚、真实、纯真', '诚': '诚实、诚信、真诚',
  '智': '智慧、智能、明智', '子': '君子、子女、学子', '小': '小巧、可爱、亲切',
  '乐': '快乐、音乐、欢乐', '欢': '欢乐、欢喜、欢快', '喜': '喜悦、喜庆、欢喜', '甜': '甜美、甜蜜、可爱',
  '萌': '萌芽、可爱、天真', '可': '可爱、可人、可心', '爱': '爱心、可爱、关爱',
  '宝': '宝贝、珍宝、宝物', '贝': '宝贝、珍贝、可爱', '心': '爱心、用心、真心', '星': '星星、明星、希望',
  '成': '成功、成就、成才', '达': '达成、通达、发达', '胜': '胜利、优胜、成功',
  '利': '利益、顺利、锐利', '富': '富有、富贵、丰富', '贵': '珍贵、高贵、富贵', '荣': '荣誉、荣华、光荣',
  '昌': '昌盛、繁昌、兴昌', '兴': '兴旺、兴盛、振兴', '旺': '旺盛、兴旺、红火',
  '发': '发达、发展、发财', '财': '财富、财运、才能', '金': '金贵、金色、财富', '银': '银色、珍贵、财富',
  '敏': '敏捷、敏锐、聪敏', '能': '能力、能干、才能', '才': '才华、才能、人才',
  '艺': '艺术、才艺、技艺', '巧': '巧妙、灵巧、技巧', '思': '思考、思维、思想', '维': '思维、维护、纲维',
  '理': '道理、管理、治理', '管': '管理、管制、主管', '领': '领导、领袖、率领',
  '导': '引导、指导、领导', '策': '策略、政策、谋策', '划': '规划、计划、策划', '糖': '甜蜜、可爱、温馨',
  '果': '果实、成果、坚果', '朵': '花朵、云朵、可爱', '儿': '儿女、孩儿、可爱',
  '妮': '妮子、可爱、亲昵', '娃': '娃娃、孩子、可爱', '谐': '和谐、谐音、幽默', '纯': '纯洁、纯真、单纯',
  '好': '好人、美好、良好', '佳': '佳人、佳音、美好', '优': '优秀、优美、优雅', '秀': '秀美、秀丽、优秀'
};

// 字符含义映射（英文）
export const meaningMapEnglish: Record<string, string> = {
  '文': 'culture, literature, refined', '武': 'martial, brave, warrior', '明': 'bright, intelligent, wise', '德': 'virtue, morality, character',
  '志': 'ambition, will, determination', '华': 'magnificent, splendid, China', '国': 'country, nation, patriotic', '建': 'build, establish, achieve',
  '军': 'military, army, soldier', '伟': 'great, magnificent, grand', '强': 'strong, powerful, firm', '勇': 'brave, courage, warrior',
  '刚': 'strong, firm, upright', '峰': 'peak, summit, mountain', '龙': 'dragon, auspicious, powerful',
  '轩': 'tall, spacious, dignified', '宇': 'universe, space, grandeur', '晨': 'morning, dawn, fresh', '阳': 'sun, bright, masculine',
  '浩': 'vast, grand, noble', '凯': 'victory, triumph, success', '睿': 'wise, intelligent, insightful',
  '博': 'learned, extensive, broad', '涛': 'waves, ocean, majestic', '鹏': 'roc, great bird, ambitious', '飞': 'fly, soar, high',
  '杰': 'outstanding, hero, excellent', '豪': 'heroic, bold, generous', '俊': 'handsome, talented, outstanding', '帅': 'handsome, commander, leader',
  '美': 'beautiful, pretty, perfect', '丽': 'beautiful, elegant, graceful', '雅': 'elegant, refined, cultured', '静': 'quiet, peaceful, calm',
  '淑': 'virtuous, gentle, refined', '贤': 'virtuous, wise, good', '慧': 'intelligent, wise, clever',
  '琴': 'music, talent, art', '棋': 'chess, strategy, wisdom', '书': 'book, learning, culture', '画': 'painting, art, talent',
  '诗': 'poetry, literature, romance', '词': 'lyrics, elegant, refined', '花': 'flower, beautiful, fragrant', '月': 'moon, pure, beautiful',
  '欣': 'happy, joyful, pleased', '悦': 'joy, pleasure, happy', '萱': 'daylily, forget sorrow, happy', '琪': 'jade, precious, beautiful',
  '瑶': 'jade, precious, fairyland', '婷': 'graceful, beautiful, elegant', '娜': 'graceful, beautiful, elegant',
  '莉': 'jasmine, fragrant, pure', '薇': 'rose, beautiful, noble', '蕾': 'bud, hope, beautiful', '梦': 'dream, ideal, beautiful',
  '雪': 'snow, pure, noble', '冰': 'ice, pure, noble', '晶': 'crystal, clear, pure', '珠': 'pearl, precious, beautiful',
  '安': 'safe, peaceful, secure', '平': 'peaceful, calm, fair', '和': 'harmonious, gentle, peaceful', '宁': 'peaceful, calm, tranquil',
  '清': 'clear, pure, fresh', '正': 'upright, just, correct', '直': 'straight, honest, direct',
  '善': 'good, kind, virtuous', '良': 'good, kind, excellent', '真': 'true, genuine, sincere', '诚': 'honest, sincere, faithful',
  '智': 'wisdom, intelligent, smart', '子': 'gentleman, child, scholar', '小': 'small, cute, lovely',
  '乐': 'happy, music, joy', '欢': 'joyful, happy, cheerful', '喜': 'happy, joyful, pleased', '甜': 'sweet, lovely, cute',
  '萌': 'bud, cute, innocent', '可': 'lovable, cute, agreeable', '爱': 'love, lovely, caring',
  '宝': 'treasure, precious, baby', '贝': 'treasure, precious, cute', '心': 'heart, love, sincere', '星': 'star, bright, hope',
  '成': 'success, achieve, accomplish', '达': 'reach, achieve, prosperous', '胜': 'victory, win, success',
  '利': 'benefit, sharp, advantage', '富': 'wealthy, rich, abundant', '贵': 'precious, noble, valuable', '荣': 'glory, honor, prosperous',
  '昌': 'prosperous, flourishing', '兴': 'prosperous, rise, flourish', '旺': 'prosperous, flourishing, strong',
  '发': 'prosper, develop, wealth', '财': 'wealth, fortune, talent', '金': 'gold, precious, wealth', '银': 'silver, precious, wealth',
  '敏': 'quick, sharp, intelligent', '能': 'ability, capable, talented', '才': 'talent, ability, gifted',
  '艺': 'art, skill, talent', '巧': 'skillful, clever, ingenious', '思': 'think, thought, mind', '维': 'maintain, think, dimension',
  '理': 'reason, manage, govern', '管': 'manage, control, govern', '领': 'lead, leader, guide',
  '导': 'guide, lead, direct', '策': 'strategy, plan, policy', '划': 'plan, design, strategy', '糖': 'sweet, lovely, warm',
  '果': 'fruit, result, achievement', '朵': 'flower, cloud, lovely', '儿': 'child, son, lovely',
  '妮': 'girl, lovely, dear', '娃': 'baby, child, lovely', '谐': 'harmonious, humorous', '纯': 'pure, innocent, simple',
  '好': 'good, nice, excellent', '佳': 'good, excellent, beautiful', '优': 'excellent, superior, elegant', '秀': 'elegant, beautiful, outstanding'
};

// 预定义的中文名字数据
export const predefinedNames: ChineseName[] = [
  // 男性传统名字
  { id: '1', name: '文华', pinyin: 'Wén Huá', meaning: '文雅华贵，寓意才华横溢，气质高雅', gender: 'male', style: 'traditional', characters: ['文', '华'] },
  { id: '2', name: '志强', pinyin: 'Zhì Qiáng', meaning: '志向远大，意志坚强，象征坚定不移的品格', gender: 'male', style: 'traditional', characters: ['志', '强'] },
  { id: '3', name: '建国', pinyin: 'Jiàn Guó', meaning: '建设国家，报效祖国，体现爱国情怀', gender: 'male', style: 'traditional', characters: ['建', '国'] },
  { id: '4', name: '德明', pinyin: 'Dé Míng', meaning: '品德高尚，智慧明达，寓意德才兼备', gender: 'male', style: 'traditional', characters: ['德', '明'] },
  { id: '5', name: '武勇', pinyin: 'Wǔ Yǒng', meaning: '武艺高强，勇敢无畏，象征英勇果敢', gender: 'male', style: 'traditional', characters: ['武', '勇'] },
  
  // 男性现代名字
  { id: '6', name: '浩轩', pinyin: 'Hào Xuān', meaning: '浩然正气，气宇轩昂，寓意胸怀宽广', gender: 'male', style: 'modern', characters: ['浩', '轩'] },
  { id: '7', name: '晨阳', pinyin: 'Chén Yáng', meaning: '晨光阳照，朝气蓬勃，象征希望与活力', gender: 'male', style: 'modern', characters: ['晨', '阳'] },
  { id: '8', name: '睿博', pinyin: 'Ruì Bó', meaning: '睿智博学，聪明才智，寓意学识渊博', gender: 'male', style: 'modern', characters: ['睿', '博'] },
  { id: '9', name: '凯飞', pinyin: 'Kǎi Fēi', meaning: '凯旋高飞，成功腾达，象征胜利与成就', gender: 'male', style: 'modern', characters: ['凯', '飞'] },
  { id: '10', name: '宇涛', pinyin: 'Yǔ Tāo', meaning: '宇宙波涛，气势磅礴，寓意胸怀天下', gender: 'male', style: 'modern', characters: ['宇', '涛'] },
  
  // 女性传统名字
  { id: '11', name: '美丽', pinyin: 'Měi Lì', meaning: '美丽动人，容貌秀美，象征美好与优雅', gender: 'female', style: 'traditional', characters: ['美', '丽'] },
  { id: '12', name: '雅静', pinyin: 'Yǎ Jìng', meaning: '优雅宁静，气质高雅，寓意内心平和', gender: 'female', style: 'traditional', characters: ['雅', '静'] },
  { id: '13', name: '淑贤', pinyin: 'Shū Xián', meaning: '淑女贤德，品德高尚，体现女性美德', gender: 'female', style: 'traditional', characters: ['淑', '贤'] },
  { id: '14', name: '慧琴', pinyin: 'Huì Qín', meaning: '智慧如琴，才艺双全，寓意聪慧多才', gender: 'female', style: 'traditional', characters: ['慧', '琴'] },
  { id: '15', name: '诗画', pinyin: 'Shī Huà', meaning: '诗情画意，文艺气息，象征艺术才华', gender: 'female', style: 'traditional', characters: ['诗', '画'] },
  
  // 女性现代名字
  { id: '16', name: '欣悦', pinyin: 'Xīn Yuè', meaning: '欣喜愉悦，心情舒畅，寓意快乐幸福', gender: 'female', style: 'modern', characters: ['欣', '悦'] },
  { id: '17', name: '萱琪', pinyin: 'Xuān Qí', meaning: '萱草美玉，忘忧珍贵，象征美好与珍贵', gender: 'female', style: 'modern', characters: ['萱', '琪'] },
  { id: '18', name: '瑶婷', pinyin: 'Yáo Tíng', meaning: '瑶池仙境，婷婷玉立，寓意美丽如仙', gender: 'female', style: 'modern', characters: ['瑶', '婷'] },
  { id: '19', name: '梦雪', pinyin: 'Mèng Xuě', meaning: '梦幻雪花，纯洁美好，象征纯真与梦想', gender: 'female', style: 'modern', characters: ['梦', '雪'] },
  { id: '20', name: '晶莉', pinyin: 'Jīng Lì', meaning: '晶莹茉莉，纯净芬芳，寓意纯洁与美丽', gender: 'female', style: 'modern', characters: ['晶', '莉'] },
  
  // 商务风格名字
  { id: '21', name: '成达', pinyin: 'Chéng Dá', meaning: '成功通达，事业有成，象征成就与发展', gender: 'male', style: 'business', characters: ['成', '达'] },
  { id: '22', name: '富荣', pinyin: 'Fù Róng', meaning: '富贵荣华，财富兴旺，寓意成功与繁荣', gender: 'male', style: 'business', characters: ['富', '荣'] },
  { id: '23', name: '慧敏', pinyin: 'Huì Mǐn', meaning: '智慧敏锐，聪明能干，体现职场智慧', gender: 'female', style: 'business', characters: ['慧', '敏'] },
  { id: '24', name: '才艺', pinyin: 'Cái Yì', meaning: '才华艺术，多才多艺，寓意能力出众', gender: 'female', style: 'business', characters: ['才', '艺'] },
  { id: '25', name: '策划', pinyin: 'Cè Huà', meaning: '策略规划，运筹帷幄，象征领导才能', gender: 'neutral', style: 'business', characters: ['策', '划'] },
  
  // 可爱风格名字
  { id: '26', name: '小乐', pinyin: 'Xiǎo Lè', meaning: '小巧快乐，天真可爱，寓意纯真与欢乐', gender: 'neutral', style: 'cute', characters: ['小', '乐'] },
  { id: '27', name: '甜心', pinyin: 'Tián Xīn', meaning: '甜美用心，温馨可爱，象征甜蜜与真心', gender: 'female', style: 'cute', characters: ['甜', '心'] },
  { id: '28', name: '萌宝', pinyin: 'Méng Bǎo', meaning: '萌芽宝贝，可爱珍贵，寓意天真与珍爱', gender: 'neutral', style: 'cute', characters: ['萌', '宝'] },
  { id: '29', name: '星月', pinyin: 'Xīng Yuè', meaning: '星星月亮，明亮美好，象征希望与美丽', gender: 'female', style: 'cute', characters: ['星', '月'] },
  { id: '30', name: '果儿', pinyin: 'Guǒ Ér', meaning: '果实孩儿，成果可爱，寓意收获与天真', gender: 'neutral', style: 'cute', characters: ['果', '儿'] }
];