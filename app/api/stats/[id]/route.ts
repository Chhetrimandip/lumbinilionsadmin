import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const player = await prisma.lions.findUnique({
      where: { id }
    });
    
    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || body.matches === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if player exists
    const existingPlayer = await prisma.lions.findUnique({
      where: { id }
    });
    
    if (!existingPlayer) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    // Update player stats
    const updatedPlayer = await prisma.lions.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        class: body.class,
        description: body.description,
        matches: body.matches,
        strikerate: body.strikerate,
        wickets: body.wickets,
        runs: body.runs,
        jersey: body.jersey || 0,
      }
    });
    
    return NextResponse.json(updatedPlayer);
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json(
      { error: "Failed to update player" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if player exists
    const existingPlayer = await prisma.lions.findUnique({
      where: { id }
    });
    
    if (!existingPlayer) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    // Delete player
    await prisma.lions.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json(
      { error: "Failed to delete player" },
      { status: 500 }
    );
  }
}