import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, UserButton } from '@clerk/nextjs';
import AddExpenseForm from '../components/add-expense-form';
import AddIncomeForm from '../components/add-income-form';
import Transactions from '../components/transactions';
import UserBalance from '../components/user-balance';

async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

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
      <UserBalance />
    </div>
  );
}

export default Dashboard;
