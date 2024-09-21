'use client';

import { Transaction } from '@/app/interfaces/transaction';
import { RecentTransactionsTable } from '@/components/recent-transactions-table/recent-transactions-table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

interface RecentTransactionsProps {
  transactionsData: Transaction[];
}

function RecentTransactionsCard({ transactionsData }: RecentTransactionsProps) {
  return (
    <Card className='flex flex-col justify-between lg:h-[500px]'>
      <div>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
        </CardHeader>
        <div className='px-4'>
          <RecentTransactionsTable transactions={transactionsData} />
        </div>
      </div>
      <div className='self-end justify-self-end p-4'>
        <Link href='/transactions'>
          <Button variant='link'>
            <Typography variant='p'>See more</Typography>
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default RecentTransactionsCard;
