"use client"
import React, { useState } from 'react'
import Link from 'next/link'

// Define the Quiz Question Type
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  answerimage: string;
}

interface QuizCardProps {
  questions: QuizQuestion[];
}

const QuizCard: React.FC<QuizCardProps> = ({ questions }) => {
  // State to track current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // State to track selected answer
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  // State to track score
  const [score, setScore] = useState(0);
  // State to track if quiz is completed
  const [quizCompleted, setQuizCompleted] = useState(false);
  // State to track if answer is checked
  const [answerChecked, setAnswerChecked] = useState(false);

  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (answerChecked) return; // Prevent changing answer after checking
    setSelectedOption(optionIndex);
  };

  // Check answer
  const checkAnswer = () => {
    if (selectedOption === null) return; // Do nothing if no option selected
    
    setAnswerChecked(true);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswerChecked(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setAnswerChecked(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-30 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-['Bebas_Neue'] text-amber-500 mb-6 text-center">
          <span className="text-amber-500">|</span> CRICKET QUIZ
        </h1>

        {!quizCompleted ? (
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-7">
            {/* Question Counter */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-white text-base">
                Question {currentQuestion + 1}/{questions.length}
              </span>
              <span className="text-white text-base">
                Score: {score}
              </span>
            </div>
            {/* Question */}
            <div className="py-6 md:py-16 my-3 flex justify-center">
              <h2 className="text-xl md:text-2xl font-['Bebas_Neue'] text-white text-center max-w-2xl">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === index 
                      ? answerChecked
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-600/30 border-2 border-green-500'
                          : 'bg-red-600/30 border-2 border-red-500'
                        : 'bg-amber-500/20 border-2 border-amber-500'
                      : 'bg-neutral-700 hover:bg-neutral-600'
                  }`}
                >
                  <p className="text-white text-base">{option}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              {!answerChecked ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedOption === null}
                  className={`px-5 py-2 rounded-lg text-base font-['Bebas_Neue'] ${
                    selectedOption === null
                      ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-black'
                  }`}
                >
                  CHECK ANSWER
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-['Bebas_Neue']"
                >
                  {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'FINISH QUIZ'}
                </button>
              )}
            </div>
          </div>
        ) : (
          // Quiz Results
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-7 text-center">
            <h2 className="text-2xl md:text-3xl font-['Bebas_Neue'] text-amber-500 mb-4">
              QUIZ COMPLETED!
            </h2>
            <p className="text-white text-lg mb-3">
              Your Score: {score} out of {questions.length}
            </p>
            <p className="text-white text-lg mb-6">
              {score === questions.length 
                ? "Perfect! You're a cricket master!" 
                : score >= questions.length * 0.7 
                  ? "Great job! You know your cricket well!"
                  : "Nice try! Keep learning about cricket!"}
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={resetQuiz}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-['Bebas_Neue']"
              >
                TRY AGAIN
              </button>
              <Link href="/">
                <button className="px-5 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-base font-['Bebas_Neue']">
                  BACK TO HOME
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;