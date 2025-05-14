import { useState, useEffect } from "react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctanswer: number;
  answerimage: string;
  answertext: string;
  points: number;
}

export const QuizquestionsView = ({quizData = []}) => {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<QuizQuestion | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  
  // Form state
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrectAnswer, setFormCorrectAnswer] = useState(0);
  const [formAnswerImage, setFormAnswerImage] = useState('');
  const [formAnswerText, setFormAnswerText] = useState('');
  const [formPoints, setFormPoints] = useState(1);
  //quiz creation part
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [bulkQuestions, setBulkQuestions] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);


  //quiz creation modal logic
  // Add these handler functions after your existing handler functions

// Open and close the add modal
const openAddModal = () => {
  setBulkQuestions('');
  setAddModalOpen(true);
};

const closeAddModal = () => {
  setAddModalOpen(false);
  setBulkQuestions('');
};

// Handle the bulk creation of questions
const handleBulkCreate = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!bulkQuestions.trim()) {
    alert('Please enter at least one question.');
    return;
  }
  
  try {
    setIsAdding(true);
    
    // Split by double newlines to separate questions
    const questionBlocks = bulkQuestions.trim().split('\n\n');
    const createdQuestions = [];
    
    for (const block of questionBlocks) {
      const lines = block.trim().split('\n');
      
      if (lines.length < 3) {
        // Skip if there aren't enough lines for question + options
        continue;
      }
      
      const question = lines[0].trim();
      const options = lines.slice(1, 5).map(line => line.trim());
      
      // Find the correct answer (marked with *)
      let correctAnswer = 0;
      for (let i = 0; i < options.length; i++) {
        if (options[i].endsWith('*')) {
          correctAnswer = i;
          options[i] = options[i].substring(0, options[i].length - 1).trim();
          break;
        }
      }
      
      // Get answer text (anything after Options)
      const answerTextLine = lines.findIndex(line => line.toLowerCase().includes('explanation:'));
      const answerText = answerTextLine > 0 
        ? lines.slice(answerTextLine).join('\n').replace(/^explanation:/i, '').trim()
        : '';
      
      // Look for image URL
      const imageUrlLine = lines.findIndex(line => line.toLowerCase().includes('image:'));
      const answerImage = imageUrlLine > 0
        ? lines[imageUrlLine].replace(/^image:/i, '').trim()
        : '';
      
      // Look for points
      const pointsLine = lines.findIndex(line => line.toLowerCase().includes('points:'));
      const points = pointsLine > 0
        ? parseInt(lines[pointsLine].replace(/^points:/i, '').trim()) || 1
        : 1;
      
      // Only proceed if we have a question and at least 2 options
      if (question && options.length >= 2) {
        // Create the quiz question
        const newQuestion = {
          question,
          options,
          correctanswer: correctAnswer,
          answertext: answerText,
          answerimage: answerImage,
          points
        };
        
        const response = await fetch('/api/quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newQuestion)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create question: ${question}`);
        }
        
        const createdQuestion = await response.json();
        createdQuestions.push(createdQuestion);
      }
    }
    
    // Update local state with new questions
    if (createdQuestions.length > 0) {
      setQuizzes([...quizzes, ...createdQuestions]);
      alert(`Successfully created ${createdQuestions.length} questions!`);
      closeAddModal();
    } else {
      alert('No valid questions found. Please check the format.');
    }
  } catch (error) {
    console.error('Error creating bulk questions:', error);
    alert('Failed to create questions. Check the console for details.');
  } finally {
    setIsAdding(false);
  }
};



  //helper to check if it's a valid url
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Check if it's a relative path to public folder
    if (url.startsWith('/')) return true;
    
    // Check if it's a valid URL format
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // This view will be connected to real data later
  useEffect(() => {
    if (quizData.length > 0) {
      setQuizzes(quizData);
    } else {
      setQuizzes([]);
    }
  }, [quizData]);
  
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete the question?")) {
      try {
        const response = await fetch(`/api/quiz/${id}`, {
          method: "DELETE"
        });
        
        if(!response.ok) {
          throw new Error("Failed to delete question");
        }
        
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
      } catch(error) {
        console.log('Error deleting the question.', error);
        alert('Failed to delete the question. Try again later.');
      }
    }
  };

  // Initialize the edit form with data from the selected quiz
  const openEditModal = (quiz: QuizQuestion) => {
    setEditingQuiz(quiz);
    setFormQuestion(quiz.question);
    setFormOptions([...quiz.options]);
    setFormCorrectAnswer(quiz.correctanswer);
    setFormAnswerImage(quiz.answerimage);
    setFormAnswerText(quiz.answertext);
    setFormPoints(quiz.points);
    setShowImagePreview(false); // Reset image preview state
    setEditModalOpen(true);
  };

  // Close the modal and reset form state
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingQuiz(null);
    setShowImagePreview(false);
  };

  // Handle option changes
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formOptions];
    newOptions[index] = value;
    setFormOptions(newOptions);
  };

  // Handle form submission
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingQuiz) return;
    
    // Create updated quiz object
    const updatedQuiz: QuizQuestion = {
      id: editingQuiz.id,
      question: formQuestion,
      options: formOptions,
      correctanswer: formCorrectAnswer,
      answerimage: formAnswerImage,
      answertext: formAnswerText,
      points: formPoints
    };
    
    try {
      const response = await fetch(`/api/quiz/${editingQuiz.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuiz)
      });
      
      if (!response.ok) {
        throw new Error("Failed to update the question");
      }
      
      // Update local state with the edited quiz
      setQuizzes(quizzes.map(q => q.id === editingQuiz.id ? updatedQuiz : q));
      
      // Close the modal after successful update
      closeEditModal();
    } catch (error) {
      console.log('Error updating the question:', error);
      alert('Failed to update the question. Try again later.');
    }
  };

  // Toggle image preview
  const toggleImagePreview = () => {
    setShowImagePreview(!showImagePreview);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="w-80 bg-neutral-500/25 rounded-2xl p-2">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full bg-transparent outline-none text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      <button 
        onClick={openAddModal}
        className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center"
      >
        Add New Question
      </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="pb-4 text-xl font-normal">Question</th>
            <th className="pb-4 text-xl font-normal">Has Image</th>
            <th className="pb-4 text-xl font-normal">Options</th>
            <th className="pb-4 text-xl font-normal">Points</th>
            <th className="pb-4 text-xl font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuizzes.map((quiz) => (
            <tr key={quiz.id} className="border-t border-gray-100">
              <td className="py-4 text-base">{quiz.question}</td>
              <td className="py-4 text-base">
                {quiz.answerimage ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </td>
              <td className="py-4 text-base">
                <ul className="list-disc pl-5">
                  {quiz.options.map((option, index) => (
                    <li key={index} className={index === quiz.correctanswer ? 'font-semibold text-green-600' : ''}>
                      {option} {index === quiz.correctanswer && '✓'}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-4 text-base">{quiz.points}</td>
              <td className="py-4">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openEditModal(quiz)}
                    className="bg-neutral-500/25 rounded-2xl p-2 w-20 text-center"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(quiz.id)}
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

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Quiz Question</h2>
            
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Question</label>
                <input
                  type="text"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Options</label>
                {formOptions.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={formCorrectAnswer === index}
                      onChange={() => setFormCorrectAnswer(index)}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-grow p-2 border rounded"
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                  </div>
                ))}
                <p className="text-sm text-gray-500 mt-1">Select the radio button next to the correct answer</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Answer Image URL</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formAnswerImage}
                    onChange={(e) => {
                      setFormAnswerImage(e.target.value);
                      // Reset preview when URL changes
                      if (showImagePreview) setShowImagePreview(false);
                    }}
                    className="flex-grow p-2 border rounded"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formAnswerImage && (
                    <button 
                      type="button"
                      onClick={toggleImagePreview}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm whitespace-nowrap"
                    >
                      {showImagePreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  )}
                </div>
                
                {/* Only render the image when preview is enabled */}
                {showImagePreview && formAnswerImage && (
  <div className="mt-2">
    {isValidImageUrl(formAnswerImage) ? (
      <>
        <img 
          src={formAnswerImage} 
          alt="Answer preview" 
          className="h-32 object-contain border rounded"
          onError={(e) => {
            e.currentTarget.src = '/lllogo.png';
            e.currentTarget.onerror = null;
          }}
        />
        <p className="text-sm text-gray-500 mt-1">If the image doesn't appear correctly, the URL might be invalid or inaccessible.</p>
      </>
    ) : (
      <div className="p-4 border rounded bg-yellow-50 text-yellow-700">
        The image URL format appears to be invalid. Please enter a valid URL or path.
      </div>
    )}
  </div>
)}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Answer Explanation</label>
                <textarea
                  value={formAnswerText}
                  onChange={(e) => setFormAnswerText(e.target.value)}
                  className="w-full p-2 border rounded h-24"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Points</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formPoints}
                  onChange={(e) => setFormPoints(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Bulk Add Questions Modal */}
{addModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Add Quiz Questions in Bulk</h2>
      
      <form onSubmit={handleBulkCreate}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Enter Multiple Questions</label>
          <textarea
            value={bulkQuestions}
            onChange={(e) => setBulkQuestions(e.target.value)}
            className="w-full p-4 border rounded h-72 font-mono text-sm"
            placeholder={`Question 1?\nOption A\nOption B*\nOption C\nOption D\nExplanation: This is why B is correct\nPoints: 2\n\nQuestion 2?\nOption A\nOption B\nOption C*\nOption D\nExplanation: This is why C is correct`}
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            Format each question as shown in the example. Mark the correct option with an asterisk (*).
            Separate questions with blank lines. You can optionally include explanation, image URL, and points.
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeAddModal}
            className="px-4 py-2 border border-gray-300 rounded"
            disabled={isAdding}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add Questions'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};