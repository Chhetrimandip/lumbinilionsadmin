// app/players/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import { PlayerImageWithFallback } from './playerImageWithFallback';


export default async function PlayerDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  try {
    const player = await prisma.lions.findUnique({
      where: { slug }
    });
    
    if (!player) {
      notFound();
    }
    
    // Split the name for display purposes
    const nameParts = player.name.split(' ');
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ');
    
    // Fix the image URL path - use imageId with the correct path
    const imageUrl = player.imageId 
      ? `/playerCards/${player.imageId}.png` 
      : `/default-player.png`;
    
    return (
      <div className="min-h-screen pt-24 pb-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Player image */}
            <div className="md:w-1/3">
              <PlayerImageWithFallback
                src={imageUrl}
                alt={player.name}
                width={400}
                height={600}
                className="w-full object-cover rounded-lg"
                priority
              />
            </div>
            
            {/* Player details */}
            <div className="md:w-2/3">
              <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl mb-2">
                <span className="text-amber-500">{firstName}</span> {lastName}
              </h1>
              
              <p className="text-xl mb-6">{player.class}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0F1923] p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Matches</p>
                  <p className="text-2xl font-bold">{player.matches || 0}</p>
                </div>
                <div className="bg-[#0F1923] p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Runs</p>
                  <p className="text-2xl font-bold">{player.runs || 0}</p>
                </div>
                <div className="bg-[#0F1923] p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Strike Rate</p>
                  <p className="text-2xl font-bold">{player.strikerate || 0}</p>
                </div>
                <div className="bg-[#0F1923] p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Wickets</p>
                  <p className="text-2xl font-bold">{player.wickets || 0}</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-300">{player.description || 'Information coming soon.'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering player detail page:", error);
    notFound();
  }
}
