import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const blog = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
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
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }
    
    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    // Update blog 
    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        content: body.content,
        imageUrl: body.imageUrl,
        author: body.author || existingBlog.author,
        published: body.published !== undefined ? body.published : existingBlog.published,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : existingBlog.isFeatured,
        updatedAt: new Date()
      }
    });
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Check if we have at least one field to update
    if (body.published === undefined && body.isFeatured === undefined) {
      return NextResponse.json(
        { error: "At least one field to update is required (published or isFeatured)" },
        { status: 400 }
      );
    }
    
    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    // Prepare data object with only the fields that were provided
    const updateData: any = {
      updatedAt: new Date()
    };
    
    // Add published status if provided
    if (body.published !== undefined) {
      updateData.published = body.published;
      // Only update publishedAt if the status is changing to published
      if (body.published) {
        updateData.publishedAt = new Date();
      }
    }
    
    // Add featured status if provided
    if (body.isFeatured !== undefined) {
      updateData.isFeatured = body.isFeatured;
    }
    
    // Update blog with specified fields
    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog status:', error);
    return NextResponse.json(
      { error: "Failed to update blog status" },
      { status: 500 }
    );
  }
}