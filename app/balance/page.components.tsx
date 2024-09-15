'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
    <div>
      <h1>Set Your Balance</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Initial Balance:
          <input
            type='number'
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder='Enter your balance'
            required
            step='0.01'
          />
        </label>
        <button type='submit'>Update Balance</button>
      </form>
    </div>
  );
}

export default Balance;
