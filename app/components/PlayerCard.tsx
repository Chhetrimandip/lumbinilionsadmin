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
  // Use imageId or firstName for the card image filename
  //todo 
  const imageName = player.firstName.toLowerCase();
  // const imgSrc = `/playercards/${imageName}card.png`;
  const imgSrc = `/playercards/${imageName}card.png`;
  
  // Handle image loading errors
  const handleImageError = (e: any) => {
    e.currentTarget.src = '/default-player.png'; // Fallback image
  };

  return (
    <Link href={`/players/${player.slug}`} className={styles.playerCardWrapper}>
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