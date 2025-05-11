import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils"; // You'll need to create this utility function

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Format the data to match your BlogPost model
        const blogData = {
            title: body.title,
            slug: slugify(body.title), // Generate a slug from the title
            content: JSON.stringify(body.content), // Store EditorJS data as JSON string
            author: "Admin", // Default author or get from session
            imageUrl: body.content.blocks.find(b => b.type === 'image')?.data?.file?.url || null
        };
        
        const blog = await prisma.blogPost.create({
            data: blogData
        });
        
        return NextResponse.json({ message: "Blog created successfully!", blog });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Fix: Use BlogPost instead of blog
        const blogs = await prisma.blogPost.findMany({
            orderBy: {
                publishedAt: 'desc'
            }
        });
        
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        
        await prisma.blogPost.delete({
            where: { id }
        });
        
        return NextResponse.json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}