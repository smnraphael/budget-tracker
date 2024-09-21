'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { TrendingUp } from 'lucide-react';

function IncomeCard() {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle>Income</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant='h4'>5,249.29€</Typography>
          </CardContent>
        </div>
        <div className='p-6 text-[hsl(var(--income))]'>
          <TrendingUp className='h-12 w-12' />
        </div>
      </div>
    </Card>
  );
}

export default IncomeCard;
