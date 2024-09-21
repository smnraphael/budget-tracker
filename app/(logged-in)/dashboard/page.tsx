import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Typography } from '@/components/ui/typography';
import PageComponents from './page.components';

async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  return (
    <>
      <div className='flex flex-col items-center justify-between gap-4 px-2 lg:flex-row'>
        <div className='flex w-full flex-col gap-2'>
          <Typography variant='h1'>
            Welcome back, {user?.firstName}! 👋
          </Typography>
          <Typography
            variant='p'
            className='text-[hsl(var(--muted-foreground))]'
          >
            This is your financial overview report for the current month
          </Typography>
        </div>
      </div>
      <PageComponents />
    </>
  );
}

export default Dashboard;
