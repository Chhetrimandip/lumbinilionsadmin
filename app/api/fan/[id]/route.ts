import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
// Handle DELETE request
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = params.id;
      await prisma.fan.delete({
        where: { id },
      });
      
      return NextResponse.json({ message: "Deleted successfully!" });
    } catch (error) {
      console.error('Error deleting quiz question:', error);
      return NextResponse.json(
        { error: 'Failed to delete quiz fan' },
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
    if (
      body.name === undefined || 
      body.email === undefined || 
      body.phone === undefined || 
      body.score === undefined || 
      body.time === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update the fan
    const updatedFan = await prisma.fan.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        score: body.score,
        time: body.time,
      },
    });
    
    return NextResponse.json({ 
      message: "Updated successfully!",
      fan: updatedFan
    });
  } catch (error) {
    console.error('Error updating fan:', error);
    return NextResponse.json(
      { error: 'Failed to update fan' },
      { status: 500 }
    );
  }
}