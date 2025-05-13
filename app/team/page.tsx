import TeamClientPage from '../components/TeamClientPage';
import { prisma } from "@/lib/db";

// Set revalidation time - team roster changes infrequently
export const revalidate = 604800; // 7 days

export default async function TeamPage() {
  // Fetch player data server-side
  let players = [];
  
  try {
    players = await prisma.lions.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching player data:', error);
  }
  
  return <TeamClientPage initialPlayers={players} />;
}