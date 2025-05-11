import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const lions = await prisma.lions.findMany();
        return NextResponse.json(lions);
    } catch(error){
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            {error: 'Failed to fetch stats'},
            {status:500}
        )
    }
}