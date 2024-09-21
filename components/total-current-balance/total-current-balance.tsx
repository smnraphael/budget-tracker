'use client';

import { useEffect, useState } from 'react';
import { Typography } from '@/components/ui/typography';
import CountUp from 'react-countup';

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

  const totalBalance = Number(balance);

  return (
    <Typography variant='p'>
      Total current balance:{' '}
      <span className='font-semibold'>
        <CountUp start={0} end={totalBalance} decimals={2} />€
      </span>
    </Typography>
  );
}

export default TotalCurrentBalance;
