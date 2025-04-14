'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Download, Shield, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  downloads: number;
  rating: number;
  tags: string[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hardhat Security Plugin',
    description: 'Advanced security analysis for smart contracts',
    price: 0.1,
    currency: 'ETH',
    category: 'Security',
    downloads: 12500,
    rating: 4.8,
    tags: ['security', 'testing', 'analysis'],
  },
  {
    id: '2',
    name: 'NFT Collection Generator',
    description: 'Create and deploy NFT collections with ease',
    price: 0.05,
    currency: 'ETH',
    category: 'NFT',
    downloads: 8300,
    rating: 4.5,
    tags: ['nft', 'art', 'generator'],
  },
  // Add more mock products...
];

const categories = ['All', 'Security', 'NFT', 'DeFi', 'Testing', 'Templates'];

export default function MarketplacePage() {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(
    (product) =>
      (category === 'All' || product.category === category) &&
      (searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Web3 Marketplace</h1>
          <p className="text-muted-foreground">
            Discover and purchase blockchain development tools and templates
          </p>
        </div>
        <Button className="gap-2">
          <Package className="h-4 w-4" />
          Submit Listing
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-80"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  {product.downloads.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {product.rating}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-lg font-bold">
                {product.price} {product.currency}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    className="gap-2"
                  >
                    Purchase
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Purchase {product.name}</DialogTitle>
                    <DialogDescription>
                      Connect your wallet to complete the purchase
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-4">
                      <span>Price:</span>
                      <span className="font-bold">
                        {product.price} {product.currency}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 mr-2" />
                      Secure payment via smart contract
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="w-full">
                      Connect Wallet
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}