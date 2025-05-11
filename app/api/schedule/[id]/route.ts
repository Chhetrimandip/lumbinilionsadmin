import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// GET a specific schedule
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const schedule = await prisma.schedule.findUnique({
      where: { id }
    });
    
    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}

// UPDATE a schedule
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id }
    });
    
    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }
    
    // Update the schedule with all possible fields
    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: {
        opponent: body.opponent,
        opponentLogo: body.opponentLogo,
        matchDate: body.matchDate ? new Date(body.matchDate) : undefined,
        venue: body.venue,
        matchType: body.matchType,
        isCompleted: body.isCompleted,
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
    
    return NextResponse.json(updatedSchedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}

// DELETE a schedule
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id }
    });
    
    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }
    
    // Delete the schedule
    await prisma.schedule.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}