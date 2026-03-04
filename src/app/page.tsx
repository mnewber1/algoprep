import { CATEGORIES } from "@/lib/types";
import { getProblemsByCategory } from "@/data/problems";
import CategoryGrid from "@/components/CategoryGrid";

export default function HomePage() {
  const categories = CATEGORIES.map((cat) => ({
    category: cat,
    problems: getProblemsByCategory(cat.id),
  }));

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#2d2d2d]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-white">AlgoPrep</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Practice core interview algorithms across 8 fundamental patterns
          </p>
        </div>
      </header>

      {/* Category grid */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <CategoryGrid categories={categories} />
      </main>
    </div>
  );
}
