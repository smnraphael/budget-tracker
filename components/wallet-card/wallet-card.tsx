'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Wallet } from 'lucide-react';
import CountUp from 'react-countup';

function WalletCard() {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant='h4'>
              <CountUp start={0} end={3200.34} decimals={2} />€
            </Typography>
          </CardContent>
        </div>
        <div className='p-6 text-[hsl(var(--wallet))]'>
          <Wallet className='h-12 w-12' />
        </div>
      </div>
    </Card>
  );
}

export default WalletCard;
