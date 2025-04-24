"use client";
import Resultcard from "./resultcard";

// Define your result type
interface ResultType {
  id: number;
  team2: string;
  margin: number;
  victory: boolean;
  teamLogo: string;
}

interface ResultsSectionProps {
  results: ResultType[];
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-black/40 backdrop-blur-sm rounded-3xl border-[1.5px] border-amber-500 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-light text-sm sm:text-base">
          {results.map(element => (
            <Resultcard key={element.id} result={element} />
          ))}
        </div>
      </div>
    </div>
  );
}