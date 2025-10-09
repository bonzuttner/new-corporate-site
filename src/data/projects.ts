import { Project } from '../types/Project';

export const jaProjects: Project[] = [
  {
    id: 16,
    title: "ノウドー障がい者特化就労マッチングプラットフォーム",
    client: "ノウドー株式会社",
    description: "ノウドーは\"人生を、能動的に\"を理念とし、障がいを持つ求職者・就労移行支援事業所・企業をつなぐ就労マッチングプラットフォームを運営しています。求職者が自身の\"強み\"や\"やりたいこと\"をベースに企業へ提案できるしくみを備え、単なる求人サイトではなく、双方向型の価値創出を目指しています。面接重視ではなく、提案型就職・推薦機能、レコメンド機能、支援事業所との連携機能などを含む包括的なマッチング機能を提供しています。",
    technologies: ["PHP", "React", "Webアプリ", "マッチングシステム", "SaaS", "レコメンド", "API連携"],
    category: "システム",
    url: "https://company.knowdojobs.com/page/service?utm_source=chatgpt.com"
  },
  {
    id: 15,
    title: "クラウド受付システム（タブレット／モバイルアプリ）",
    client: "プロダクトシンク株式会社",
    description: "\"プロダクトを想像して創造する\"という理念のもと事業展開するプロダクトシンク株式会社向けに、クラウド型受付システムを開発しました。本システムはオフィスやイベント会場での来訪者管理を効率化し、ペーパーレスかつセキュアに来客受付を行える仕組みです。タブレットやスマートフォンを用いた直感的な操作性を重視し、UI/UX設計からコーディングまで一貫して担当。スムーズなチェックイン体験と管理者側の利便性向上を両立しました。",
    technologies: ["Laravel", "JavaScript", "クラウド", "モバイルアプリ", "UI/UXデザイン", "来訪者管理"],
    category: "システム",
    url: "https://www.product-think.co.jp/"
  },
  {
    id: 1,
    title: "POLARISS",
    client: "IoT Security Solutions",
    description: "POLARISSは、バイクや自動車を保護するためのIoTベースのGPSセキュリティデバイスです。GPS、みちびき、GLONASSなど複数の衛星システムを活用し、遠隔地でも高精度な位置情報を提供します。常時クラウドにデータをアップロードし、LINEアプリを通じて車両の位置、バッテリー状態、温度、湿度をいつでも確認できます。設定したジオフェンス外に車両が移動した場合、即座にアラートを受け取り、盗難の検知と回復を改善します。京セラのハードウェアを基盤に、POLARISSはコンパクトで耐久性があり、設置が簡単で、充電式バッテリーは配線可能です。POLARISSは、現代のモビリティニーズに合わせた直感的で信頼性の高い、スケーラブルなIoTセキュリティソリューションを提供するBonzuttnerのコミットメントを反映しています。",
    technologies: ["IoT", "Azure Cloud", "Serverless", "LINE Chatbot", "Web App", "Soracom Func", "GPS", "Kyocera Hardware"],
    category: "システム",
    url: "https://thingsline.co.jp/index/"
  },
  {
    id: 2,
    title: "オンライン研修用WEBアプリケーション",
    client: "東京大学大学院教育学研究科 附属バリアフリー教育開発研究センター",
    description: "DEI研修講師向けの研修に活用されるウェブゲームアプリケーションです。コロナ禍以前は対面で行っていたルーレットやカードゲームをオンライン上に再現し、複雑な配点ロジックも含めてシステム化しました。管理者・チーム・個人ごとのID発行を可能にする会員システムを備え、学習の場をより公平かつ柔軟に提供しています。",
    technologies: ["PHP", "Laravel", "AWS", "Webアプリ", "会員管理", "ゲーミフィケーション"],
    category: "アプリケーション",
    url: "https://www.otd0507.org/"
  },
  {
    id: 14,
    title: "会員制施設予約システムソフトウェア",
    client: "株式会社ダイナックス",
    description: "会員向け施設予約を効率化するシステムを構築。スムーズな予約体験を実現するため、リアルタイム更新機能を搭載。",
    technologies: ["PHP Laravel", "React", "AWS"],
    category: "システム",
    url: "https://www.dynax.co.jp"
  },
  {
    id: 3,
    title: "東京電機大学 学生用会員制掲示板型SNS",
    client: "東京電機大学",
    description: "学生向けの安全なSNSを開発。掲示板機能を中心に、ユーザー同士の情報共有を促進。",
    technologies: ["WordPress", "PHP", "CSS"],
    category: "WEBサイト",
    url: "https://www.ad.dendai.ac.jp/"
  },
  {
    id: 4,
    title: "新規ECサイト構築",
    client: "某ファッションブランド",
    description: "ブランド専用のECサイトを開発し、ショッピングカート、決済、在庫管理を統合。",
    technologies: ["Shopify", "React", "Next.js"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 5,
    title: "AI画像認識を活用した検品アプリ",
    client: "製造業クライアント",
    description: "AIを活用し、製品の不良を自動検出するスマホアプリを開発。",
    technologies: ["Python", "TensorFlow", "React Native"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 6,
    title: "BtoB向け受発注管理システム",
    client: "食品業界大手",
    description: "企業間取引の受発注を効率化するWebシステムを開発。大量データ処理を最適化。",
    technologies: ["Java", "Spring Boot", "AWS"],
    category: "システム",
    url: ""
  },
  {
    id: 7,
    title: "医療相談プラットフォーム",
    client: "医療法人",
    description: "オンライン診療と相談を提供するプラットフォーム。セキュリティ強化に重点。",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 8,
    title: "多言語対応コーポレートサイト",
    client: "グローバル企業",
    description: "海外拠点向けの多言語対応Webサイトを開発。SEO最適化を実施。",
    technologies: ["Next.js", "i18next", "Tailwind CSS"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 9,
    title: "マッチングサービス構築",
    client: "スタートアップ",
    description: "ユーザー間マッチング機能を搭載したサービスを開発。レコメンドアルゴリズムを実装。",
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 10,
    title: "営業支援CRMシステム",
    client: "IT企業",
    description: "営業活動を可視化するCRMシステムを開発。分析ダッシュボードを追加。",
    technologies: ["PHP Laravel", "MySQL", "Vue.js"],
    category: "システム",
    url: ""
  },
  {
    id: 11,
    title: "オンライン学習プラットフォーム",
    client: "教育関連会社",
    description: "講義配信、課題管理、進捗確認を統合した学習プラットフォームを構築。",
    technologies: ["React", "Node.js", "GraphQL"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 12,
    title: "SNS型コミュニティサイト",
    client: "趣味関連企業",
    description: "共通の趣味を持つユーザーが交流できるSNS型Webサービスを開発。",
    technologies: ["Ruby on Rails", "React", "AWS"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 13,
    title: "基幹業務システム刷新",
    client: "大手製造業",
    description: "老朽化した基幹システムをクラウド対応に刷新し、業務効率を改善。",
    technologies: ["Java", "Spring Boot", "Oracle DB"],
    category: "システム",
    url: ""
  }
];

export const enProjects: Project[] = [
  {
    id: 16,
    title: "Knowdo - Job Matching Platform for People with Disabilities",
    client: "Knowdo Inc.",
    description: "Knowdo operates a job matching platform connecting job seekers with disabilities, employment transition support offices, and companies under the philosophy of 'Living Life Proactively'. The platform features a mechanism where job seekers can propose to companies based on their 'strengths' and 'aspirations', aiming for bidirectional value creation rather than just being a job board. It provides comprehensive matching functions including proposal-based employment, recommendation features, and coordination with support offices, rather than focusing solely on interviews.",
    technologies: ["PHP", "React", "Web App", "Matching System", "SaaS", "Recommendation", "API Integration"],
    category: "System",
    url: "https://company.knowdojobs.com/page/service?utm_source=chatgpt.com"
  },
  {
    id: 15,
    title: "Cloud Reception System (Tablet/Mobile App)",
    client: "Product Think Inc.",
    description: "We developed a cloud-based reception system for Product Think Inc., which operates under the philosophy of 'Imagine and Create Products'. This system streamlines visitor management at offices and event venues, enabling paperless and secure guest reception. Emphasizing intuitive operability using tablets and smartphones, we handled everything from UI/UX design to coding, achieving both a smooth check-in experience and improved administrator convenience.",
    technologies: ["Laravel", "JavaScript", "Cloud", "Mobile App", "UI/UX Design", "Visitor Management"],
    category: "System",
    url: "https://www.product-think.co.jp/"
  },
  {
    id: 1,
    title: "POLARISS",
    client: "IoT Security Solutions",
    description: "POLARISS is an advanced IoT-based GPS security device designed to protect motorcycles and cars by providing real-time location tracking and smart monitoring features. Utilizing multiple satellite systems—GPS, Michibiki, and GLONASS—it offers highly accurate positioning, even in remote areas. It constantly uploads data to the cloud, allowing users to check their vehicle's location, battery status, temperature, and humidity at any time through the LINE app. Users can receive instant alerts if the vehicle moves outside a preset geofence, improving theft detection and recovery. Built on reliable Kyocera hardware, POLARISS is compact, durable, and easy to set up, with a rechargeable battery that can be hardwired. POLARISS reflects Bonzuttner's commitment to delivering intuitive, reliable, and scalable IoT security solutions tailored to modern mobility needs.",
    technologies: ["IoT", "Azure Cloud", "Serverless", "LINE Chatbot", "Web App", "Soracom Func", "GPS", "Kyocera Hardware"],
    category: "System",
    url: "https://thingsline.co.jp/index/"
  },
  {
    id: 2,
    title: "Online Training Web Application",
    client: "Barrier-free Education Development Research Center, Graduate School of Education, The University of Tokyo",
    description: "A web game application used for training DEI instructors. We digitized roulette and card games that were previously conducted face-to-face before the COVID-19 pandemic, including systematization of complex scoring logic. It features a membership system that enables ID issuance for administrators, teams, and individuals, providing a more equitable and flexible learning environment.",
    technologies: ["PHP", "Laravel", "AWS", "Web App", "Member Management", "Gamification"],
    category: "Application",
    url: "https://www.otd0507.org/"
  },
  {
    id: 14,
    title: "Membership Facility Reservation System Software",
    client: "Dynax Corporation",
    description: "Built a system to streamline facility reservations for members. Implemented real-time update functionality to ensure a smooth reservation experience.",
    technologies: ["PHP Laravel", "React", "AWS"],
    category: "System",
    url: "https://www.dynax.co.jp"
  },
  {
    id: 3,
    title: "Tokyo Denki University Student Membership Bulletin Board SNS",
    client: "Tokyo Denki University",
    description: "Developed a secure SNS for students. Promoted information sharing between users centered around bulletin board functionality.",
    technologies: ["WordPress", "PHP", "CSS"],
    category: "Website",
    url: "https://www.ad.dendai.ac.jp/"
  },
  {
    id: 4,
    title: "New E-commerce Site Development",
    client: "Fashion Brand Client",
    description: "Developed a brand-specific e-commerce site integrating shopping cart, payment, and inventory management.",
    technologies: ["Shopify", "React", "Next.js"],
    category: "Website",
    url: ""
  },
  {
    id: 5,
    title: "AI Image Recognition Inspection App",
    client: "Manufacturing Industry Client",
    description: "Developed a smartphone app that automatically detects product defects using AI.",
    technologies: ["Python", "TensorFlow", "React Native"],
    category: "Application",
    url: ""
  },
  {
    id: 6,
    title: "B2B Order Management System",
    client: "Major Food Industry Company",
    description: "Developed a web system to streamline B2B order processing. Optimized large data processing.",
    technologies: ["Java", "Spring Boot", "AWS"],
    category: "System",
    url: ""
  },
  {
    id: 7,
    title: "Medical Consultation Platform",
    client: "Medical Corporation",
    description: "Platform providing online medical consultations and advice. Focus on enhanced security.",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Application",
    url: ""
  },
  {
    id: 8,
    title: "Multilingual Corporate Website",
    client: "Global Corporation",
    description: "Developed a multilingual website for overseas offices. Implemented SEO optimization.",
    technologies: ["Next.js", "i18next", "Tailwind CSS"],
    category: "Website",
    url: ""
  },
  {
    id: 9,
    title: "Matching Service Development",
    client: "Startup Company",
    description: "Developed a service with user matching functionality. Implemented recommendation algorithms.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "Website",
    url: ""
  },
  {
    id: 10,
    title: "Sales Support CRM System",
    client: "IT Company",
    description: "Developed a CRM system to visualize sales activities. Added analytics dashboard.",
    technologies: ["PHP Laravel", "MySQL", "Vue.js"],
    category: "System",
    url: ""
  },
  {
    id: 11,
    title: "Online Learning Platform",
    client: "Education Company",
    description: "Built a learning platform integrating lecture delivery, assignment management, and progress tracking.",
    technologies: ["React", "Node.js", "GraphQL"],
    category: "Application",
    url: ""
  },
  {
    id: 12,
    title: "SNS-type Community Site",
    client: "Hobby-related Company",
    description: "Developed an SNS-type web service where users with common interests can interact.",
    technologies: ["Ruby on Rails", "React", "AWS"],
    category: "Website",
    url: ""
  },
  {
    id: 13,
    title: "Core Business System Renewal",
    client: "Major Manufacturing Company",
    description: "Renewed aging core system to be cloud-compatible, improving operational efficiency.",
    technologies: ["Java", "Spring Boot", "Oracle DB"],
    category: "System",
    url: ""
  }
];