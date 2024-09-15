import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { decryptData, encryptData } from '@/app/utils/cryptoUtils';

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Get transaction id from url
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { message: 'Invalid transaction ID' },
        { status: 400 }
      );
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    // Find transaction to delete
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Check if transaction belongs to authenticated user
    if (transaction.userId !== user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    // Decrypt transaction amount
    const decryptedAmount = parseFloat(decryptData(transaction.amount));
    if (isNaN(decryptedAmount)) {
      return NextResponse.json(
        { message: 'Invalid transaction amount' },
        { status: 400 }
      );
    }

    // Determine balance adjustment based on transaction type
    const amountChange =
      transaction.category.type === 'income'
        ? -decryptedAmount
        : decryptedAmount;

    // Decrypt user balance
    const decryptedBalance = parseFloat(decryptData(user.balance));
    if (isNaN(decryptedBalance)) {
      return NextResponse.json({ message: 'Invalid balance' }, { status: 400 });
    }

    // Update user balance
    const updatedBalance = decryptedBalance + amountChange;

    // Encrypt updated balance before storing
    const encryptedUpdatedBalance = encryptData(updatedBalance.toString());

    // Update user balance in database
    await prisma.user.update({
      where: { clerkId: userId },
      data: { balance: encryptedUpdatedBalance },
    });

    // Delete transaction
    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting transaction:', error.message);
      return NextResponse.json(
        { message: 'Error deleting transaction', error: error.message },
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
