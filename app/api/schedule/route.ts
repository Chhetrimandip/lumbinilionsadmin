import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const response = await prisma.schedule.findMany({
      orderBy: {
        matchDate: 'desc'
      }
    });
    return NextResponse.json(response);
  } catch(error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json(
      { error: "Couldn't fetch schedules" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields based on schema
    if (!body.opponent || !body.matchDate) {
      return NextResponse.json(
        { error: "Missing required fields (opponent, matchDate)" },
        { status: 400 }
      );
    }
    
    // Create new schedule entry with all possible fields
    const newSchedule = await prisma.schedule.create({
      data: {
        id: body.id || crypto.randomUUID(), // Generate UUID if not provided
        opponent: body.opponent,
        opponentLogo: body.opponentLogo,
        matchDate: new Date(body.matchDate),
        venue: body.venue,
        matchType: body.matchType,
        isCompleted: body.isCompleted || false,
        victory: body.victory,
        lionsRuns: body.lionsRuns,
        lionsWickets: body.lionsWickets,
        lionsOvers: body.lionsOvers,
        opponentRuns: body.opponentRuns,
        opponentWickets: body.opponentWickets,
        opponentOvers: body.opponentOvers,
        margin: body.margin,
        marginType: body.marginType,
        ballsLeft: body.ballsLeft,
        description: body.description,
        highlightUrl: body.highlightUrl,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json(newSchedule);
  } catch(error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}