import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.team.findMany({
      orderBy: {
        points: 'desc' // Order by points to show standings
      }
    });
    return NextResponse.json(response);
  } catch(error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: "Couldn't fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    
    // Create new team
    const newTeam = await prisma.team.create({
      data: {
        pos: body.pos,
        name: body.name,
        played: body.played || 0,
        won: body.won || 0,
        lost: body.lost || 0,
        nr: body.nr || 0,
        points: body.points || 0
      }
    });
    
    return NextResponse.json(newTeam, { status: 201 });
  } catch(error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}