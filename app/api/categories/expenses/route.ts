import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch expenses
    const expenses = await prisma.category.findMany({
      where: {
        type: 'expense',
      },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { message: 'Error fetching expenses' },
      { status: 500 }
    );
  }
}
