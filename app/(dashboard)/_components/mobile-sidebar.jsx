'use client';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * component to render mobile sidebar
 * app\(dashboard)\_components\mobile-sidebar.jsx
 * used in
 * app\(dashboard)\_components\navbar.jsx
 * USED IN app\(dashboard)\_components\navbar.jsx
 * @returns
 */
export const MobileSidebar = () => {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar(state => state.onOpen);
  const onClose = useMobileSidebar(state => state.onClose);
  const isOpen = useMobileSidebar(state => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button onClick={onOpen} className="block md:hidden" variant="ghost" size="sm">
        <Menu className="h-6 w-6" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};
