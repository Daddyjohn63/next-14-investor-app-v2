'use client';

import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LogOut } from 'lucide-react';
// import Link from 'next/link';

// import { Button } from '@/components/ui/button';
// import { isTeacher } from '@/lib/teacher';

// import { SearchInput } from './search-input';

/**
 * Component which renders a button to select
 * which nav routes we want edit or view
 * sits in components\navbar-routes.jsx
 * @returns
 */
export const NavbarRoutes = () => {
  // const { userId } = useAuth();
  const pathname = usePathname();

  const isEditPage = pathname?.startsWith('/edit');
  const isViewPage = pathname?.startsWith('/view');

  // const isTeacherPage = pathname?.startsWith('/teacher');
  // const isCoursePage = pathname?.includes('/courses');
  // const isSearchPage = pathname === '/search';

  return (
    <div className="flex gap-x-2 ml-auto">
      {isEditPage || isViewPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/edit/create-company">
          <Button size="sm" variant="ghost">
            Edit mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
