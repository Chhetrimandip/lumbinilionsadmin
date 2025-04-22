import { NextResponse } from "next/server";

type Blog = {
    blogpost: {
        title: string
    }
}

export async function POST(request: Request) {
    
    return NextResponse.json({ message: "Blog created successfully" });
}
