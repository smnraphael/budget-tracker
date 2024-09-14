import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { addUserToDatabase } from '@/services/userService';
import AddExpenseForm from '../components/add-expense-form';
import AddIncomeForm from '../components/add-income-form';
import Transactions from '../components/transactions';

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
      <h1>Expense</h1>
      <AddExpenseForm />
      <h1>Income</h1>
      <AddIncomeForm />
      <Transactions />
    </div>
  );
}

export default Dashboard;
