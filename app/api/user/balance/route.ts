import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

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

    // Find user by clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { balance: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return user's balance
    return NextResponse.json({ balance: user.balance });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching balance:', error.message);
      return NextResponse.json(
        { message: 'Error fetching balance', error: error.message },
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
