import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const quiz = await prisma.quizzy.findMany()
    return NextResponse.json(quiz)
  } catch(error){
    console.error('Error fetching quiz data: ', error);
    return NextResponse.json(
      {error: 'Failed to fetch quiz data'},
      {status: 500}
    )
  }
}

// Add this POST handler for creating new quiz questions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.question || !body.options || body.correctanswer === undefined || !body.answertext) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the quiz question
    const newQuiz = await prisma.quizzy.create({
      data: {
        id: randomUUID(),
        question: body.question,
        options: body.options,
        correctanswer: body.correctanswer,
        answerimage: body.answerimage || null,
        answertext: body.answertext,
        points: body.points || 1,
      },
    });
    
    return NextResponse.json(newQuiz);
  } catch (error) {
    console.error('Error creating quiz question:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz question' },
      { status: 500 }
    );
  }
}