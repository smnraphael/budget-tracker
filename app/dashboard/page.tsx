import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';

async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  console.log(user);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
      <h1>
        Hello, {user?.firstName} {user?.lastName}
      </h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Dashboard;
