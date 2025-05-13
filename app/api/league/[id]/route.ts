import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const team = await prisma.team.findUnique({
      where: { id }
    });
    
    if (!team) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: {params: { id: string } }
) {
  try {
    const id = parseInt( await params.id);
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    
    // Check if team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id }
    });
    
    if (!existingTeam) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }
    
    // Update team
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name: body.name,
        played: body.played,
        won: body.won,
        lost: body.lost,
        nr: body.nr,
        points: body.points
      }
    });
    
    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(await params.id);
    
    // Check if team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id }
    });
    
    if (!existingTeam) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }
    
    // Delete team
    await prisma.team.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 }
    );
  }
}