
import React from 'react';
import { FISH_ASSETS } from './FishData';

interface PixelFishProps {
  size?: 'xs' | 'sm';
  palette?: 'mono-white' | 'mono-black';
  direction?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

const PixelFish: React.FC<PixelFishProps> = ({ 
  size = 'xs', 
  palette = 'mono-white', 
  direction = 'right',
  className = '',
  style = {}
}) => {
  const spriteKey = size === 'xs' ? 'fish-xs' : 'fish-sm';
  const paletteData = FISH_ASSETS.palettes[palette as keyof typeof FISH_ASSETS.palettes] || FISH_ASSETS.palettes['mono-white'];
  const svgString = FISH_ASSETS.sprites[spriteKey].render(paletteData);

  return (
    <div 
      className={`pixel-fish pixel-fish--${size} ${direction === 'left' ? 'pixel-fish--left' : ''} blink-80s ${className}`}
      style={{ ...style }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

export default PixelFish;
