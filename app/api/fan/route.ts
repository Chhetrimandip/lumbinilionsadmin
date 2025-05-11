import prisma from "@/lib/prisma"
import { error } from "console"
import { NextResponse } from "next/server"
export async function GET() {
    try {
        const fans = await prisma.fan.findMany();  // Changed to fan model
        return NextResponse.json(fans);
    } catch (error) {
        console.error('Error fetching fan data:', error);
        return NextResponse.json(
            {error: "Failed to fetch fan data"},
            {status: 500}
        );
    }
}