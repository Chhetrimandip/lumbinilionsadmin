import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { Cloudinary } from 'cloudinary-core';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

// Delete a gallery image
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        
        // Check if the image exists
        const existingImage = await prisma.gallery.findUnique({
            where: { id }
        });
        
        if (!existingImage) {
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 }
            );
        }

        // Extract the Cloudinary public ID from the URL
        const imageUrl = existingImage.imageUrl;
        const cloudinaryCore = new Cloudinary({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        });
        const publicId = cloudinaryCore.url(imageUrl).public_id;
        
        if (publicId) {
            // Delete from Cloudinary
            try {
                const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
                console.log('Cloudinary delete result:', cloudinaryResult);
            } catch (cloudinaryError) {
                console.error('Error deleting from Cloudinary:', cloudinaryError);
                // Continue with database deletion even if Cloudinary fails
            }
        } else {
            console.warn('Could not extract Cloudinary public ID from URL:', imageUrl);
        }
        
        // Delete from database
        await prisma.gallery.delete({
            where: { id }
        });
        
        return NextResponse.json(
            { message: "Image deleted successfully from both database and Cloudinary" },
            { status: 200 }
        );
    } catch(error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { error: "Couldn't delete image" },
            { status: 500 }
        );
    }
}

// Add this PUT handler to your existing route.ts file
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const body = await request.json();
        
        // Validate required fields
        if (!body.title || !body.imageUrl) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        
        // Check if the image exists
        const existingImage = await prisma.gallery.findUnique({
            where: { id }
        });
        
        if (!existingImage) {
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 }
            );
        }
        
        // Update the image record
        const updatedImage = await prisma.gallery.update({
            where: { id },
            data: {
                title: body.title,
                imageUrl: body.imageUrl,
                category: body.category || null,
                parentCategory: body.parentCategory || null
            }
        });
        
        return NextResponse.json(updatedImage);
    } catch (error) {
        console.error('Error updating image:', error);
        return NextResponse.json(
            { error: "Failed to update image" },
            { status: 500 }
        );
    }
}