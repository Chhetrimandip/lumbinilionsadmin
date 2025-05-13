import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validate required fields - either parentCategory or category must be provided
        if (!body.parentCategory && !body.category) {
            return NextResponse.json(
                { error: "Either parent category or category name is required" },
                { status: 400 }
            );
        }
        
        // Create a folder marker in the Gallery table
        const folderMarker = await prisma.gallery.create({
            data: {
                id: crypto.randomUUID(),
                imageUrl: "https://res.cloudinary.com/demo/image/upload/folder.png",
                title: body.category 
                    ? `Folder: ${body.category}` 
                    : `Folder: ${body.parentCategory}`,
                category: body.category,
                parentCategory: body.parentCategory
            }
        });
        
        return NextResponse.json(folderMarker);
    } catch(error) {
        console.error('Error creating folder:', error);
        return NextResponse.json(
            { error: "Couldn't create folder" },
            { status: 500 }
        );
    }
}