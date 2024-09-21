'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface FormData {
  balance: string;
}

function Balance() {
  const router = useRouter();
  const form = useForm<FormData>();

  const handleSubmit = async (data: FormData) => {
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

  return (
    <FormProvider {...form}>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
          <CardDescription>
            Set your current balance (you can edit it later)
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <FormDescription>
                    This is your starting balance
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type='submit'>Save</Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

export default Balance;
