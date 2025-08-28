
"use client";


import React from "react";
import HistoryCard from "./components/HistoryCard";
import { useFilter } from "@/Store/FilterContext";

 const projects = [
  {
    id: 1,
    title: "オンライン研修用WEBアプリケーション",
    client: "東京大学大学院教育学研究科",
    description:
      "大学院のオンライン研修に対応するためのWebアプリケーションを開発。ユーザーが簡単にアクセスできるUIと安全な認証機能を実装。",
    technologies: ["PHP Laravel", "React", "AWS"],
    category: "アプリケーション",
    url: ""
  },
  {
    id: 2,
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
