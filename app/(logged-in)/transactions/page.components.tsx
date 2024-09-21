'use client';

import { useEffect, useState } from 'react';
import { Transaction } from '@/app/interfaces/transaction';
import TransactionsTable from '@/components/transactions-table/transactions-table';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

function PageComponents() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async (month: Date) => {
    try {
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
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

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Transaction deleted successfully');
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } else {
      const result = await response.json();
      alert(result.message || 'Error deleting transaction');
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

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-[hsl(var(--background-))]'>
        Loading...
      </div>
    );

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <Button variant='outline' onClick={goToPreviousMonth}>
          <ArrowLeft />
        </Button>
        <Typography variant='h4'>
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
        <Button variant='outline' onClick={goToNextMonth}>
          <ArrowRight />
        </Button>
      </div>
      <TransactionsTable
        transactions={transactionsData}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default PageComponents;
