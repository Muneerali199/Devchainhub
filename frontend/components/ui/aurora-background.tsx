"use client";

import React from "react";
import { motion } from "framer-motion";

export const AuroraBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative flex flex-col h-[100vh] overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            [--white-gradient:repeating-linear-gradient(100deg,white_0%,white_7%,transparent_10%,transparent_12%,white_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)]
            [--aurora:repeating-linear-gradient(100deg,#5e60ce_10%,#4ea8de_15%,#48bfe3_20%,#56cfe1_25%,#64dfdf_30%)]
            absolute
            inset-0
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] opacity-20
            dark:opacity-20
            will-change-transform
          `}
        />
      </div>
      {children}
    </div>
  );
};