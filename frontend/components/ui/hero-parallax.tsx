'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export function HeroParallax({ products }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  return (
    <div 
      ref={ref}
      className="relative w-full"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6 md:mb-12">
          All-in-One Platform
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-zinc-300 mb-12 md:mb-20">
          Explore our comprehensive suite of blockchain development tools designed to accelerate your project from concept to deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 container mx-auto px-4 md:px-6 pb-20">
        {products.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            index={i}
            progress={scrollYProgress}
            springConfig={springConfig}
          />
        ))}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  progress: any;
  springConfig: any;
}

function ProductCard({ product, index, progress, springConfig }: ProductCardProps) {
  const y = useTransform(
    progress,
    [0, 1],
    [0, index % 2 === 0 ? 100 : -100],
    springConfig
  );

  return (
    <motion.div
      style={{ y }}
      whileHover={{ scale: 1.05 }}
      className="relative rounded-xl overflow-hidden group"
    >
      <Link href={product.link} className="block h-full">
        <div className="h-96 relative overflow-hidden rounded-xl border border-zinc-800">
          <Image
            src={`https://images.unsplash.com${product.thumbnail}`}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h3 className="text-2xl font-semibold text-white mb-2">{product.title}</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}