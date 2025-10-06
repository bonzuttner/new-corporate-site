
"use client";

import React from "react";
import HistoryCard from "./components/HistoryCard";
import { useFilter } from "@/Store/FilterContext";

 const projects = [
  {
    id: 16,
    title: "ノウドー障がい者特化就労マッチングプラットフォーム",
    client: "ノウドー株式会社",
    description: "ノウドーは「人生を、能動的に」を理念とし、障がいを持つ求職者・就労移行支援事業所・企業をつなぐ就労マッチングプラットフォームを運営しています。求職者が自身の\"強み\"や\"やりたいこと\"をベースに企業へ提案できるしくみを備え、単なる求人サイトではなく、双方向型の価値創出を目指しています。面接重視ではなく、提案型就職・推薦機能、レコメンド機能、支援事業所との連携機能などを含む包括的なマッチング機能を提供しています。",
    technologies: ["PHP", "React", "Webアプリ", "マッチングシステム", "SaaS", "レコメンド", "API連携"],
    category: "システム",
    url: "https://company.knowdojobs.com/page/service?utm_source=chatgpt.com"
  },
  {
    id: 15,
    title: "クラウド受付システム（タブレット／モバイルアプリ）",
    client: "プロダクトシンク株式会社",
    description: "「プロダクトを想像して創造する」という理念のもと事業展開するプロダクトシンク株式会社向けに、クラウド型受付システムを開発しました。本システムはオフィスやイベント会場での来訪者管理を効率化し、ペーパーレスかつセキュアに来客受付を行える仕組みです。タブレットやスマートフォンを用いた直感的な操作性を重視し、UI/UX設計からコーディングまで一貫して担当。スムーズなチェックイン体験と管理者側の利便性向上を両立しました。",
    technologies: ["Laravel", "JavaScript", "クラウド", "モバイルアプリ", "UI/UXデザイン", "来訪者管理"],
    category: "システム",
    url: "https://www.product-think.co.jp/"
  },
  {
    id: 1,
    title: "POLARISS",
    client: "IoT Security Solutions",
    description: "POLARISS is an advanced IoT-based GPS security device designed to protect motorcycles and cars by providing real-time location tracking and smart monitoring features. Utilizing multiple satellite systems—GPS, Michibiki, and GLONASS—it offers highly accurate positioning, even in remote areas. It constantly uploads data to the cloud, allowing users to check their vehicle's location, battery status, temperature, and humidity at any time through the LINE app. Users can receive instant alerts if the vehicle moves outside a preset geofence, improving theft detection and recovery. Built on reliable Kyocera hardware, POLARISS is compact, durable, and easy to set up, with a rechargeable battery that can be hardwired. POLARISS reflects Bonzuttner's commitment to delivering intuitive, reliable, and scalable IoT security solutions tailored to modern mobility needs.",
    technologies: ["IoT", "Azure Cloud", "Serverless", "LINE Chatbot", "Web App", "Soracom Func", "GPS", "Kyocera Hardware"],
    category: "システム",
    url: "https://thingsline.co.jp/index/"
  },
  {
    id: 2,
    title: "オンライン研修用WEBアプリケーション",
    client: "東京大学大学院教育学研究科 附属バリアフリー教育開発研究センター",
    description:
      "DEI研修講師向けの研修に活用されるウェブゲームアプリケーションです。コロナ禍以前は対面で行っていたルーレットやカードゲームをオンライン上に再現し、複雑な配点ロジックも含めてシステム化しました。管理者・チーム・個人ごとのID発行を可能にする会員システムを備え、学習の場をより公平かつ柔軟に提供しています。",
    technologies: ["PHP", "Laravel", "AWS", "Webアプリ", "会員管理", "ゲーミフィケーション"],
    category: "アプリケーション",
    url: "https://www.otd0507.org/"
  },
  {
    id: 14,
    title: "会員制施設予約システムソフトウェア",
    client: "株式会社ダイナックス",
    description:
      "会員向け施設予約を効率化するシステムを構築。スムーズな予約体験を実現するため、リアルタイム更新機能を搭載。",
    technologies: ["PHP Laravel", "React", "AWS"],
    category: "システム",
    url: "https://www.dynax.co.jp"
  },
  {
    id: 3,
    title: "東京電機大学 学生用会員制掲示板型SNS",
    client: "東京電機大学",
    description:
      "学生向けの安全なSNSを開発。掲示板機能を中心に、ユーザー同士の情報共有を促進。",
    technologies: ["WordPress", "PHP", "CSS"],
    category: "WEBサイト",
    url: "https://www.ad.dendai.ac.jp/"
  },
  {
    id: 4,
    title: "新規ECサイト構築",
    client: "某ファッションブランド",
    description:
      "ブランド専用のECサイトを開発し、ショッピングカート、決済、在庫管理を統合。",
    technologies: ["Shopify", "React", "Next.js"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 5,
    title: "AI画像認識を活用した検品アプリ",
    client: "製造業クライアント",
    description:
      "AIを活用し、製品の不良を自動検出するスマホアプリを開発。",
    technologies: ["Python", "TensorFlow", "React Native"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 6,
    title: "BtoB向け受発注管理システム",
    client: "食品業界大手",
    description:
      "企業間取引の受発注を効率化するWebシステムを開発。大量データ処理を最適化。",
    technologies: ["Java", "Spring Boot", "AWS"],
    category: "システム",
    url: ""
  },
  {
    id: 7,
    title: "医療相談プラットフォーム",
    client: "医療法人",
    description:
      "オンライン診療と相談を提供するプラットフォーム。セキュリティ強化に重点。",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 8,
    title: "多言語対応コーポレートサイト",
    client: "グローバル企業",
    description:
      "海外拠点向けの多言語対応Webサイトを開発。SEO最適化を実施。",
    technologies: ["Next.js", "i18next", "Tailwind CSS"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 9,
    title: "マッチングサービス構築",
    client: "スタートアップ",
    description:
      "ユーザー間マッチング機能を搭載したサービスを開発。レコメンドアルゴリズムを実装。",
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 10,
    title: "営業支援CRMシステム",
    client: "IT企業",
    description:
      "営業活動を可視化するCRMシステムを開発。分析ダッシュボードを追加。",
    technologies: ["PHP Laravel", "MySQL", "Vue.js"],
    category: "システム",
    url: ""
  },
  {
    id: 11,
    title: "オンライン学習プラットフォーム",
    client: "教育関連会社",
    description:
      "講義配信、課題管理、進捗確認を統合した学習プラットフォームを構築。",
    technologies: ["React", "Node.js", "GraphQL"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 12,
    title: "SNS型コミュニティサイト",
    client: "趣味関連企業",
    description:
      "共通の趣味を持つユーザーが交流できるSNS型Webサービスを開発。",
    technologies: ["Ruby on Rails", "React", "AWS"],
    category: "WEBサイト",
    url: ""
  },
  {
    id: 13,
    title: "基幹業務システム刷新",
    client: "大手製造業",
    description:
      "老朽化した基幹システムをクラウド対応に刷新し、業務効率を改善。",
    technologies: ["Java", "Spring Boot", "Oracle DB"],
    category: "システム",
    url: ""
  }
];

const WorkHistory = () => {
  const { activeCategory, searchQuery } = useFilter();    
  const filteredProjects = projects.filter((p) => {
    const matchCategory =
      activeCategory === "すべて" || p.category === activeCategory;

    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <HistoryCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default WorkHistory;
