'use client';
import { usePathname } from 'next/navigation';
import {
  ActivitySquareIcon,
  BookUserIcon,
  Building2Icon,
  Compass,
  Layout,
  LineChartIcon,
  List,
  PlusCircleIcon
} from 'lucide-react';
import { SidebarItem } from './sidebar-item';

const viewRoutes = [
  {
    icon: Layout,
    label: 'Investment profiles',
    href: '/'
  },
  {
    icon: Compass,
    label: 'List of companies',
    href: '/search'
  },
  {
    icon: LineChartIcon,
    label: 'Analytics',
    href: '/analytics'
  }
];

const editRoutes = [
  {
    icon: Building2Icon,
    label: 'Edit a company',
    href: '/edit/edit-company'
  },
  {
    icon: PlusCircleIcon,
    label: 'Create a new company',
    href: '/edit/create-company'
  },

  {
    icon: ActivitySquareIcon,
    label: 'Assessments',
    href: '/edit/complete-assessment'
  },
  {
    icon: BookUserIcon,
    label: 'Investment profile',
    href: '/edit/investment-profile'
  }
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isEditPage = pathname?.includes('/edit');

  const routes = isEditPage ? editRoutes : viewRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map(route => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
