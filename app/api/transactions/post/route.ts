import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { encryptData, decryptData } from '@/app/utils/cryptoUtils';

export async function POST(request: Request) {
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
    const { description, amount, date, categoryId } = body;

    // Validate categoryId
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { message: 'Invalid category' },
        { status: 400 }
      );
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    // Convert date to ISO-8601 format
    const formattedDate = new Date(date).toISOString();

    // Determine amount change based on category type
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }

    const amountChange =
      category.type === 'income' ? amountNumber : -amountNumber;

    // Encrypt amount and description
    const encryptedAmount = encryptData(amount.toString());
    const encryptedDescription = encryptData(description);

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        description: encryptedDescription,
        amount: encryptedAmount,
        date: formattedDate,
        categoryId,
        userId: user.id,
      },
    });

    // Decrypt user balance, update it, and encrypt it again
    const decryptedBalance = parseFloat(decryptData(user.balance));
    if (isNaN(decryptedBalance)) {
      return NextResponse.json({ message: 'Invalid balance' }, { status: 400 });
    }

    const updatedBalance = decryptedBalance + amountChange;
    const encryptedUpdatedBalance = encryptData(updatedBalance.toFixed(2));

    await prisma.user.update({
      where: { clerkId: userId },
      data: { balance: encryptedUpdatedBalance },
    });

    return NextResponse.json({ transaction });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating transaction:', error.message);
      return NextResponse.json(
        { message: 'Error creating transaction', error: error.message },
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
