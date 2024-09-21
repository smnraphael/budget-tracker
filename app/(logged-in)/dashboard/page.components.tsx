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

function PageComponents() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions/get');
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const income = transactionsData
    .filter((transaction) => transaction.category.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactionsData
    .filter((transaction) => transaction.category.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-[hsl(var(--background-))]'>
        Loading...
      </div>
    );

  return (
    <>
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
