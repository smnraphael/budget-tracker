import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch incomes
    const incomes = await prisma.category.findMany({
      where: {
        type: 'income',
      },
    });
    return NextResponse.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    return NextResponse.json(
      { message: 'Error fetching incomes' },
      { status: 500 }
    );
  }
}
