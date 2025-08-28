"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
  activeCategory: string;
  searchQuery: string;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState<string>("すべて");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const resetFilters = () => {
    setActiveCategory("すべて");
    setSearchQuery("");
  };

  return (
    <FilterContext.Provider
      value={{
        activeCategory,
        searchQuery,
        setActiveCategory,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used inside FilterProvider");
  }
  return context;
};
