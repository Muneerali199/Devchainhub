'use client';
import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThreeDCardDemoProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ThreeDCardDemo({ 
  icon, 
  title, 
  description, 
  className 
}: ThreeDCardDemoProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from the center (normalized from -1 to 1)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 shadow-xl transition-all duration-200",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformPerspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
    >
      {/* Glowing overlay */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center center, rgba(123, 31, 162, 0.5), transparent 70%)",
          opacity: isHovered ? 0.5 : 0,
        }}
      />
      
      <div className="relative z-10">
        {icon && (
          <motion.div 
            className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 p-3"
            animate={{
              y: isHovered ? -5 : 0,
              rotateZ: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {icon}
          </motion.div>
        )}
        
        <motion.h3 
          className="mb-3 text-xl font-semibold text-white"
          animate={{
            y: isHovered ? -2 : 0,
          }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-zinc-400"
          animate={{
            y: isHovered ? -1 : 0,
          }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}