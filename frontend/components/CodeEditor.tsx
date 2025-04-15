'use client';

import Editor, { Monaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';

interface CodeEditorProps {
  code: string;
  language?: string;
  height?: string;
  compileable?: boolean;
  className?: string;
  onCodeChange?: (value: string | undefined) => void;
}

export function CodeEditor({
  code,
  language = 'solidity',
  height = '500px',
  compileable = false,
  className,
  onCodeChange,
}: CodeEditorProps) {
  const { theme } = useTheme();
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState<{
    success: boolean;
    output?: string;
    errors?: string[];
    warnings?: string[];
  } | null>(null);

  const handleEditorWillMount = (monaco: Monaco) => {
    // Register Solidity language
    monaco.languages.register({ id: 'solidity' });
    
    // Set Solidity syntax highlighting
    monaco.languages.setMonarchTokensProvider('solidity', {
      defaultToken: '',
      tokenPostfix: '.sol',
      keywords: [
        'pragma', 'contract', 'interface', 'library', 'is', 'import',
        'function', 'constructor', 'modifier', 'returns', 'event', 'emit',
        'public', 'private', 'internal', 'external', 'view', 'pure', 
        'payable', 'memory', 'storage', 'calldata', 'assembly',
        'using', 'for', 'if', 'else', 'try', 'catch', 'while', 'do',
        'break', 'continue', 'return', 'delete', 'new'
      ],
      typeKeywords: [
        'uint', 'int', 'address', 'bool', 'string', 'bytes', 'mapping',
        'struct', 'enum', 'uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256',
        'int8', 'int16', 'int32', 'int64', 'int128', 'int256', 'bytes1', 'bytes32'
      ],
      operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '%', '&', '|', '^', '<<', '>>'
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      tokenizer: {
        root: [
          [/[a-zA-Z_$][\w$]*/, {
            cases: {
              '@keywords': 'keyword',
              '@typeKeywords': 'type',
              '@default': 'identifier'
            }
          }],
          { include: '@whitespace' },
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, {
            cases: {
              '@operators': 'operator',
              '@default': ''
            }
          }],
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/0[xX][0-9a-fA-F]+/, 'number.hex'],
          [/\d+/, 'number'],
          [/[;,.]/, 'delimiter'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, 'string', '@string_double'],
          [/'[^\\']'/, 'string'],
        ],
        whitespace: [
          [/[ \t\r\n]+/, 'white'],
          [/\/\/.*$/, 'comment'],
          [/\/\*/, 'comment', '@comment']
        ],
        string_double: [
          [/[^\\"]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/"/, 'string', '@pop']
        ],
        comment: [
          [/[^\/*]+/, 'comment'],
          [/\/\*/, 'comment', '@push'],
          ["\\*/", 'comment', '@pop'],
          [/[\/*]/, 'comment']
        ],
      },
    });

    // Set editor theme
    monaco.editor.defineTheme('solidity-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '569CD6' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'comment', foreground: '6A9955' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
      }
    });
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    try {
      // Mock compilation - replace with actual compiler API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate different outcomes
      const randomSuccess = Math.random() > 0.3;
      setCompilationResult({
        success: randomSuccess,
        output: randomSuccess 
          ? 'Compilation successful!\nContract size: 2.45 KB\nGas estimates:\n- Deployment: 1,240,000\n- setValue: 42,000'
          : undefined,
        errors: randomSuccess 
          ? undefined 
          : ['Error: Uninitialized storage pointer at line 15'],
        warnings: randomSuccess
          ? ['Warning: Function state mutability can be restricted to view']
          : undefined
      });
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <Tabs defaultValue="code" className="h-full">
        <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/50">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            {compilationResult && (
              <TabsTrigger value="output">
                {compilationResult.success ? 'Output' : 'Errors'}
              </TabsTrigger>
            )}
          </TabsList>
          {compileable && (
            <Button 
              size="sm" 
              onClick={handleCompile}
              disabled={isCompiling}
            >
              {isCompiling ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Compiling...
                </>
              ) : (
                'Compile'
              )}
            </Button>
          )}
        </div>

        <TabsContent value="code" className="m-0">
          <Editor
            height={height}
            defaultLanguage={language}
            language={language}
            theme={theme === 'dark' ? 'solidity-dark' : 'light'}
            value={code}
            onChange={onCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              padding: { top: 12 },
              scrollBeyondLastLine: false,
              renderWhitespace: 'selection',
              tabSize: 2,
              insertSpaces: true,
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              formatOnPaste: true,
              formatOnType: true,
            }}
            beforeMount={handleEditorWillMount}
          />
        </TabsContent>

        {compilationResult && (
          <TabsContent value="output" className="m-0 p-4">
            <pre
              className={`p-4 rounded text-sm overflow-auto ${compilationResult.success 
                ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300' 
                : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300'}`}
              style={{ height }}
            >
              {compilationResult.success 
                ? compilationResult.output 
                : compilationResult.errors?.join('\n')}
              
              {compilationResult.warnings?.length && (
                <div className="mt-4 pt-4 border-t border-yellow-500/30">
                  <h4 className="font-medium text-yellow-600 dark:text-yellow-400">Warnings:</h4>
                  <div className="text-yellow-600 dark:text-yellow-400">
                    {compilationResult.warnings.join('\n')}
                  </div>
                </div>
              )}
            </pre>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}