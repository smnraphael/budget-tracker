'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Balance() {
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

  return (
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
  );
}

export default Balance;
