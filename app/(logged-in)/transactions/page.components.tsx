'use client';

import { useEffect, useState } from 'react';
import { Transaction } from '@/app/interfaces/transaction';
import TransactionsTable from '@/components/transactions-table/transactions-table';

function PageComponents() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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

  useEffect(() => {
    fetchTransactions();
  }, [transactions]);

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-[hsl(var(--background-))]'>
        Loading...
      </div>
    );

  return (
    <>
      <TransactionsTable
        transactions={transactionsData}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default PageComponents;
