'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

interface SidebarNavigationProps {
  items: NavItem[];
}

export function SidebarNavigation({ items }: SidebarNavigationProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((current) =>
      current.includes(title)
        ? current.filter((t) => t !== title)
        : [...current, title]
    );
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      const isActive = item.href === pathname;
      const isOpen = openSections.includes(item.title);

      if (item.items) {
        return (
          <Collapsible
            key={item.title}
            open={isOpen}
            onOpenChange={() => toggleSection(item.title)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start pl-${level * 4}`}
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                {item.title}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {renderNavItems(item.items, level + 1)}
            </CollapsibleContent>
          </Collapsible>
        );
      }

      return (
        <Link
          key={item.title}
          href={item.href || '#'}
          className={`flex items-center pl-${level * 4 + 6} py-2 text-sm ${
            isActive
              ? 'text-primary font-medium'
              : 'text-muted-foreground hover:text-primary'
          }`}
        >
          {item.title}
        </Link>
      );
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-2">{renderNavItems(items)}</div>
    </ScrollArea>
  );
}