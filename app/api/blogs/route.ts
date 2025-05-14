import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils"; // You'll need to create this utility function

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    console.log("Creating blog with data:", {
      title: body.title,
      slug: body.slug,
      content: typeof body.content === 'string' ? body.content : JSON.stringify(body.content),
      imageUrl: body.imageUrl || null,
      author: body.author || "Admin",
      published: body.published || false
    });
    
    // Create the blog post
    const newBlog = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        content: typeof body.content === 'string' ? body.content : JSON.stringify(body.content),
        imageUrl: body.imageUrl || null,
        author: body.author || "Admin",
        published: body.published || false
      }
    });
    
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error:any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: `Failed to create blog post: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
        // Fix: Use BlogPost instead of blog just for committing
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