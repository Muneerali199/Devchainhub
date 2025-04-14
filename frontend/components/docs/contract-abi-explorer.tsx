'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface ABIItem {
  type: string;
  name: string;
  inputs: {
    name: string;
    type: string;
  }[];
  outputs?: {
    name: string;
    type: string;
  }[];
  stateMutability?: string;
}

interface ContractABIExplorerProps {
  abi: ABIItem[];
  address?: string;
}

export function ContractABIExplorer({ abi, address }: ContractABIExplorerProps) {
  const [filter, setFilter] = useState('');

  const filteredABI = abi.filter(
    (item) =>
      item.name?.toLowerCase().includes(filter.toLowerCase()) ||
      item.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Contract ABI Explorer</span>
          {address && (
            <Badge variant="outline" className="font-mono">
              {address}
            </Badge>
          )}
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search functions..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Inputs</TableHead>
              <TableHead>Outputs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredABI.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Badge variant="outline">{item.type}</Badge>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  {item.inputs.map((input, i) => (
                    <div key={i} className="text-sm">
                      {input.name}: {input.type}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {item.outputs?.map((output, i) => (
                    <div key={i} className="text-sm">
                      {output.name}: {output.type}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Try It
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}