import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { SignedOut } from '@clerk/nextjs';
import EmojiBackground from './components/emoji-background';
import Button from './components/button';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
      <EmojiBackground />
      <div className='relative flex flex-col items-center justify-center gap-8 rounded-lg border border-slate-200 p-8 backdrop-blur-sm dark:border-slate-800'>
        <div>
          <h1 className='text-8xl font-black uppercase'>Budget Tracker</h1>
          <p className='font-bold text-slate-500 dark:text-slate-300'>
            Tired of using excel to manage your budget? Me too!
          </p>
        </div>
        <SignedOut>
          <div className='flex gap-6'>
            <Link href='/sign-in'>
              <Button variant='primary'>Sign in</Button>
            </Link>
            <Link href='/sign-up'>
              <Button variant='secondary'>Sign up</Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
