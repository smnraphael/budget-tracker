'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Wallet } from 'lucide-react';
import CountUp from 'react-countup';

interface WalletCardProps {
  balance: number;
}

function WalletCard({ balance }: WalletCardProps) {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant='h4'>
              <CountUp start={0} end={balance} decimals={2} />€
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
