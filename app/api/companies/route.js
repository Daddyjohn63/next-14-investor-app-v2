import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId } = auth();
    const { companyname } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const company = await db.company.create({
      data: {
        userId,
        companyname
      }
    });
    //     console.log('[COMPANY]', company);
    //returns
    //     [COMPANY] {
    //   id: '84764e0c-2cc7-4b0e-9d16-0be4e727ab2e',
    //   userId: 'user_2c08ypZ16GBaLN4dkaf4VzYUFa3',
    //   companyname: 'COMPANY 1',
    //   description: null,
    //   imageUrl: null,
    //   isPublished: false,
    //   sectorId: null,
    //   createdAt: 2024-02-11T14:39:22.409Z,
    //   updatedAt: 2024-02-11T14:39:22.409Z
    // }
    return NextResponse.json(company);
  } catch (error) {
    //console.log('[COMPANIES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
