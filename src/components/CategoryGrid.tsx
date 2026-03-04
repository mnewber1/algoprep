"use client";

import { useState } from "react";
import { CategoryInfo, Problem } from "@/lib/types";
import CategoryCard from "./CategoryCard";
import AlgorithmModal from "./AlgorithmModal";

interface Props {
  categories: { category: CategoryInfo; problems: Problem[] }[];
}

export default function CategoryGrid({ categories }: Props) {
  const [openCategory, setOpenCategory] = useState<CategoryInfo | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(({ category, problems }) => (
          <CategoryCard
            key={category.id}
            category={category}
            problems={problems}
            onHowItWorks={() => setOpenCategory(category)}
          />
        ))}
      </div>

      {openCategory && (
        <AlgorithmModal
          category={openCategory}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </>
  );
}
