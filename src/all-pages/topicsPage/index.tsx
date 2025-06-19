"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "@/shared-sections/Blog";
import Loading from "@/shared-components/Loading";

const Index: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  useEffect(() => {
    const storedTopic = localStorage.getItem("selectedTopic") || "all";
    const storedId = localStorage.getItem("selectedTopicId") || "0";
    setSelectedTopic(storedTopic);
    setSelectedTopicId(storedId);
  }, []);

  const [articles, setArticles] = useState<Article[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('/api/category');
        console.log("API Response:", response.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchCategory()
  }, []);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/topics/${selectedTopicId}`);
        console.log("API Response:", response.data);
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    if (selectedTopicId) {
      fetchArticles();
    }
  }, [selectedTopic, selectedTopicId]);

  const handleChangeTap = (name: string, id: string) => {
    setArticles(null)
    setSelectedTopicId(id)
    setSelectedTopic(name)

    localStorage.setItem("selectedTopicId", id);
    localStorage.setItem("selectedTopic", name);
  }

  const renderTab = (selected: string, id: string) => (
    <div className="inline-flex items-center justify-center mr-4">
      {selected === selectedTopic ? (
        <div className="w-[7px] h-[7px] rounded-full bg-[#00A1E9]" />
      ) : (
        <div className="w-[7px] h-[7px] rounded-full bg-[#E5E5E5]" />
      )}
      <p className="cursor-pointer px-2" onClick={() => handleChangeTap(selected, id)}>
        {selected.toUpperCase()}
      </p>
    </div>
  );

  // Function to navigate to article details using array index

  const renderContentTab = () => (
    <Blog articles={articles} />
  );

  return (
    <section className="relative w-full">
      {categories ?
        <>
          <div className="w-full flex justify-between items-start lg:items-center bg-[#F5F5F5]  pt-8 pl-8 lg:pl-24 pr-14 h-48 lg:h-[300px]">
            <div className="relative">
              <h1 className="text-[22px] lg:text-[40px] font-medium leading-10 mb-2">TOPICS</h1>
              <p className="text-base font-medium leading-6">トピックス</p>
            </div>
          </div>
          <div className="px-8 lg:px-24 py-10 xl:max-w-[1200px] mx-auto">
            <div className="flex mb-6 flex-wrap">
              {renderTab("all", "0")}
              {
                categories?.map(item =>
                  <div key={item.id}>
                    {renderTab(item.Name, item.id)}
                  </div>
                )
              }
            </div>
            {renderContentTab()}
          </div>
        </> :
        <Loading className="h-96" />
      }
    </section>
  );
};

export default Index;