
import React, { useState, useEffect } from 'react';

const BillyBass: React.FC = () => {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-32 flex items-center justify-center bg-[#b8860b] rounded-[40%] border-4 border-[#8b4513] win95-shadow overflow-hidden group">
      <div className={`absolute transition-all duration-300 ${mouthOpen ? 'translate-x-4 rotate-12' : 'translate-x-0 rotate-0'}`}>
        <svg width="120" height="60" viewBox="0 0 120 60" shapeRendering="crispEdges">
          {/* Fish Body */}
          <rect x="10" y="10" width="80" height="40" fill="#556b2f" />
          <rect x="0" y="20" width="20" height="20" fill="#556b2f" /> {/* Tail */}
          
          {/* Eye */}
          <rect x="75" y="18" width="4" height="4" fill="white" />
          <rect x="77" y="20" width="2" height="2" fill="black" />
          
          {/* Mouth */}
          {mouthOpen ? (
            <rect x="85" y="30" width="10" height="12" fill="black" />
          ) : (
            <rect x="85" y="34" width="10" height="2" fill="black" />
          )}
          
          {/* Underbelly */}
          <rect x="20" y="40" width="60" height="10" fill="#f5f5dc" />
        </svg>
      </div>
      <div className="absolute bottom-2 text-[10px] font-black text-[#5c4033] uppercase">Billy Bass v2.1</div>
    </div>
  );
};

export default BillyBass;
