import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Typography } from '@/components/ui/typography';
import { Transaction } from '@/app/interfaces/transaction';
import WalletCard from '@/components/wallet-card/wallet-card';
import IncomeCard from '@/components/income-card/income-card';
import ExpensesCard from '@/components/expenses-card/expenses-card';
import TransactionsCard from '@/components/transactions-card/transactions-card';
import RecentTransactionsCard from '@/components/recent-transactions-card/recent-transactions-card';
import TotalCurrentBalance from '@/components/total-current-balance/total-current-balance';
import BothCta from '@/components/both-cta/both-cta';

const type = 'Expenses';

const transactions = [
  { amount: 975, category: 'housing' },
  { amount: 294, category: 'groceries' },
  { amount: 120, category: 'clothing' },
  { amount: 60, category: 'utilities' },
  { amount: 12, category: 'health' },
];

const config = {
  housing: {
    label: 'Housing',
    color: 'hsl(var(--chart-housing))',
  },
  groceries: {
    label: 'Groceries',
    color: 'hsl(var(--chart-groceries))',
  },
  clothing: {
    label: 'Clothing',
    color: 'hsl(var(--chart-clothing))',
  },
  utilities: {
    label: 'Utilities',
    color: 'hsl(var(--chart-utilities))',
  },
  health: {
    label: 'Health',
    color: 'hsl(var(--chart-health))',
  },
};

const transactionsData: Transaction[] = [
  {
    id: '1',
    date: '12/08',
    category: 'Housing 🏡',
    description: 'Rent Payment',
    amount: -1200.0,
  },
  {
    id: '2',
    date: '10/08',
    category: 'Groceries 🛒',
    description: 'Supermarket',
    amount: -150.0,
  },
  {
    id: '3',
    date: '08/08',
    category: 'Transportation 🚗',
    description: 'Gas Station',
    amount: -60.0,
  },
  {
    id: '4',
    date: '05/08',
    category: 'Salary 💼',
    description: 'Company Payroll',
    amount: 2500.0,
  },
  {
    id: '5',
    date: '03/08',
    category: 'Entertainment 🎉',
    description: 'Concert Tickets',
    amount: -75.0,
  },
];

async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  return (
    <div className='mx-auto mb-12 mt-20 flex h-max w-full max-w-7xl flex-col gap-6 px-6'>
      <div className='flex items-center justify-between px-2'>
        <div className='flex flex-col gap-2'>
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
        <div className='flex flex-col items-stretch justify-between gap-4'>
          <BothCta />
          <TotalCurrentBalance />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <WalletCard />
        <IncomeCard />
        <ExpensesCard />
        <TransactionsCard
          type={type}
          transactions={transactions}
          config={config}
        />
        <RecentTransactionsCard transactionsData={transactionsData} />
      </div>
    </div>
  );
}

export default Dashboard;
