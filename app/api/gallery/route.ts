import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

export async function GET() {
    try {
        const response = await prisma.gallery.findMany();
        return NextResponse.json(response);
    } catch(error) {
        console.error('Error fetching gallery images:', error);
        return NextResponse.json(
            {
                error: "Couldn't fetch gallery images"
            },
            {
                status: 500
            }
        );
    }
}

// Note: This should be POST instead of PUT for creating new resources
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.imageUrl) {
            return NextResponse.json(
                { error: "Image URL is required" },
                { status: 400 }
            );
        }
        
        const newPhoto = await prisma.gallery.create({
            data: {
                id: body.id || crypto.randomUUID(),
                imageUrl: body.imageUrl,
                title: body.title || "Untitled",
                category: body.category || "All", // Add category support
                parentCategory: body.parentCategory || null
            }
        });
        
        return NextResponse.json(newPhoto);
    } catch(error) {
        console.error('Error creating new photo:', error);
        return NextResponse.json(
            {
                error: "Couldn't create new photo"
            },
            {
                status: 500
            }
        );
    }
}