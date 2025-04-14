'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InteractiveCodeBlock } from './interactive-code-block';

interface APIMethodCardProps {
  method: string;
  endpoint: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses: {
    code: number;
    description: string;
    example: string;
  }[];
}

export function APIMethodCard({
  method,
  endpoint,
  description,
  parameters,
  responses,
}: APIMethodCardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const requestExample = `fetch('${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})`;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Badge variant="outline">{method}</Badge>
          <CardTitle className="font-mono text-lg">{endpoint}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="try">Try It Out</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Parameters</h4>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="font-medium">Name</div>
                  <div className="font-medium">Type</div>
                  <div className="font-medium">Required</div>
                  <div className="font-medium">Description</div>
                  {parameters.map((param) => (
                    <>
                      <div>{param.name}</div>
                      <div>{param.type}</div>
                      <div>{param.required ? 'Yes' : 'No'}</div>
                      <div>{param.description}</div>
                    </>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Responses</h4>
                <div className="space-y-4">
                  {responses.map((response) => (
                    <div key={response.code}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={response.code < 400 ? 'default' : 'destructive'}
                        >
                          {response.code}
                        </Badge>
                        <span className="text-sm">{response.description}</span>
                      </div>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{response.example}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="try">
            <InteractiveCodeBlock
              defaultValue={requestExample}
              language="javascript"
              onExecute={async (code) => {
                // Implement API call
                console.log('Executing:', code);
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}