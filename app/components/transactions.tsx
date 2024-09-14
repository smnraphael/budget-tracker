'use client';

import { useEffect, useState } from 'react';

interface TransactionType {
  id: string;
  description: string;
  amount: string;
  date: string;
  category: {
    name: string;
    type: string;
  };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch('/api/transactions/get');
      if (response.ok) {
        const transactionsData = await response.json();
        setTransactions(transactionsData);
      } else {
        console.error('Error fetching transactions');
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Your Transactions</h1>
      <ul>
        {transactions.map((transaction) => {
          const date = new Date(transaction.date);
          const formattedDate = date.toISOString().split('T')[0];
          return (
            <li key={transaction.id}>
              {transaction.description} - ${transaction.amount} -{' '}
              {transaction.category.name} - {transaction.category.type} -{' '}
              {formattedDate}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
