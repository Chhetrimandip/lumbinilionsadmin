import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { fy } from "date-fns/locale";

// Handle DELETE request
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.quizzy.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Deleted successfully!" });
  } catch (error) {
    console.error('Error deleting quiz question:', error);
    return NextResponse.json(
      { error: 'Failed to delete quiz question' },
      { status: 500 }
    );
  }
}

// Handle PUT request for updating a quiz question
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    // Validate the request body
    if (!body.question || !body.options || body.correctanswer === undefined || !body.answertext) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update the quiz question
    const updatedQuiz = await prisma.quizzy.update({
      where: { id },
      data: {
        question: body.question,
        options: body.options,
        correctanswer: body.correctanswer,
        answerimage: body.answerimage,
        answertext: body.answertext,
        points: body.points,
      },
    });
    
    return NextResponse.json({ 
      message: "Updated successfully!",
      quiz: updatedQuiz
    });
  } catch (error) {
    console.error('Error updating quiz question:', error);
    return NextResponse.json(
      { error: 'Failed to update quiz question' },
      { status: 500 }
    );
  }
}

export async function  GET() {
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