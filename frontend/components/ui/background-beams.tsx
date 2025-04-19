"use client";

import React from "react";

export const BackgroundBeams = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 100}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `beam ${Math.random() * 5 + 5}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};