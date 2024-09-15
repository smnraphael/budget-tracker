import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { decryptData } from '@/app/utils/cryptoUtils';

export async function GET() {
  try {
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    // Fetch transactions for authenticated user
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        createdAt: true,
        category: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    // Decrypt amount and description
    const decryptedTransactions = transactions.map((transaction) => ({
      ...transaction,
      description: decryptData(transaction.description),
      amount: parseFloat(decryptData(transaction.amount)),
    }));

    return NextResponse.json(decryptedTransactions);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching transactions:', error.message);
      return NextResponse.json(
        { message: 'Error fetching transactions', error: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { message: 'Unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}
