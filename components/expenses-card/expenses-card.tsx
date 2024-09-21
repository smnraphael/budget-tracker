'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { TrendingDown } from 'lucide-react';
import CountUp from 'react-countup';

function ExpensesCard() {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant='h4'>
              <CountUp start={0} end={2048.95} decimals={2} />€
            </Typography>
          </CardContent>
        </div>
        <div className='p-6 text-[hsl(var(--expense))]'>
          <TrendingDown className='h-12 w-12' />
        </div>
      </div>
    </Card>
  );
}

export default ExpensesCard;
