'use client';

import { useEffect, useState } from 'react';
import { decryptData } from '../utils/cryptoUtils';

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

  async function fetchTransactions() {
    const response = await fetch('/api/transactions/get');
    if (response.ok) {
      const transactionsData = await response.json();
      setTransactions(transactionsData);
    } else {
      console.error('Error fetching transactions');
    }
  }

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
  }, []);

  return (
    <div>
      <h1>Your Transactions</h1>
      <ul>
        {transactions.map((transaction) => {
          const decryptedDescription = decryptData(transaction.description);
          const decryptedAmount = decryptData(transaction.amount);
          const date = new Date(transaction.date);
          const formattedDate = date.toISOString().split('T')[0];
          return (
            <li key={transaction.id}>
              {decryptedDescription} - ${decryptedAmount} -{' '}
              {transaction.category.name} - {transaction.category.type} -{' '}
              {formattedDate}
              <button onClick={() => handleDelete(transaction.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
