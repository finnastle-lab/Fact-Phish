import React, { useState, useEffect, useRef } from 'react';

interface Win95WindowProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  draggable?: boolean;
}

const Win95Window: React.FC<Win95WindowProps> = ({ 
  title, 
  onClose, 
  children, 
  className = "", 
  width = "auto", 
  height = "auto",
  draggable = false
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable || e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    currentOffset.current = { ...offset };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      setOffset({
        x: currentOffset.current.x + dx,
        y: currentOffset.current.y + dy
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`bg-zinc-300 win95-shadow flex flex-col transition-shadow ${isDragging ? 'z-[1000] shadow-2xl' : ''} ${className}`}
      style={{ 
        width, height, 
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        position: 'relative'
      }}
    >
      <div 
        onMouseDown={handleMouseDown}
        className={`bg-zinc-800 text-white px-1 py-1 flex items-center justify-between select-none shrink-0 ${draggable ? 'cursor-move' : 'cursor-default'}`}
      >
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-zinc-400 border border-white"></div>
          <span className="text-[10px] sm:text-sm font-bold truncate pr-4">{title}</span>
        </div>
        <div className="flex gap-1 shrink-0">
          <button className="w-3 h-3 sm:w-4 sm:h-4 bg-zinc-300 border border-t-white border-l-white border-b-zinc-600 border-r-zinc-600"></button>
          <button className="w-3 h-3 sm:w-4 sm:h-4 bg-zinc-300 border border-t-white border-l-white border-b-zinc-600 border-r-zinc-600"></button>
          {onClose && (
            <button 
              onClick={onClose}
              className="w-3 h-3 sm:w-4 sm:h-4 bg-zinc-300 border border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 flex items-center justify-center font-bold text-[8px] sm:text-[10px]"
            >X</button>
          )}
        </div>
      </div>
      <div className="flex-1 p-0.5 sm:p-1 overflow-hidden flex flex-col min-h-0">{children}</div>
    </div>
  );
};

export default Win95Window;