'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface FormData {
  balance: string;
}

function PageComponents() {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const form = useForm<FormData>();

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/user/balance/get');
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { balance: string }) => {
    const response = await fetch('/api/user/balance/patch', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance: data.balance }),
    });

    if (response.ok) {
      alert('Balance updated successfully');
      router.push('/dashboard');
    } else {
      const result = await response.json();
      alert(result.message || 'Error updating balance');
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-[hsl(var(--background-))]'>
        Loading...
      </div>
    );

  return (
    <div className='flex flex-col items-center gap-6 lg:mt-6'>
      <Typography variant='p'>
        Current total balance:{' '}
        <span className='font-bold'>{formatAmount(Number(balance))}€</span>
      </Typography>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Edit your balance</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col justify-center gap-4'
            >
              <FormField
                control={form.control}
                name='balance'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance (€)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='eg: 1000'
                        step='0.01'
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit'>Save</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default PageComponents;
