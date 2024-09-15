import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { encryptData } from '@/app/utils/cryptoUtils';

export async function PATCH(request: Request) {
  try {
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { balance } = body;

    // Validate balance
    if (isNaN(parseFloat(balance)) || parseFloat(balance) < 0) {
      return NextResponse.json({ message: 'Invalid balance' }, { status: 400 });
    }

    // Encrypt balance
    const encryptedBalance = encryptData(balance);

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    // Update user balance
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: { balance: encryptedBalance },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating balance:', error.message);
      return NextResponse.json(
        { message: 'Error updating balance', error: error.message },
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
