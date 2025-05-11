import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
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