'use client';

import { useEffect, useState } from 'react';
import { Transaction } from '@/app/interfaces/transaction';
import TransactionsTable from '@/components/transactions-table/transactions-table';

function PageComponents() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <TransactionsTable transactions={transactionsData} />{' '}
    </>
  );
}

export default PageComponents;
