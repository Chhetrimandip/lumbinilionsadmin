import { useState } from "react";
import { format } from 'date-fns';

interface Fan {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  time: number;
}

export const QuizResultsView = ({fansdata = []}: {fansdata?: Fan[]}) => {
  console.log("Received data:", fansdata);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Hardcoded quiz results data
  const quizResults = Array.isArray(fansdata) 
    ? [...fansdata].sort((a, b) => b.score - a.score) 
    : [];

  const filteredResults = quizResults.filter(result => 
    result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    console.log(`Delete quiz result with ID: ${id}`);
    alert(`Quiz result with ID: ${id} would be deleted in a real app`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="w-80 bg-neutral-500/25 rounded-2xl p-2">
          <input
            type="text"
            placeholder="Search quiz results..."
            className="w-full bg-transparent outline-none text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center">
          Export Results
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="pb-4 text-xl font-normal">Date</th>
            <th className="pb-4 text-xl font-normal">Fan Name</th>
            <th className="pb-4 text-xl font-normal">Quiz</th>
            <th className="pb-4 text-xl font-normal">Score</th>
            <th className="pb-4 text-xl font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result) => (
            <tr key={result.id} className="border-t border-gray-100">
              <td className="py-4 text-base">{format(new Date(), 'MM/dd/yy')}</td>
              <td className="py-4 text-base">{result.name}</td>
              <td className="py-4 text-base">{result.name}</td>
              <td className="py-4 text-base">
                <span className={`px-2 py-1 rounded ${result.score >= 90 ? 'bg-green-100 text-green-800' : result.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {result.score}
                </span>
              </td>
              <td className="py-4">
                <div className="flex space-x-2">
                  <button className="bg-neutral-500/25 rounded-2xl p-2 w-20 text-center">
                    View
                  </button>
                  <button 
                    onClick={() => handleDelete(result.id)}
                    className="bg-red-100 text-red-800 rounded-2xl p-2 w-20 text-center"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};