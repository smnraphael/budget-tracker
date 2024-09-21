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
      <Typography variant='h1'>Welcome back, {user?.firstName}! 👋</Typography>
      <PageComponents />
    </>
  );
}

export default Dashboard;
