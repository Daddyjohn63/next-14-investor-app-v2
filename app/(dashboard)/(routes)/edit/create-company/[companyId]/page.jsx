// import { DiscAlbum } from 'lucide-react';

import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Titleform } from './_components/title-form';
import { Descriptionform } from './_components/description-form';
import { Imageform } from './_components/image-form';

const CompanyIdPage = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const company = await db.company.findUnique({
    where: {
      id: params.companyId
    }
  });

  if (!company) {
    return redirect('/');
  }

  //array of required fields
  const requiredFields = [company.companyname, company.description, company.imageUrl, company.sectorId];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Company setup</h1>
          <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Create the company</h2>
          </div>
          <Titleform initialData={company} companyId={company.id} />
          <Descriptionform initialData={company} companyId={company.id} />
          <Imageform initialData={company} companyId={company.id} />
        </div>
      </div>
    </div>
  );
};
export default CompanyIdPage;
