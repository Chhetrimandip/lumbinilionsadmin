// app/api/players/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const playersData = await prisma.lions.findMany({
      select: {
        id: true,
        name: true,
        imageId: true,
        slug: true,
        class: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform data
    const formattedPlayers = playersData.map(player => {
      const nameParts = player.name.split(' ');
      const lastName = nameParts.pop() || '';
      const firstName = nameParts.join(' ');
      
      return {
        id: player.id,
        firstName,
        lastName,
        imageId: player.imageId || `default-player`,
        slug: player.slug,
        class: player.class, 

      };
    });

    return NextResponse.json(formattedPlayers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}