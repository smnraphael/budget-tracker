'use client';

import { useEffect, useState } from 'react';
import WalletCard from '@/components/wallet-card/wallet-card';
import IncomeCard from '@/components/income-card/income-card';
import ExpensesCard from '@/components/expenses-card/expenses-card';
import RecentTransactionsCard from '@/components/recent-transactions-card/recent-transactions-card';
import TransactionsCard from '@/components/transactions-card/transactions-card';
import { Transaction } from '@/app/interfaces/transaction';
import BothCta from '@/components/both-cta/both-cta';
import TotalCurrentBalance from '@/components/total-current-balance/total-current-balance';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

function PageComponents() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async (month: Date) => {
    try {
      const startOfMonth = new Date(
        Date.UTC(month.getFullYear(), month.getMonth(), 1)
      );
      const endOfMonth = new Date(
        Date.UTC(month.getFullYear(), month.getMonth() + 1, 0)
      );
      const response = await fetch(
        `/api/transactions/get?start=${startOfMonth.toISOString()}&end=${endOfMonth.toISOString()}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactionsData(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchTransactions(currentMonth);
  }, [currentMonth]);

  const income = transactionsData
    .filter((transaction) => transaction.category.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactionsData
    .filter((transaction) => transaction.category.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  const formattedDate = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-[hsl(var(--background-))]'>
        Loading...
      </div>
    );

  return (
    <>
      <Button
        variant='ghost'
        onClick={goToPreviousMonth}
        className='text-none fixed left-2 top-[50%] z-10 border p-2 backdrop-blur-sm lg:left-[5%]'
      >
        <ArrowLeft />
      </Button>
      <Button
        variant='ghost'
        onClick={goToNextMonth}
        className='fixed right-2 top-[50%] z-10 border p-2 backdrop-blur-sm lg:right-[5%]'
      >
        <ArrowRight />
      </Button>

      <Typography
        variant='p'
        className='-mt-4 px-2 text-[hsl(var(--muted-foreground))]'
      >
        This is your financial overview report for {formattedDate}
      </Typography>
      <div className='flex flex-col items-center justify-end gap-4 lg:-mt-24 lg:items-end'>
        <BothCta fetchTransactions={fetchTransactions} />
        <TotalCurrentBalance />
      </div>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <WalletCard balance={balance} />
        <IncomeCard income={income} />
        <ExpensesCard expenses={expenses} />
        <RecentTransactionsCard transactions={transactionsData} />
        <TransactionsCard
          transactions={transactionsData}
          income={income}
          expenses={expenses}
          balance={balance}
        />
      </div>
    </>
  );
}

export default PageComponents;
