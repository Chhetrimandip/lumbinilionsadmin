// app/components/LazyLoadSection.tsx
"use client"
import { useState, useEffect, useRef } from 'react'
import { Suspense } from 'react'

export default function LazyLoadSection({ 
  children, 
  fallback = <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse h-10 w-10 bg-amber-500 rounded-full"></div>
  </div>
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 } // Start loading when 10% of the section is visible
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : fallback}
    </div>
  )
}