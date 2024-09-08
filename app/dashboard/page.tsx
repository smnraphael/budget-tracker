import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { addUserToDatabase } from '@/services/userService';

async function Dashboard() {
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
    <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
      <h1>Hello, {user?.firstName}</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Dashboard;
