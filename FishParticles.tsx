import React, { useEffect, useState } from 'react';
import PixelFish from './PixelFish.tsx';

const PALETTES = ['mono-white', 'mono-black'] as const;
const SIZES = ['xs', 'sm'] as const;

interface Particle {
  id: number;
  y: number;
  size: 'xs' | 'sm';
  palette: typeof PALETTES[number];
  duration: number;
  delay: number;
  blinkDuration: number;
}

interface FishParticlesProps {
  continuous?: boolean;
}

const FishParticles: React.FC<FishParticlesProps> = ({ continuous = false }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = continuous ? (isReduced ? 10 : 25) : (isReduced ? 6 : 15);
    
    const createParticle = (id: number) => ({
      id,
      y: Math.random() * 85 + 5,
      size: SIZES[Math.floor(Math.random() * SIZES.length)],
      palette: PALETTES[Math.floor(Math.random() * PALETTES.length)],
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -24,
      blinkDuration: 1 + Math.random() * 1.5
    });

    setParticles(Array.from({ length: count }, (_, i) => createParticle(i)));
  }, [continuous]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute w-full"
          style={{ top: `${p.y}%`, left: 0 }}
        >
          <div 
            className="animate-swim-x"
            style={{ 
              '--swim-duration': `${p.duration}s`, 
              animationDelay: `${p.delay}s` 
            } as React.CSSProperties}
          >
            <div className="animate-swim-bob">
              <PixelFish 
                size={p.size} 
                palette={p.palette} 
                style={{ '--blink-duration': `${p.blinkDuration}s` } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FishParticles;