'use client';

import { Typography } from '@/components/ui/typography';
import { useEffect, useState } from 'react';

function TotalCurrentBalance() {
  const [balance, setBalance] = useState<string | null>(null);

  async function fetchBalance() {
    const response = await fetch('/api/user/balance');
    const data = await response.json();

    if (response.ok) {
      setBalance(data.balance);
    } else {
      console.error('Error fetching balance');
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <Typography variant='p'>
      Total current balance:{' '}
      <span className='font-semibold'>{Number(balance).toFixed(2)}€</span>
    </Typography>
  );
}

export default TotalCurrentBalance;
