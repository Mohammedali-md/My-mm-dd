import { CategoryInfo, Product, Order } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'gifts',
    name: 'الهدايا الفاخرة',
    description: 'صناديق هدايا مختارة بعناية للمناسبات السعيدة والأعياد واللحظات الخاصة',
    iconName: 'Gift',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    bannerTag: 'أفضل الخيارات'
  },
  {
    id: 'perfumes',
    name: 'العطور الراقية',
    description: 'تشكيلة ساحرة من العطور الشرقية الأصيلة والفرنسية الفواحة للرجال والنساء',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    bannerTag: 'ثبات يدوم طويلاً'
  },
  {
    id: 'accessories',
    name: 'الإكسسوارات الأنيقة',
    description: 'ساعات، أساور، وقلائد مميزة تضفي لمسة من البريق والأناقة العصرية',
    iconName: 'Watch',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    bannerTag: 'تصاميم حصرية'
  },
  {
    id: 'natural-roses',
    name: 'باقات الورد الطبيعي',
    description: 'ورود طبيعية طازجة منتقاة يومياً تفيض بالنضارة والروائح العذبة',
    iconName: 'Flower2',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    bannerTag: 'طازجة يومياً'
  },
  {
    id: 'artificial-roses',
    name: 'باقات الورد الصناعي والفاخر',
    description: 'ورود دائمة مخملية ومحفوظة تحتفظ بجمالها ورونقها لسنوات طويلة',
    iconName: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    bannerTag: 'جمال دائم'
  },
  {
    id: 'gift-wrapping',
    name: 'تغليف الهدايا المخصص',
    description: 'خدمات تغليف احترافية بالورق الفاخر والأشرطة الحريرية وبطاقات الإهداء',
    iconName: 'Package',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    bannerTag: 'لمسة إبداعية'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'صندوق المفاجأة الملكي (Surprise Royal Box)',
    category: 'gifts',
    price: 380,
    originalPrice: 450,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    description: 'صندوق فاخر يحتوي على تشكيلة متميزة من الشوكولاتة الفاخرة، شمعة معطرة برائحة اللافندر، وعطر مسك ناعم مع تغليف مخملي أنيق وكرت إهداء مخصص.',
    features: ['شوكولاتة بلجيكية فاخرة', 'شمعة صويا طبيعية معطرة', 'عطر مسك مصغر 30 مل', 'صندوق جلدي أبيض مع شريط ذهبي'],
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-2',
    name: 'عطر مسك الليل الفاخر 100 مل',
    category: 'perfumes',
    price: 295,
    originalPrice: 350,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    description: 'مزيج ساحر من دهن العود الأبيض، الباتشولي، وزهرة السوسن. يتميز بثبات عالي يدوم لأكثر من 24 ساعة ومناسب للجنسين.',
    features: ['تركيز أو دو بارفان (Eau de Parfum)', 'ثبات عالي وانتشار فوّاح', 'زجاجة كرستالية فاخرة', 'تغليف هدية مجاني'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 54,
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-3',
    name: 'باقة جوري أحمر ملكية (50 وردة طبيعية)',
    category: 'natural-roses',
    price: 240,
    originalPrice: 280,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    description: 'باقة ضخمة من أجود أنواع الورد الجوري الأحمر الهولندي الطازج، ملفوفة بغلاف أسود مطفي مع شريط أحمر ساتان وكرت إهداء.',
    features: ['50 جوري هولندي فاخر قطف اليوم', 'غلاف أسود فاخر مقاوم للماء', 'تغذية خاصة لإطالة عمر الورد', 'بطاقة إهداء فاخرة مجاناً'],
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 82,
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-4',
    name: 'سوار ذهبي مرصّع بالزركون مع علبة قطيفة',
    category: 'accessories',
    price: 185,
    originalPrice: 220,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    description: 'إسوارة ناعمة مطلية بالذهب عيار 18 مقاومة للصدأ وتغير اللون، مرصعة بأحجار زركون سويسرية لامعة، تأتي في علبة مخملية فاخرة جاهزة للإهداء.',
    features: ['مطلية بالذهب عيار 18 بجودة عالية', 'مقاومة للماء ولا تسبب حساسية', 'مقاس قابل للتعديل لجميع المعاصم', 'علبة هدية مبطنة مخملية'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 29,
    createdAt: '2026-02-20'
  },
  {
    id: 'prod-5',
    name: 'قبة الوردة الأبدية المحفوظة مع إضاءة LED',
    category: 'artificial-roses',
    price: 165,
    originalPrice: 195,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    description: 'وردة حمراء مخملية أبدية تعيش لسنوات دون الحاجة للماء، داخل قبة زجاجية عالية النقاء وقاعدة خشبية مع خيوط إضاءة LED دافئة.',
    features: ['وردة طبيعية معالجة تدوم 3-5 سنوات', 'قبة زجاجية مقاومة للخدش', 'إضاءة دافئة ببطارية خفية', 'هدية رومانسية خالدة'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 41,
    createdAt: '2026-02-25'
  },
  {
    id: 'prod-6',
    name: 'باقة الورد الوردي والأبيض الكلاسيكية (طبيعي)',
    category: 'natural-roses',
    price: 190,
    originalPrice: 230,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    description: 'توليفة بديعة من الجوري الوردي، البيبي روز الأبيض، وأغصان الأوكالبتوس العطرية بتنسيق عصري راقي للمناسبات والتخرج والتهاني.',
    features: ['زهور طبيعية طازجة ونضرة', 'تنسيق أنيق بأوراق الأوكالبتوس الخضراء', 'غلاف رمادي ناعم وشريط حريري', 'مناسبة لجميع الاحتفالات'],
    isFeatured: false,
    rating: 4.8,
    reviewCount: 23,
    createdAt: '2026-03-02'
  },
  {
    id: 'prod-7',
    name: 'عطر فلورال روز بيري 85 مل',
    category: 'perfumes',
    price: 245,
    originalPrice: 290,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    description: 'نفحات أنثوية عذبة من التوت البري، زهر البرتقال، والورد الدمشقي مع قاعدة دافئة من الفانيليا والمسك الأبيض.',
    features: ['رائحة منعشة ومبهجة', 'ثبات ممتاز مناسب للاستخدام اليومي', 'زجاجة أنيقة بتصميم وردي ذهبي', 'تغليف سيلوفان أصلي'],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 19,
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-8',
    name: 'طقم إهداء رجالي متكامل (ساعة + قلم + كبك)',
    category: 'gifts',
    price: 340,
    originalPrice: 420,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'طقم إهداء رجالي فاخر يحتوي على ساعة يد ستانلس ستيل أنيقة، قلم حبر كروي فاخر، وزوج كبك أنيق مع علبة خشبية مبطنة.',
    features: ['ساعة مقاومة للماء مع ضمان سنة', 'قلم كتابة فاخر مطلي بالروديوم', 'كبك مصقول بحواف ناعمة', 'صندوق إهداء راقي مطرز'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 33,
    createdAt: '2026-02-28'
  },
  {
    id: 'prod-9',
    name: 'سلسال فضة إسترليني 925 مع دلاية قلب ونبض',
    category: 'accessories',
    price: 145,
    originalPrice: 175,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    description: 'قلادة ناعمة مصنوعة من الفضة الخالصة عيار 925، تصميم قلب رقيق بلمعة ساحرة. تأتي مع شهادة الفضة وعلبة قطيفة مضيئة.',
    features: ['فضة إسترليني 925 أصلية', 'لا تصدأ ولا يتغير بريقها', 'سلسلة رفيعة أنيقة قابلة للتعديل', 'علبة هدية فاخرة'],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 16,
    createdAt: '2026-02-22'
  },
  {
    id: 'prod-10',
    name: 'باقة توليب صناعي تركي لملمس واقعي (20 حبة)',
    category: 'artificial-roses',
    price: 130,
    originalPrice: 160,
    stock: 17,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80',
    description: 'أزهار توليب بيضاء وزهرية بملمس طبيعي تماماً (Real Touch) تدوم للأبد دون أي ذبول، مع فازة سيراميك عصرية بيضاء.',
    features: ['ملمس سيليكوني مطابق للورد الطبيعي', 'ألوان ثابتة لا تتأثر بالضوء', 'تشمل فازة سيراميك أسطوانية', 'سهلة التنظيف والغسيل'],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 14,
    createdAt: '2026-03-03'
  },
  {
    id: 'prod-11',
    name: 'خدمة التغليف الذهبي الفاخر مع ختم شمعي',
    category: 'gift-wrapping',
    price: 45,
    originalPrice: 60,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    description: 'تغليف الهدايا يدوياً باستخدام ورق سميك مزخرف بتدرجات ذهبية أو وردية، وشريط حريري عريض، مع ختم شمعي ملكي وكرت إهداء مكتوب بالخط العربي.',
    features: ['ورق تغليف ياباني فاخر 120 غرام', 'شريط ساتان مزدوج عريض', 'ختم شمعي أصلي مذهب', 'كتابة رسالتك بخط يدوي متقن'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 95,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-12',
    name: 'صندوق الهدايا الأكريليك الشفاف مع إضاءة وأزهار',
    category: 'gift-wrapping',
    price: 75,
    originalPrice: 95,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80',
    description: 'صندوق أكريليك شفاف فاخر عالي الوضوح، مبطن ببتلات الورد المجفف مع إضاءة مايكرو دافئة تمنح هديتك ظهوراً مبهراً واستثنائياً.',
    features: ['أكريليك نقي مقاوم للصدمات', 'قفل مغناطيسي خفي', 'بتلات ورد مجفف معطرة داخل القاعدة', 'شريط قماشي مخصص'],
    isFeatured: false,
    rating: 4.8,
    reviewCount: 31,
    createdAt: '2026-02-14'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SG-84920',
    customerName: 'فهد السبيعي',
    customerPhone: '+966 50 123 4567',
    city: 'الرياض',
    address: 'حي النرجس، شارع أنس بن مالك، فيلا 14',
    isGiftForOther: true,
    recipientName: 'نورة بنت خالد',
    recipientPhone: '+966 55 987 6543',
    giftMessage: 'ألف مبروك التخرج يا أغلى أخت، عقبال أعلى المراتب بإذن الله! ❤️',
    paymentMethod: 'apple_pay',
    items: [
      {
        productId: 'prod-3',
        productName: 'باقة جوري أحمر ملكية (50 وردة طبيعية)',
        productImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
        category: 'natural-roses',
        price: 240,
        quantity: 1
      },
      {
        productId: 'prod-11',
        productName: 'خدمة التغليف الذهبي الفاخر مع ختم شمعي',
        productImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
        category: 'gift-wrapping',
        price: 45,
        quantity: 1
      }
    ],
    subtotal: 285,
    shippingFee: 0,
    giftWrappingFee: 0,
    total: 285,
    status: 'processing',
    createdAt: '2026-09-04T18:30:00Z',
    notes: 'العميل يرغب بالتسليم بعد صلاة العصر مباشرة'
  },
  {
    id: 'ord-1002',
    orderNumber: 'SG-84921',
    customerName: 'سارة عبدالرحمن',
    customerPhone: '+966 54 888 1234',
    city: 'جدة',
    address: 'حي الروضة، طريق الكيال، برج الأفق شقة 4B',
    isGiftForOther: false,
    paymentMethod: 'card',
    items: [
      {
        productId: 'prod-2',
        productName: 'عطر مسك الليل الفاخر 100 مل',
        productImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
        category: 'perfumes',
        price: 295,
        quantity: 1
      }
    ],
    subtotal: 295,
    shippingFee: 0,
    giftWrappingFee: 0,
    total: 295,
    status: 'shipped',
    createdAt: '2026-09-03T11:15:00Z'
  },
  {
    id: 'ord-1003',
    orderNumber: 'SG-84922',
    customerName: 'محمد الشهري',
    customerPhone: '+966 56 333 7788',
    city: 'الدمام',
    address: 'حي الشاطئ، شارع الأشرعة، مجمع الواحة',
    isGiftForOther: true,
    recipientName: 'أم محمد (الوالدة)',
    recipientPhone: '+966 50 444 9900',
    giftMessage: 'إلى أمي الغالية، ربي يحفظك ويديم ابتسامتك يا نور البيت وعطره 🌸',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'prod-1',
        productName: 'صندوق المفاجأة الملكي (Surprise Royal Box)',
        productImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
        category: 'gifts',
        price: 380,
        quantity: 1
      }
    ],
    subtotal: 380,
    shippingFee: 0,
    giftWrappingFee: 0,
    total: 380,
    status: 'delivered',
    createdAt: '2026-09-02T09:40:00Z'
  },
  {
    id: 'ord-1004',
    orderNumber: 'SG-84923',
    customerName: 'ريم العتيبي',
    customerPhone: '+966 55 111 2233',
    city: 'الرياض',
    address: 'حي الياسمين، فيلا 29',
    isGiftForOther: false,
    paymentMethod: 'card',
    items: [
      {
        productId: 'prod-5',
        productName: 'قبة الوردة الأبدية المحفوظة مع إضاءة LED',
        productImage: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
        category: 'artificial-roses',
        price: 165,
        quantity: 2
      }
    ],
    subtotal: 330,
    shippingFee: 0,
    giftWrappingFee: 0,
    total: 330,
    status: 'new',
    createdAt: '2026-09-05T04:20:00Z'
  }
];

// Presets images helper for Admin product creation/edit
export const IMAGE_PRESETS = [
  { label: 'صندوق هدايا فاخر شريط ذهبي', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', category: 'gifts' },
  { label: 'طقم إهداء رجالي أنيق', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', category: 'gifts' },
  { label: 'علبة هدايا زهرية مخملية', url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80', category: 'gifts' },
  { label: 'عطر كرستالي زجاجة فاخرة', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80', category: 'perfumes' },
  { label: 'عطر نسائي أنيق وردي', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80', category: 'perfumes' },
  { label: 'عطر شرقي بالعود والعنبر', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80', category: 'perfumes' },
  { label: 'سوار ذهبي وعلبة قطيفة', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', category: 'accessories' },
  { label: 'سلسال فضة إسترليني ناعم', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', category: 'accessories' },
  { label: 'خاتم ألماس وعلبة إهداء', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', category: 'accessories' },
  { label: 'باقة ورد أحمر جوري هولندي', url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80', category: 'natural-roses' },
  { label: 'باقة بيبي روز وردي وأبيض', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', category: 'natural-roses' },
  { label: 'زهور طبيعية متنوعة في فازة', url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80', category: 'natural-roses' },
  { label: 'قبة وردة أبدية مع إضاءة دافئة', url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80', category: 'artificial-roses' },
  { label: 'باقة توليب صناعي تركي', url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80', category: 'artificial-roses' },
  { label: 'ورد مجفف بوهيمي راقي', url: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80', category: 'artificial-roses' },
  { label: 'تغليف هدايا مع ختم شمعي', url: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80', category: 'gift-wrapping' },
  { label: 'صندوق أكريليك شفاف للهدايا', url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80', category: 'gift-wrapping' },
  { label: 'شرائط حريرية وأوراق تغليف مذهبة', url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80', category: 'gift-wrapping' }
];
