import { prisma } from '@/lib/db';

export const addUserToDatabase = async (
  clerkId: string,
  name: string,
  email: string
) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        name,
        email,
      },
      create: {
        clerkId,
        name,
        email,
        balance: '0',
      },
    });
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
