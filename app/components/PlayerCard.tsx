'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PlayerCard.module.css';

interface PlayerProps {
  id: string;
  firstName: string;
  lastName: string;
  imageId: string | null;
  slug: string;
  class?: string;
}

const PlayerCard: React.FC<{ player: PlayerProps }> = ({ player }) => {
  // Add a null check before accessing firstName
  const imageName = player?.firstName ? player.firstName.toLowerCase() : 'default';
  
  // Use a consistent variable name (you have two imgSrc declarations)
  const imgSrc = `/playercards/${imageName}card.webp`;
  
  // Handle image loading errors
  const handleImageError = (e: any) => {
    e.currentTarget.src = '/default-player.webp'; // Fallback image
  };

  // Add a safety check to render a fallback if player data is incomplete
  if (!player || !player.firstName || !player.lastName) {
    return (
      <div className={styles.playerCard}>
        <Image
          src="/default-player.webp"
          alt="Player data unavailable"
          width={300}
          height={400}
          className={styles.playerImage}
          priority
        />
      </div>
    );
  }

  return (
    <Link href={`/players/${player.slug || player.id}`} className={styles.playerCardWrapper}>
      {/* Simple card container with just the image */}
      <div className={styles.playerCard}>
        <Image
          src={imgSrc}
          alt={`${player.firstName} ${player.lastName}`}
          width={300}
          height={400}
          className={styles.playerImage}
          onError={handleImageError}
          priority
        />
      </div>
    </Link>
  );
};

export default PlayerCard;