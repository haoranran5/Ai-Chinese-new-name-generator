import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 语言资源
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        favorites: 'Favorites',
        about: 'About'
      },
      home: {
        title: 'AI Chinese Name Generator',
        subtitle: 'Transform your English name into a beautiful Chinese name with AI-powered cultural intelligence',
        aiPowered: 'AI-Powered',
        culturalIntelligence: 'Cultural Intelligence',
        instantGeneration: 'Instant Generation',
        form: {
          nameLabel: 'Your English Name',
          namePlaceholder: 'Enter your English name...',
          genderLabel: 'Gender Preference',
          styleLabel: 'Name Style',
          generateButton: 'Generate Chinese Names',
          generating: 'Generating...'
        },
        styles: {
          traditional: 'Traditional',
          modern: 'Modern', 
          business: 'Business',
          cute: 'Cute',
          neutral: 'Neutral'
        },
        genders: {
          male: 'Male',
          female: 'Female',
          neutral: 'Neutral'
        },
        results: {
          title: 'Your Chinese Names',
          example: 'Example Chinese Names',
          regenerate: 'Generate New Names'
        }
      },
      favorites: {
        title: 'Favorite Names',
        empty: 'No favorite names yet',
        emptyDesc: 'Start generating names and save your favorites!'
      },
      about: {
        title: 'About AI Chinese Name Generator',
        description: 'Our AI-powered system combines traditional Chinese naming wisdom with modern technology to create meaningful names.'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        favorites: '收藏',
        about: '关于'
      },
      home: {
        title: 'AI中文名生成器',
        subtitle: '运用AI文化智能，将您的英文名转换为优美的中文名字',
        aiPowered: 'AI驱动',
        culturalIntelligence: '文化智能',
        instantGeneration: '即时生成',
        form: {
          nameLabel: '您的英文名',
          namePlaceholder: '请输入您的英文名...',
          genderLabel: '性别偏好',
          styleLabel: '名字风格',
          generateButton: '生成中文名',
          generating: '生成中...'
        },
        styles: {
          traditional: '传统',
          modern: '现代',
          business: '商务',
          cute: '可爱',
          neutral: '中性'
        },
        genders: {
          male: '男性',
          female: '女性',
          neutral: '中性'
        },
        results: {
          title: '您的中文名',
          example: '示例中文名',
          regenerate: '重新生成'
        }
      },
      favorites: {
        title: '收藏的名字',
        empty: '暂无收藏的名字',
        emptyDesc: '开始生成名字并保存您的收藏吧！'
      },
      about: {
        title: '关于AI中文名生成器',
        description: '我们的AI系统结合传统中文命名智慧与现代技术，创造有意义的名字。'
      }
    }
  },
  ja: {
    translation: {
      nav: {
        home: 'ホーム',
        favorites: 'お気に入り',
        about: 'について'
      },
      home: {
        title: 'AI中国名ジェネレーター',
        subtitle: 'AI文化知能を使用して、英語名を美しい中国名に変換します',
        aiPowered: 'AI駆動',
        culturalIntelligence: '文化知能',
        instantGeneration: '即座生成',
        form: {
          nameLabel: 'あなたの英語名',
          namePlaceholder: '英語名を入力してください...',
          genderLabel: '性別の好み',
          styleLabel: '名前のスタイル',
          generateButton: '中国名を生成',
          generating: '生成中...'
        },
        styles: {
          traditional: '伝統的',
          modern: 'モダン',
          business: 'ビジネス',
          cute: 'かわいい',
          neutral: 'ニュートラル'
        },
        genders: {
          male: '男性',
          female: '女性',
          neutral: 'ニュートラル'
        },
        results: {
          title: 'あなたの中国名',
          example: '中国名の例',
          regenerate: '新しい名前を生成'
        }
      },
      favorites: {
        title: 'お気に入りの名前',
        empty: 'お気に入りの名前はまだありません',
        emptyDesc: '名前を生成してお気に入りを保存しましょう！'
      },
      about: {
        title: 'AI中国名ジェネレーターについて',
        description: '私たちのAIシステムは、伝統的な中国の命名の知恵と現代技術を組み合わせて、意味のある名前を作成します。'
      }
    }
  },
  ko: {
    translation: {
      nav: {
        home: '홈',
        favorites: '즐겨찾기',
        about: '소개'
      },
      home: {
        title: 'AI 중국어 이름 생성기',
        subtitle: 'AI 문화 지능을 사용하여 영어 이름을 아름다운 중국어 이름으로 변환합니다',
        aiPowered: 'AI 기반',
        culturalIntelligence: '문화 지능',
        instantGeneration: '즉시 생성',
        form: {
          nameLabel: '당신의 영어 이름',
          namePlaceholder: '영어 이름을 입력하세요...',
          genderLabel: '성별 선호도',
          styleLabel: '이름 스타일',
          generateButton: '중국어 이름 생성',
          generating: '생성 중...'
        },
        styles: {
          traditional: '전통적',
          modern: '현대적',
          business: '비즈니스',
          cute: '귀여운',
          neutral: '중성'
        },
        genders: {
          male: '남성',
          female: '여성',
          neutral: '중성'
        },
        results: {
          title: '당신의 중국어 이름',
          example: '중국어 이름 예시',
          regenerate: '새 이름 생성'
        }
      },
      favorites: {
        title: '즐겨찾는 이름',
        empty: '즐겨찾는 이름이 아직 없습니다',
        emptyDesc: '이름을 생성하고 즐겨찾기를 저장하세요!'
      },
      about: {
        title: 'AI 중국어 이름 생성기 소개',
        description: '우리의 AI 시스템은 전통적인 중국 명명 지혜와 현대 기술을 결합하여 의미 있는 이름을 만듭니다.'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        favorites: 'Favoritos',
        about: 'Acerca de'
      },
      home: {
        title: 'Generador de Nombres Chinos IA',
        subtitle: 'Transforma tu nombre en inglés en un hermoso nombre chino con inteligencia cultural impulsada por IA',
        aiPowered: 'Impulsado por IA',
        culturalIntelligence: 'Inteligencia Cultural',
        instantGeneration: 'Generación Instantánea',
        form: {
          nameLabel: 'Tu Nombre en Inglés',
          namePlaceholder: 'Ingresa tu nombre en inglés...',
          genderLabel: 'Preferencia de Género',
          styleLabel: 'Estilo de Nombre',
          generateButton: 'Generar Nombres Chinos',
          generating: 'Generando...'
        },
        styles: {
          traditional: 'Tradicional',
          modern: 'Moderno',
          business: 'Empresarial',
          cute: 'Lindo',
          neutral: 'Neutral'
        },
        genders: {
          male: 'Masculino',
          female: 'Femenino',
          neutral: 'Neutral'
        },
        results: {
          title: 'Tus Nombres Chinos',
          example: 'Nombres Chinos de Ejemplo',
          regenerate: 'Generar Nuevos Nombres'
        }
      },
      favorites: {
        title: 'Nombres Favoritos',
        empty: 'Aún no hay nombres favoritos',
        emptyDesc: '¡Comienza a generar nombres y guarda tus favoritos!'
      },
      about: {
        title: 'Acerca del Generador de Nombres Chinos IA',
        description: 'Nuestro sistema de IA combina la sabiduría tradicional china de nombres con tecnología moderna para crear nombres significativos.'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        favorites: 'Favoris',
        about: 'À propos'
      },
      home: {
        title: 'Générateur de Noms Chinois IA',
        subtitle: 'Transformez votre nom anglais en un beau nom chinois avec l\'intelligence culturelle alimentée par l\'IA',
        aiPowered: 'Alimenté par l\'IA',
        culturalIntelligence: 'Intelligence Culturelle',
        instantGeneration: 'Génération Instantanée',
        form: {
          nameLabel: 'Votre Nom Anglais',
          namePlaceholder: 'Entrez votre nom anglais...',
          genderLabel: 'Préférence de Genre',
          styleLabel: 'Style de Nom',
          generateButton: 'Générer des Noms Chinois',
          generating: 'Génération...'
        },
        styles: {
          traditional: 'Traditionnel',
          modern: 'Moderne',
          business: 'Professionnel',
          cute: 'Mignon',
          neutral: 'Neutre'
        },
        genders: {
          male: 'Masculin',
          female: 'Féminin',
          neutral: 'Neutre'
        },
        results: {
          title: 'Vos Noms Chinois',
          example: 'Exemples de Noms Chinois',
          regenerate: 'Générer de Nouveaux Noms'
        }
      },
      favorites: {
        title: 'Noms Favoris',
        empty: 'Aucun nom favori pour le moment',
        emptyDesc: 'Commencez à générer des noms et sauvegardez vos favoris!'
      },
      about: {
        title: 'À propos du Générateur de Noms Chinois IA',
        description: 'Notre système IA combine la sagesse traditionnelle chinoise des noms avec la technologie moderne pour créer des noms significatifs.'
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: 'Startseite',
        favorites: 'Favoriten',
        about: 'Über uns'
      },
      home: {
        title: 'KI-Chinesischer Namengenerator',
        subtitle: 'Verwandeln Sie Ihren englischen Namen mit KI-gestützter kultureller Intelligenz in einen schönen chinesischen Namen',
        aiPowered: 'KI-gestützt',
        culturalIntelligence: 'Kulturelle Intelligenz',
        instantGeneration: 'Sofortige Generierung',
        form: {
          nameLabel: 'Ihr englischer Name',
          namePlaceholder: 'Geben Sie Ihren englischen Namen ein...',
          genderLabel: 'Geschlechtspräferenz',
          styleLabel: 'Namensstil',
          generateButton: 'Chinesische Namen generieren',
          generating: 'Generiere...'
        },
        styles: {
          traditional: 'Traditionell',
          modern: 'Modern',
          business: 'Geschäftlich',
          cute: 'Niedlich',
          neutral: 'Neutral'
        },
        genders: {
          male: 'Männlich',
          female: 'Weiblich',
          neutral: 'Neutral'
        },
        results: {
          title: 'Ihre chinesischen Namen',
          example: 'Beispiel chinesische Namen',
          regenerate: 'Neue Namen generieren'
        }
      },
      favorites: {
        title: 'Lieblingsnamen',
        empty: 'Noch keine Lieblingsnamen',
        emptyDesc: 'Beginnen Sie mit der Generierung von Namen und speichern Sie Ihre Favoriten!'
      },
      about: {
        title: 'Über den KI-Chinesischen Namengenerator',
        description: 'Unser KI-System kombiniert traditionelle chinesische Namensweisheit mit moderner Technologie, um bedeutungsvolle Namen zu erstellen.'
      }
    }
  },
  it: {
    translation: {
      nav: {
        home: 'Home',
        favorites: 'Preferiti',
        about: 'Chi siamo'
      },
      home: {
        title: 'Generatore di Nomi Cinesi IA',
        subtitle: 'Trasforma il tuo nome inglese in un bellissimo nome cinese con intelligenza culturale potenziata dall\'IA',
        aiPowered: 'Potenziato dall\'IA',
        culturalIntelligence: 'Intelligenza Culturale',
        instantGeneration: 'Generazione Istantanea',
        form: {
          nameLabel: 'Il Tuo Nome Inglese',
          namePlaceholder: 'Inserisci il tuo nome inglese...',
          genderLabel: 'Preferenza di Genere',
          styleLabel: 'Stile del Nome',
          generateButton: 'Genera Nomi Cinesi',
          generating: 'Generando...'
        },
        styles: {
          traditional: 'Tradizionale',
          modern: 'Moderno',
          business: 'Aziendale',
          cute: 'Carino',
          neutral: 'Neutrale'
        },
        genders: {
          male: 'Maschile',
          female: 'Femminile',
          neutral: 'Neutrale'
        },
        results: {
          title: 'I Tuoi Nomi Cinesi',
          example: 'Esempi di Nomi Cinesi',
          regenerate: 'Genera Nuovi Nomi'
        }
      },
      favorites: {
        title: 'Nomi Preferiti',
        empty: 'Nessun nome preferito ancora',
        emptyDesc: 'Inizia a generare nomi e salva i tuoi preferiti!'
      },
      about: {
        title: 'Informazioni sul Generatore di Nomi Cinesi IA',
        description: 'Il nostro sistema IA combina la saggezza tradizionale cinese dei nomi con la tecnologia moderna per creare nomi significativi.'
      }
    }
  },
  pt: {
    translation: {
      nav: {
        home: 'Início',
        favorites: 'Favoritos',
        about: 'Sobre'
      },
      home: {
        title: 'Gerador de Nomes Chineses IA',
        subtitle: 'Transforme seu nome em inglês em um belo nome chinês com inteligência cultural alimentada por IA',
        aiPowered: 'Alimentado por IA',
        culturalIntelligence: 'Inteligência Cultural',
        instantGeneration: 'Geração Instantânea',
        form: {
          nameLabel: 'Seu Nome em Inglês',
          namePlaceholder: 'Digite seu nome em inglês...',
          genderLabel: 'Preferência de Gênero',
          styleLabel: 'Estilo do Nome',
          generateButton: 'Gerar Nomes Chineses',
          generating: 'Gerando...'
        },
        styles: {
          traditional: 'Tradicional',
          modern: 'Moderno',
          business: 'Empresarial',
          cute: 'Fofo',
          neutral: 'Neutro'
        },
        genders: {
          male: 'Masculino',
          female: 'Feminino',
          neutral: 'Neutro'
        },
        results: {
          title: 'Seus Nomes Chineses',
          example: 'Exemplos de Nomes Chineses',
          regenerate: 'Gerar Novos Nomes'
        }
      },
      favorites: {
        title: 'Nomes Favoritos',
        empty: 'Nenhum nome favorito ainda',
        emptyDesc: 'Comece a gerar nomes e salve seus favoritos!'
      },
      about: {
        title: 'Sobre o Gerador de Nomes Chineses IA',
        description: 'Nosso sistema de IA combina a sabedoria tradicional chinesa de nomes com tecnologia moderna para criar nomes significativos.'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        favorites: 'Избранное',
        about: 'О нас'
      },
      home: {
        title: 'ИИ Генератор Китайских Имён',
        subtitle: 'Превратите ваше английское имя в красивое китайское имя с помощью культурного интеллекта на основе ИИ',
        aiPowered: 'На основе ИИ',
        culturalIntelligence: 'Культурный Интеллект',
        instantGeneration: 'Мгновенная Генерация',
        form: {
          nameLabel: 'Ваше Английское Имя',
          namePlaceholder: 'Введите ваше английское имя...',
          genderLabel: 'Предпочтение Пола',
          styleLabel: 'Стиль Имени',
          generateButton: 'Генерировать Китайские Имена',
          generating: 'Генерация...'
        },
        styles: {
          traditional: 'Традиционный',
          modern: 'Современный',
          business: 'Деловой',
          cute: 'Милый',
          neutral: 'Нейтральный'
        },
        genders: {
          male: 'Мужской',
          female: 'Женский',
          neutral: 'Нейтральный'
        },
        results: {
          title: 'Ваши Китайские Имена',
          example: 'Примеры Китайских Имён',
          regenerate: 'Генерировать Новые Имена'
        }
      },
      favorites: {
        title: 'Избранные Имена',
        empty: 'Пока нет избранных имён',
        emptyDesc: 'Начните генерировать имена и сохраняйте избранные!'
      },
      about: {
        title: 'О Генераторе Китайских Имён ИИ',
        description: 'Наша система ИИ сочетает традиционную китайскую мудрость именования с современными технологиями для создания значимых имён.'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        favorites: 'المفضلة',
        about: 'حول'
      },
      home: {
        title: 'مولد الأسماء الصينية بالذكاء الاصطناعي',
        subtitle: 'حول اسمك الإنجليزي إلى اسم صيني جميل بالذكاء الثقافي المدعوم بالذكاء الاصطناعي',
        aiPowered: 'مدعوم بالذكاء الاصطناعي',
        culturalIntelligence: 'الذكاء الثقافي',
        instantGeneration: 'التوليد الفوري',
        form: {
          nameLabel: 'اسمك الإنجليزي',
          namePlaceholder: 'أدخل اسمك الإنجليزي...',
          genderLabel: 'تفضيل الجنس',
          styleLabel: 'نمط الاسم',
          generateButton: 'توليد أسماء صينية',
          generating: 'جاري التوليد...'
        },
        styles: {
          traditional: 'تقليدي',
          modern: 'حديث',
          business: 'تجاري',
          cute: 'لطيف',
          neutral: 'محايد'
        },
        genders: {
          male: 'ذكر',
          female: 'أنثى',
          neutral: 'محايد'
        },
        results: {
          title: 'أسماؤك الصينية',
          example: 'أمثلة على الأسماء الصينية',
          regenerate: 'توليد أسماء جديدة'
        }
      },
      favorites: {
        title: 'الأسماء المفضلة',
        empty: 'لا توجد أسماء مفضلة بعد',
        emptyDesc: 'ابدأ في توليد الأسماء واحفظ مفضلاتك!'
      },
      about: {
        title: 'حول مولد الأسماء الصينية بالذكاء الاصطناعي',
        description: 'يجمع نظام الذكاء الاصطناعي لدينا بين الحكمة الصينية التقليدية في الأسماء والتكنولوجيا الحديثة لإنشاء أسماء ذات معنى.'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        favorites: 'पसंदीदा',
        about: 'के बारे में'
      },
      home: {
        title: 'AI चीनी नाम जेनरेटर',
        subtitle: 'AI-संचालित सांस्कृतिक बुद्धिमत्ता के साथ अपने अंग्रेजी नाम को एक सुंदर चीनी नाम में बदलें',
        aiPowered: 'AI-संचालित',
        culturalIntelligence: 'सांस्कृतिक बुद्धिमत्ता',
        instantGeneration: 'तत्काल जेनरेशन',
        form: {
          nameLabel: 'आपका अंग्रेजी नाम',
          namePlaceholder: 'अपना अंग्रेजी नाम दर्ज करें...',
          genderLabel: 'लिंग प्राथमिकता',
          styleLabel: 'नाम शैली',
          generateButton: 'चीनी नाम जेनरेट करें',
          generating: 'जेनरेट कर रहे हैं...'
        },
        styles: {
          traditional: 'पारंपरिक',
          modern: 'आधुनिक',
          business: 'व्यापारिक',
          cute: 'प्यारा',
          neutral: 'तटस्थ'
        },
        genders: {
          male: 'पुरुष',
          female: 'महिला',
          neutral: 'तटस्थ'
        },
        results: {
          title: 'आपके चीनी नाम',
          example: 'चीनी नाम उदाहरण',
          regenerate: 'नए नाम जेनरेट करें'
        }
      },
      favorites: {
        title: 'पसंदीदा नाम',
        empty: 'अभी तक कोई पसंदीदा नाम नहीं',
        emptyDesc: 'नाम जेनरेट करना शुरू करें और अपने पसंदीदा सेव करें!'
      },
      about: {
        title: 'AI चीनी नाम जेनरेटर के बारे में',
        description: 'हमारा AI सिस्टम पारंपरिक चीनी नामकरण ज्ञान को आधुनिक तकनीक के साथ जोड़कर अर्थपूर्ण नाम बनाता है।'
      }
    }
  },
  th: {
    translation: {
      nav: {
        home: 'หน้าแรก',
        favorites: 'รายการโปรด',
        about: 'เกี่ยวกับ'
      },
      home: {
        title: 'เครื่องมือสร้างชื่อจีน AI',
        subtitle: 'เปลี่ยนชื่ออังกฤษของคุณให้เป็นชื่อจีนที่สวยงามด้วยปัญญาทางวัฒนธรรมที่ขับเคลื่อนด้วย AI',
        aiPowered: 'ขับเคลื่อนด้วย AI',
        culturalIntelligence: 'ปัญญาทางวัฒนธรรม',
        instantGeneration: 'การสร้างทันที',
        form: {
          nameLabel: 'ชื่ออังกฤษของคุณ',
          namePlaceholder: 'ใส่ชื่ออังกฤษของคุณ...',
          genderLabel: 'ความต้องการเพศ',
          styleLabel: 'สไตล์ชื่อ',
          generateButton: 'สร้างชื่อจีน',
          generating: 'กำลังสร้าง...'
        },
        styles: {
          traditional: 'แบบดั้งเดิม',
          modern: 'สมัยใหม่',
          business: 'ธุรกิจ',
          cute: 'น่ารัก',
          neutral: 'เป็นกลาง'
        },
        genders: {
          male: 'ชาย',
          female: 'หญิง',
          neutral: 'เป็นกลาง'
        },
        results: {
          title: 'ชื่อจีนของคุณ',
          example: 'ตัวอย่างชื่อจีน',
          regenerate: 'สร้างชื่อใหม่'
        }
      },
      favorites: {
        title: 'ชื่อที่ชื่นชอบ',
        empty: 'ยังไม่มีชื่อที่ชื่นชอบ',
        emptyDesc: 'เริ่มสร้างชื่อและบันทึกรายการโปรดของคุณ!'
      },
      about: {
        title: 'เกี่ยวกับเครื่องมือสร้างชื่อจีน AI',
        description: 'ระบบ AI ของเราผสมผสานภูมิปัญญาการตั้งชื่อแบบจีนดั้งเดิมกับเทคโนโลยีสมัยใหม่เพื่อสร้างชื่อที่มีความหมาย'
      }
    }
  },
  vi: {
    translation: {
      nav: {
        home: 'Trang chủ',
        favorites: 'Yêu thích',
        about: 'Giới thiệu'
      },
      home: {
        title: 'Trình Tạo Tên Trung Quốc AI',
        subtitle: 'Biến đổi tên tiếng Anh của bạn thành một tên Trung Quốc đẹp với trí tuệ văn hóa được hỗ trợ bởi AI',
        aiPowered: 'Được hỗ trợ bởi AI',
        culturalIntelligence: 'Trí tuệ Văn hóa',
        instantGeneration: 'Tạo Tức thì',
        form: {
          nameLabel: 'Tên tiếng Anh của bạn',
          namePlaceholder: 'Nhập tên tiếng Anh của bạn...',
          genderLabel: 'Sở thích Giới tính',
          styleLabel: 'Phong cách Tên',
          generateButton: 'Tạo Tên Trung Quốc',
          generating: 'Đang tạo...'
        },
        styles: {
          traditional: 'Truyền thống',
          modern: 'Hiện đại',
          business: 'Kinh doanh',
          cute: 'Dễ thương',
          neutral: 'Trung tính'
        },
        genders: {
          male: 'Nam',
          female: 'Nữ',
          neutral: 'Trung tính'
        },
        results: {
          title: 'Tên Trung Quốc của bạn',
          example: 'Ví dụ Tên Trung Quốc',
          regenerate: 'Tạo Tên Mới'
        }
      },
      favorites: {
        title: 'Tên Yêu thích',
        empty: 'Chưa có tên yêu thích nào',
        emptyDesc: 'Bắt đầu tạo tên và lưu những tên yêu thích của bạn!'
      },
      about: {
        title: 'Giới thiệu Trình Tạo Tên Trung Quốc AI',
        description: 'Hệ thống AI của chúng tôi kết hợp trí tuệ đặt tên truyền thống Trung Quốc với công nghệ hiện đại để tạo ra những cái tên có ý nghĩa.'
      }
    }
  },
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        favorites: 'Favoriler',
        about: 'Hakkında'
      },
      home: {
        title: 'AI Çince İsim Üreticisi',
        subtitle: 'İngilizce isminizi AI destekli kültürel zeka ile güzel bir Çince isme dönüştürün',
        aiPowered: 'AI Destekli',
        culturalIntelligence: 'Kültürel Zeka',
        instantGeneration: 'Anında Üretim',
        form: {
          nameLabel: 'İngilizce İsminiz',
          namePlaceholder: 'İngilizce isminizi girin...',
          genderLabel: 'Cinsiyet Tercihi',
          styleLabel: 'İsim Stili',
          generateButton: 'Çince İsimler Üret',
          generating: 'Üretiliyor...'
        },
        styles: {
          traditional: 'Geleneksel',
          modern: 'Modern',
          business: 'İş',
          cute: 'Sevimli',
          neutral: 'Nötr'
        },
        genders: {
          male: 'Erkek',
          female: 'Kadın',
          neutral: 'Nötr'
        },
        results: {
          title: 'Çince İsimleriniz',
          example: 'Örnek Çince İsimler',
          regenerate: 'Yeni İsimler Üret'
        }
      },
      favorites: {
        title: 'Favori İsimler',
        empty: 'Henüz favori isim yok',
        emptyDesc: 'İsim üretmeye başlayın ve favorilerinizi kaydedin!'
      },
      about: {
        title: 'AI Çince İsim Üreticisi Hakkında',
        description: 'AI sistemimiz geleneksel Çince isimlendirme bilgeliğini modern teknoloji ile birleştirerek anlamlı isimler yaratır.'
      }
    }
  },
  pl: {
    translation: {
      nav: {
        home: 'Strona główna',
        favorites: 'Ulubione',
        about: 'O nas'
      },
      home: {
        title: 'Generator Chińskich Imion AI',
        subtitle: 'Przekształć swoje angielskie imię w piękne chińskie imię dzięki inteligencji kulturowej napędzanej przez AI',
        aiPowered: 'Napędzane przez AI',
        culturalIntelligence: 'Inteligencja Kulturowa',
        instantGeneration: 'Natychmiastowe Generowanie',
        form: {
          nameLabel: 'Twoje Angielskie Imię',
          namePlaceholder: 'Wprowadź swoje angielskie imię...',
          genderLabel: 'Preferencja Płci',
          styleLabel: 'Styl Imienia',
          generateButton: 'Generuj Chińskie Imiona',
          generating: 'Generowanie...'
        },
        styles: {
          traditional: 'Tradycyjny',
          modern: 'Nowoczesny',
          business: 'Biznesowy',
          cute: 'Słodki',
          neutral: 'Neutralny'
        },
        genders: {
          male: 'Mężczyzna',
          female: 'Kobieta',
          neutral: 'Neutralny'
        },
        results: {
          title: 'Twoje Chińskie Imiona',
          example: 'Przykładowe Chińskie Imiona',
          regenerate: 'Generuj Nowe Imiona'
        }
      },
      favorites: {
        title: 'Ulubione Imiona',
        empty: 'Brak ulubionych imion',
        emptyDesc: 'Zacznij generować imiona i zapisuj swoje ulubione!'
      },
      about: {
        title: 'O Generatorze Chińskich Imion AI',
        description: 'Nasz system AI łączy tradycyjną chińską mądrość nazewniczą z nowoczesną technologią, aby tworzyć znaczące imiona.'
      }
    }
  },
  nl: {
    translation: {
      nav: {
        home: 'Home',
        favorites: 'Favorieten',
        about: 'Over ons'
      },
      home: {
        title: 'AI Chinese Naam Generator',
        subtitle: 'Transformeer je Engelse naam in een prachtige Chinese naam met AI-aangedreven culturele intelligentie',
        aiPowered: 'AI-aangedreven',
        culturalIntelligence: 'Culturele Intelligentie',
        instantGeneration: 'Directe Generatie',
        form: {
          nameLabel: 'Je Engelse Naam',
          namePlaceholder: 'Voer je Engelse naam in...',
          genderLabel: 'Geslachtsvoorkeur',
          styleLabel: 'Naamstijl',
          generateButton: 'Genereer Chinese Namen',
          generating: 'Genereren...'
        },
        styles: {
          traditional: 'Traditioneel',
          modern: 'Modern',
          business: 'Zakelijk',
          cute: 'Schattig',
          neutral: 'Neutraal'
        },
        genders: {
          male: 'Mannelijk',
          female: 'Vrouwelijk',
          neutral: 'Neutraal'
        },
        results: {
          title: 'Je Chinese Namen',
          example: 'Voorbeeld Chinese Namen',
          regenerate: 'Genereer Nieuwe Namen'
        }
      },
      favorites: {
        title: 'Favoriete Namen',
        empty: 'Nog geen favoriete namen',
        emptyDesc: 'Begin met het genereren van namen en bewaar je favorieten!'
      },
      about: {
        title: 'Over de AI Chinese Naam Generator',
        description: 'Ons AI-systeem combineert traditionele Chinese naamgevingswijsheid met moderne technologie om betekenisvolle namen te creëren.'
      }
    }
  },
  sv: {
    translation: {
      nav: {
        home: 'Hem',
        favorites: 'Favoriter',
        about: 'Om oss'
      },
      home: {
        title: 'AI Kinesisk Namnsgenerator',
        subtitle: 'Förvandla ditt engelska namn till ett vackert kinesiskt namn med AI-driven kulturell intelligens',
        aiPowered: 'AI-driven',
        culturalIntelligence: 'Kulturell Intelligens',
        instantGeneration: 'Omedelbar Generering',
        form: {
          nameLabel: 'Ditt Engelska Namn',
          namePlaceholder: 'Ange ditt engelska namn...',
          genderLabel: 'Könspreferens',
          styleLabel: 'Namnstil',
          generateButton: 'Generera Kinesiska Namn',
          generating: 'Genererar...'
        },
        styles: {
          traditional: 'Traditionell',
          modern: 'Modern',
          business: 'Affärs',
          cute: 'Söt',
          neutral: 'Neutral'
        },
        genders: {
          male: 'Manlig',
          female: 'Kvinnlig',
          neutral: 'Neutral'
        },
        results: {
          title: 'Dina Kinesiska Namn',
          example: 'Exempel Kinesiska Namn',
          regenerate: 'Generera Nya Namn'
        }
      },
      favorites: {
        title: 'Favoritnamn',
        empty: 'Inga favoritnamn än',
        emptyDesc: 'Börja generera namn och spara dina favoriter!'
      },
      about: {
        title: 'Om AI Kinesisk Namnsgenerator',
        description: 'Vårt AI-system kombinerar traditionell kinesisk namngivningsvisdom med modern teknik för att skapa meningsfulla namn.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言设为英语
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;