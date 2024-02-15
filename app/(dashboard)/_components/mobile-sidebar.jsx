import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';

/**
 * component to render mobile sidebar
 * app\(dashboard)\_components\mobile-sidebar.jsx
 * used in
 * app\(dashboard)\_components\navbar.jsx
 * USED IN app\(dashboard)\_components\navbar.jsx
 * @returns
 */
export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
