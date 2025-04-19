'use client';
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

type TypewriterEffectProps = {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.25,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <div className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  key={`char-${index}`}
                  className={cn(
                    "dark:text-white text-black opacity-0",
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      ref={scope}
    >
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-bold mt-4 mb-8">
          {renderWords()}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={cn(
              "inline-block rounded-sm w-[4px] h-8 md:h-12 bg-purple-500",
              cursorClassName
            )}
          ></motion.span>
        </div>
      </div>
    </div>
  );
};