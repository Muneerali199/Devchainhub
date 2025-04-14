'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Version {
  version: string;
  date: string;
  changelog: string;
}

interface VersionSelectorProps {
  versions: Version[];
  currentVersion: string;
}

export function VersionSelector({
  versions,
  currentVersion,
}: VersionSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleVersionChange = (version: string) => {
    const newPath = pathname.replace(
      /\/docs\/v[\d.]+/,
      `/docs/${version}`
    );
    router.push(newPath);
  };

  return (
    <Select value={currentVersion} onValueChange={handleVersionChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select version" />
      </SelectTrigger>
      <SelectContent>
        {versions.map((v) => (
          <SelectItem
            key={v.version}
            value={v.version}
            className="flex justify-between"
          >
            <span>{v.version}</span>
            <span className="text-muted-foreground text-sm">{v.date}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}