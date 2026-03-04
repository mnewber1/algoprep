"use client";

import { useEffect, useState } from "react";
import { isSolved } from "@/lib/progress";

interface Props {
  slug: string;
}

export default function ProgressBadge({ slug }: Props) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setSolved(isSolved(slug));
  }, [slug]);

  if (!solved) return null;

  return (
    <span className="text-green-400 text-sm" title="Solved">
      &#10003;
    </span>
  );
}
