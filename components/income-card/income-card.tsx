'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';

interface IncomeCardProps {
  income: number;
}

function IncomeCard({ income }: IncomeCardProps) {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant='h4'>
              <CountUp start={0} end={income} decimals={2} />€
            </Typography>
          </CardContent>
        </div>
        <div className='m-6 rounded-[var(--radius)] border border-[hsl(var(--income))] p-2 text-[hsl(var(--income))]'>
          <TrendingUp className='h-12 w-12' />
        </div>
      </div>
    </Card>
  );
}

export default IncomeCard;
