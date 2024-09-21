'use client';

import { Typography } from '@/components/ui/typography';

function TotalCurrentBalance() {
  return (
    <Typography variant='p'>
      Total current balance: <span className='font-semibold'>14,643.46€</span>
    </Typography>
  );
}

export default TotalCurrentBalance;
