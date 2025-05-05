"use client"

import { useState } from 'react';
import Image from 'next/image';

export function PlayerImageWithFallback(props) {
  const [error, setError] = useState(false);
  const { src, ...otherProps } = props;
  
  if (error) {
    return (
      <div className="relative bg-[#0F1923] rounded-lg flex items-center justify-center" style={{ height: '600px' }}>
        <p className="text-amber-500 text-lg">Image coming soon</p>
      </div>
    );
  }
  
  return (
    <Image 
      {...otherProps}
      src={src}
      onError={() => setError(true)}
    />
  );
}