import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Add await here
    const response = await prisma.schedule.findMany({
      orderBy: {
        matchDate: 'desc'  // Get newest matches first
      }
    });
    return NextResponse.json(response);
  } catch (error) {
    // Fix the syntax here
    return NextResponse.json(
      { error: "Couldn't fetch results" },
      { status: 500 }
    );
  }
}