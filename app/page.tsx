import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { SignedOut } from '@clerk/nextjs';
import EmojiBackground from './components/emoji-background';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center px-6'>
      <EmojiBackground />
      <Card className='backdrop-blur-md'>
        <CardHeader className='text-center text-6xl'>
          <CardTitle>Budget Tracker</CardTitle>
          <CardDescription className='text-center'>
            Tired of using excel to manage your budget? Me too!
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <SignedOut>
            <div className='flex flex-col gap-2'>
              <Link href='/sign-in'>
                <Button variant='default'>Sign in</Button>
              </Link>
              <Link href='/sign-up'>
                <Button variant='link'>Sign up</Button>
              </Link>
            </div>
          </SignedOut>
        </CardContent>
      </Card>
    </div>
  );
}
