import { addUserToDatabase } from '@/services/userService';
import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import Balance from './page.components';

async function BalancePage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  if (userId && user) {
    const fullName = `${user.firstName} ${user.lastName}`;
    const email = user.emailAddresses[0].emailAddress;
    await addUserToDatabase(userId, fullName, email);
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center px-6'>
      <Balance />
    </div>
  );
}

export default BalancePage;
