'use client';
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const meteors = [...Array(number)].map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 30) + 1,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    duration: Math.floor(Math.random() * 3) + 1,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className={cn(
            "fixed pointer-events-none opacity-0 top-[var(--y)] left-[var(--x)] z-0",
            className
          )}
          style={{
            '--x': `${meteor.x}%`,
            '--y': `${meteor.y}%`,
          } as React.CSSProperties}
          initial={{ 
            opacity: 0,
            top: `${meteor.y}%`, 
            left: `${meteor.x}%`, 
          }}
          animate={{
            opacity: [0, 1, 0],
            top: [`${meteor.y}%`, `${meteor.y + 10}%`, `${meteor.y + 30}%`],
            left: [`${meteor.x}%`, `${meteor.x + 10}%`, `${meteor.x + 20}%`],
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
          }}
        >
          <div 
            className={cn(
              "w-0.5 h-[calc(var(--size)*1rem)] bg-gradient-to-b from-transparent via-purple-400 to-transparent rotate-[20deg]",
            )}
            style={{
              '--size': meteor.size * 0.05,
            } as React.CSSProperties}
          />
        </motion.div>
      ))}
    </>
  );
};