export interface QuizQuestion {
    id: number | string;
    question: string;
    options: string[];
    correctanswer: number;  
    answerimage: string;    
    answertext: string;     
    points?: number;
  }
    
  export interface QuizCardProps {
    questions: QuizQuestion[];
  }
    
  
  export interface DbQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctanswer: number;  
    answerimage: string;    
    answertext: string;     
    points: number;
  }