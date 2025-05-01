'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'  // Import Link component
import styles from './PlayerCard.module.css'

interface PlayerProps {
    firstName: string
    lastName: string
    imageId: string | null
    slug: string    // Added slug
}

const PlayerCard: React.FC<{ player: PlayerProps }> = ({ player }) => {
    // Handle imageId properly
    const imageUrl = player.imageId 
        ? `/${player.imageId}.png` 
        : `/default-player.png`;  // Fallback image

    return (
        <Link href={`/players/${player.slug}`} className={styles.playerCardWrapper}>
            <div className={styles.playerCard}>
                {/* Images Layer */}
                <div className={styles.cardBackground}>
                    {/* Player image with error handling */}
                    <Image
                        src={imageUrl}
                        alt={`${player.firstName} ${player.lastName}`}
                        height={400}
                        width={300}
                        className={styles.playerImage}
                        onError={(e) => {
                            // Fallback if image doesn't load
                            const imgElement = e.currentTarget as HTMLImageElement;
                            imgElement.src = "/default-player.png";
                        }}
                    />
                    
                    <Image
                        src="/statsicon.png"
                        alt="Stats"
                        height={48}
                        width={48}
                        className={styles.statsIcon}
                    />
                    
                    {/* Create 4 rows with different numbers of dots */}
                    <div className={styles.dotsContainer}>
                        {[19, 19, 19, 19].map((dotsCount, rowIndex) => (
                            <div key={`row-${rowIndex}`} className={styles.dotsRow}>
                                {[...Array(dotsCount)].map((_, i) => (
                                    <div 
                                        key={`dot-${rowIndex}-${i}`} 
                                        className={styles.dot}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Player Name Text */}
                <div className={styles.playerName}>
                    <h3 className={styles.lastName}>
                        {player.lastName}
                    </h3>
                    <span className={styles.firstName}>{player.firstName}</span>
                </div>
            </div>
        </Link>
    )
}

export default PlayerCard