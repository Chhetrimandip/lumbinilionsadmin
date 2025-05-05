"use client"

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import directly instead of using dynamic import with ssr: false
import HeroPlayers from './HeroPlayers';

export default function HeroPlayersWrapper() {
  return (
    <Suspense fallback={
      <div className="absolute inset-0 z-[3] top-[75px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <HeroPlayers />
    </Suspense>
  );
}