'use client';

import { Typography } from '@/components/ui/typography';
import CountUp from 'react-countup';

interface TotalCurrentBalanceProps {
  totalBalance: string | null;
}

function TotalCurrentBalance({ totalBalance }: TotalCurrentBalanceProps) {
  const formattedTotalBalance = Number(totalBalance);

  return (
    <Typography variant='p'>
      Total current balance:{' '}
      <span className='font-semibold'>
        <CountUp start={0} end={formattedTotalBalance} decimals={2} />€
      </span>
    </Typography>
  );
}

export default TotalCurrentBalance;
