import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChartComponent } from '@/components/ui/pie-chart';
import { RecentTransactionsTable } from '@/components/recent-transactions-table/recent-transactions-table';
import { Transaction } from '@/app/interfaces/transaction';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className='mx-auto mb-12 mt-24 flex h-max w-full max-w-7xl flex-col gap-6 px-6'>
      <div className='flex items-end justify-between px-2'>
        <div className='flex flex-col gap-2'>
          <Typography variant='h1'>
            Welcome back, {user?.firstName}! 👋
          </Typography>
          <Typography
            variant='p'
            className='text-[hsl(var(--muted-foreground))]'
          >
            This is your financial overview report
          </Typography>
        </div>
        <div>
          <Typography variant='p'>
            Total current balance:{' '}
            <span className='font-semibold'>14,643.46€</span>
          </Typography>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <Card>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle>Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant='h4'>3,200.34€</Typography>
              </CardContent>
            </div>
            <div className='p-6 text-[hsl(var(--wallet))]'>
              <Wallet className='h-12 w-12' />
            </div>
          </div>
        </Card>
        <Card>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle>Income</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant='h4'>5,249.29€</Typography>
              </CardContent>
            </div>
            <div className='p-6 text-[hsl(var(--income))]'>
              <TrendingUp className='h-12 w-12' />
            </div>
          </div>
        </Card>
        <Card>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant='h4'>2,048.95€</Typography>
              </CardContent>
            </div>
            <div className='p-6 text-[hsl(var(--expense))]'>
              <TrendingDown className='h-12 w-12' />
            </div>
          </div>
        </Card>
        <Card className='col-span-2'>
          <div className='flex justify-between'>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <div className='p-4'>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Graph / Chart' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='bar-chart'>Bar Graph</SelectItem>
                    <SelectItem value='pie-chart'>Pie Chart</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <PieChartComponent
              type='Income'
              transactions={transactions}
              config={config}
            />
            <PieChartComponent
              type={type}
              transactions={transactions}
              config={config}
            />
          </div>
        </Card>
        <Card className='flex flex-col justify-between'>
          <div>
            <CardHeader>
              <CardTitle>Recent transactions</CardTitle>
            </CardHeader>
            <RecentTransactionsTable transactions={transactionsData} />
          </div>
          <div className='self-end justify-self-end p-4'>
            <Button variant='link'>
              <Typography variant='p'>See more</Typography>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
