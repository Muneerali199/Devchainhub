'use client';
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingStarsBackgroundCardProps {
  children: React.ReactNode;
  className?: string;
  starClassName?: string;
  color?: "purple" | "blue" | "green" | "pink" | "orange" | "yellow" | "cyan" | "red";
}

export function GlowingStarsBackgroundCard({
  children,
  className,
  starClassName,
  color = "purple",
}: GlowingStarsBackgroundCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Map color to gradient values
  const getGradient = () => {
    switch (color) {
      case "blue":
        return "from-blue-500/20 to-blue-400/5";
      case "green":
        return "from-green-500/20 to-green-400/5";
      case "pink":
        return "from-pink-500/20 to-pink-400/5";
      case "orange":
        return "from-orange-500/20 to-orange-400/5";
      case "yellow":
        return "from-yellow-500/20 to-yellow-400/5";
      case "cyan":
        return "from-cyan-500/20 to-cyan-400/5";
      case "red":
        return "from-red-500/20 to-red-400/5";
      case "purple":
      default:
        return "from-purple-500/20 to-purple-400/5";
    }
  };

  const getGlowColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "pink":
        return "bg-pink-500";
      case "orange":
        return "bg-orange-500";
      case "yellow":
        return "bg-yellow-500";
      case "cyan":
        return "bg-cyan-500";
      case "red":
        return "bg-red-500";
      case "purple":
      default:
        return "bg-purple-500";
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4",
        `bg-gradient-to-b ${getGradient()}`,
        className
      )}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing star background */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              "absolute rounded-full opacity-30",
              getGlowColor(),
              starClassName
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glow effect following mouse */}
      {isHovered && (
        <motion.div
          className={cn(
            "absolute blur-xl rounded-full opacity-20 w-40 h-40 pointer-events-none -translate-x-1/2 -translate-y-1/2",
            getGlowColor()
          )}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}