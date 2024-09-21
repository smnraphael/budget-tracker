'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { Transaction } from '@/app/interfaces/transaction';

function PageComponents() {
  const [balance, setBalance] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/user/balance/patch', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance: balance.toString() }),
    });

    if (response.ok) {
      alert('Balance updated successfully');
      router.push('/dashboard');
    } else {
      const result = await response.json();
      alert(result.message || 'Error updating balance');
    }
  };

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

  const income = transactionsData
    .filter((transaction) => transaction.category.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactionsData
    .filter((transaction) => transaction.category.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const currentBalance = income - expenses;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Typography variant='p'>
        Current total balance:{' '}
        <span className='font-bold'>{currentBalance}€</span>
      </Typography>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
          <CardDescription>
            Set your balance to start (you can edit it later)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center gap-4'
          >
            <Input
              type='number'
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder='Balance (€)'
              required
              step='0.01'
            />
            <Button>Save</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default PageComponents;
