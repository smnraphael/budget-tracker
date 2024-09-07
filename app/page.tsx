import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { SignedOut } from '@clerk/nextjs';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
      <h1 className='text-8xl font-black uppercase'>CLERK</h1>
      <SignedOut>
        <Link href='/sign-in'>
          <button className='rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600'>
            Sign-in
          </button>
        </Link>
        <Link href='/sign-up'>
          <button className='rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600'>
            Sign-up
          </button>
        </Link>
      </SignedOut>
    </div>
  );
}
