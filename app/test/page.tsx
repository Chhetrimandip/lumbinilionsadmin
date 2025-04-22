"use client"
import React from 'react'
import Link from 'next/link'
import QuizCard from '../components/quizcard';

// Define the Quiz Question Type
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  answerimage: string;
  answertext: string; // Additional interesting fact
}

const QuizPage = () => {
  // Quiz questions array
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which country won the ICC Men's Cricket World Cup 2023?",
      options: ["India", "Australia", "England", "New Zealand"],
      correctAnswer: 1, // Australia
      answerimage: "qa1.jpg",
      answertext: "Australia defeated India in the final to win their 6th World Cup title, making them the most successful team in World Cup history."
    },
    {
      id: 2,
      question: "What is the highest individual score in a One Day International (ODI) cricket match?",
      options: ["264", "275", "219", "237"],
      correctAnswer: 0, // 264 by Rohit Sharma
      answerimage: "qa2.jpg",
      answertext: "Rohit Sharma scored 264 against Sri Lanka in 2014, including 33 fours and 9 sixes. He was dropped on 4 runs and went on to make history!"
    },
    {
      id: 3,
      question: "In cricket, what does LBW stand for?",
      options: ["Leg Before Wicket", "Left Batsman Walking", "Long Ball Wide", "Late Bat Wing"],
      correctAnswer: 0,
      answerimage: "qa3.jpg",
      answertext: "The LBW rule was introduced in 1774, making it one of cricket's oldest laws. It prevents batsmen from simply blocking the wicket with their legs."
    },
    {
      id: 4,
      question: "How many players are there in a cricket team on the field?",
      options: ["10", "11", "12", "9"],
      correctAnswer: 1,
      answerimage: "qa4.jpg",
      answertext: "While 11 players are on the field, teams can have a 12th man who can field as a substitute but cannot bowl, bat or keep wicket except in special circumstances."
    },
    {
      id: 5,
      question: "Which of these is not a type of cricket delivery?",
      options: ["Googly", "Yorker", "Flipper", "Slogger"],
      correctAnswer: 3, // Slogger is not a delivery
      answerimage: "qa5.jpg",
      answertext: "A 'Slogger' is actually a batsman who hits wildly, while a Googly is a deceptive delivery invented by B. Bosanquet in the early 1900s that spins in the opposite direction to what the batsman expects."
    },
    {
      id: 6,
      question: "What is the diameter of a cricket ball?",
      options: ["5.75 inches", "4.75 inches", "2.8 inches", "3.5 inches"],
      correctAnswer: 2, // 2.8 inches
      answerimage: "qa6.jpg",
      answertext: "A cricket ball weighs between 5.5 and 5.75 ounces (155.9-163 grams) and is made of cork covered with leather. The red ball can swing more, while the white ball is used in limited-overs cricket for visibility."
    },
    {
      id: 7,
      question: "Which cricket player is known as 'The God of Cricket'?",
      options: ["Virat Kohli", "Brian Lara", "Sachin Tendulkar", "Ricky Ponting"],
      correctAnswer: 2,
      answerimage: "qa7.jpg",
      answertext: "Sachin Tendulkar holds numerous records including most Test runs (15,921), most ODI runs (18,426), and most international centuries (100). He played international cricket for 24 years and is the only player to score 100 international centuries."
    },
    {
      id: 8,
      question: "How many runs is a 'sixer' worth in cricket?",
      options: ["4", "6", "2", "1"],
      correctAnswer: 1,
      answerimage: "qa8.jpg",
      answertext: "The record for most sixes in international cricket belongs to Chris Gayle with over 550 sixes. The longest six ever recorded was hit by Shahid Afridi, measuring approximately 158 meters in 2013."
    },
    {
      id: 9,
      question: "Which country hosted the first ever Cricket World Cup in 1975?",
      options: ["Australia", "India", "England", "West Indies"],
      correctAnswer: 2,
      answerimage: "qa9.jpg",
      answertext: "The first Cricket World Cup was called the Prudential Cup, and West Indies won it by defeating Australia in the final at Lord's. Interestingly, all matches were played in traditional white clothing with a red ball."
    },
    {
      id: 10,
      question: "What is the term for the fielding position directly behind the batsman?",
      options: ["Mid-wicket", "Cover", "Wicket-keeper", "Long-on"],
      correctAnswer: 2,
      answerimage: "qa10.jpg",
      answertext: "The wicket-keeper is the only fielder allowed to wear gloves and external leg guards. MS Dhoni holds the record for most stumpings in international cricket with over 190 stumpings across all formats."
    }
  ];
  
  return (
    <QuizCard questions={quizQuestions} />
  );
};

export default QuizPage;