import { notFound } from "next/navigation";
import Link from "next/link";
import { problems, getProblemBySlug } from "@/data/problems";
import ProblemWorkspace from "@/components/ProblemWorkspace";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return { title: "Not Found" };
  return { title: `${problem.title} - AlgoPrep` };
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      {/* Top nav */}
      <nav className="flex items-center h-14 px-4 bg-[#2d2d2d] border-b border-gray-700 shrink-0">
        <Link
          href="/"
          className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          AlgoPrep
        </Link>
        <span className="text-gray-600 mx-3">/</span>
        <span className="text-gray-200 text-sm font-medium">
          {problem.title}
        </span>
      </nav>

      <ProblemWorkspace problem={problem} />
    </div>
  );
}
