'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Play, Check } from 'lucide-react';

interface InteractiveCodeBlockProps {
  defaultValue: string;
  language: string;
  onExecute?: (code: string) => Promise<void>;
}

export function InteractiveCodeBlock({
  defaultValue,
  language,
  onExecute,
}: InteractiveCodeBlockProps) {
  const [code, setCode] = useState(defaultValue);
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = async () => {
    if (!onExecute) return;
    setIsExecuting(true);
    try {
      await onExecute(code);
    } catch (error) {
      console.error('Execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-muted">
        <span className="text-sm font-medium">{language}</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-8 w-8"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          {onExecute && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExecute}
              disabled={isExecuting}
              className="h-8 w-8"
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <Editor
        height="300px"
        language={language}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          readOnly: false,
          wordWrap: 'on',
        }}
      />
    </Card>
  );
}