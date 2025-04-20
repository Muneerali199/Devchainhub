// frontend/app/dashboard/[project]/security/scan/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Check, X, AlertTriangle } from 'lucide-react'

export default function SecurityScanPage() {
  const { project } = useParams();

// Ensure projectName is defined and handle the case when it's undefined
const projectName = Array.isArray(project) ? project[0] : project;

// Safely handle undefined projectName by providing a default value
const displayName = projectName ? projectName.replace(/-/g, ' ') : 'Unnamed Project';  // Provide default if undefined


  const scanResults = [
    { issue: 'Reentrancy vulnerability', severity: 'High', status: 'Not fixed' },
    { issue: 'Unchecked return value', severity: 'Medium', status: 'Fixed' },
    { issue: 'Outdated compiler version', severity: 'Low', status: 'Fixed' },
    { issue: 'Unused variables', severity: 'Info', status: 'Not fixed' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Security Scan for {displayName}</h1>
      
      <div className="mb-6">
        <Button>
          <Shield className="w-4 h-4 mr-2" />
          Run New Scan
        </Button>
      </div>

      <div className="space-y-4">
        {scanResults.map((result, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                {result.severity === 'High' ? (
                  <X className="w-5 h-5 text-red-500" />
                ) : result.severity === 'Medium' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Check className="w-5 h-5 text-green-500" />
                )}
                <div>
                  <h3 className="font-medium">{result.issue}</h3>
                  <p className="text-sm text-muted-foreground">
                    Severity: {result.severity} • Status: {result.status}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}