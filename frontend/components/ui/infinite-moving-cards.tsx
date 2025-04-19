'use client';
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  stars: number;
}

interface InfiniteMovingCardsProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(1);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      const itemCount = items.length;
      const minDuplicates = Math.ceil(window.innerWidth / (containerRef.current.offsetWidth / itemCount)) + 1;
      setDuplicateCount(Math.max(minDuplicates, 2)); // Ensure at least 2 duplicates for seamless loop
    }
  }, [items, containerRef]);

  const getVelocity = () => {
    switch (speed) {
      case "fast":
        return direction === "left" ? -40 : 40;
      case "slow":
        return direction === "left" ? -15 : 15;
      case "normal":
      default:
        return direction === "left" ? -25 : 25;
    }
  };

  const duplicatedItems = Array.from({ length: duplicateCount }, () => [...items]).flat();

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden relative w-full",
        className
      )}
    >
      <motion.div
        className="flex gap-4 py-4 w-max"
        animate={{
          x: direction === "left" 
            ? [0, -containerWidth * (items.length / duplicatedItems.length)]
            : [-containerWidth * (items.length / duplicatedItems.length), 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
            velocity: getVelocity(),
          },
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full sm:w-[350px] md:w-[450px] rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm px-6 py-8 relative"
          >
            <div className="mb-4 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < item.stars ? "text-yellow-500 fill-yellow-500" : "text-zinc-600"
                  )}
                />
              ))}
            </div>
            <p className="text-zinc-300 italic mb-6">"{item.quote}"</p>
            <div>
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-zinc-400 text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}