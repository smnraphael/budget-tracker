'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChartComponent } from '../bar-chart/bar-chart';
import { RadialChartComponent } from '../radial-chart/radial-chart';
import BothPieChartsComponent from '../both-pie-charts/both-pie-charts';
import { useState } from 'react';
import { Transaction } from '@/app/interfaces/transaction';
import { Typography } from '../ui/typography';

interface TransactionsCardProps {
  transactions: Transaction[];
  income: number;
  expenses: number;
  balance: number;
}

function TransactionsCard({
  transactions,
  income,
  expenses,
  balance,
}: TransactionsCardProps) {
  const [selectedChart, setSelectedChart] = useState<string>('pie-chart');

  const handleSelectChange = (value: string) => {
    setSelectedChart(value);
  };

  return (
    <Card className='col-span-1 min-h-[175px] lg:col-span-2 lg:h-[500px]'>
      <div className='flex justify-between'>
        <CardHeader className='pr-0'>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <div className='p-4 pl-0'>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder='Choose Chart' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pie-chart'>Pie Chart</SelectItem>
              <SelectItem value='bar-chart'>Bar Chart</SelectItem>
              <SelectItem value='radial-chart'>Radial Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {transactions.length > 0 ? (
        <>
          {selectedChart === 'pie-chart' && (
            <BothPieChartsComponent transactions={transactions} />
          )}
          {selectedChart === 'bar-chart' && (
            <BarChartComponent transactions={transactions} />
          )}
          {selectedChart === 'radial-chart' && (
            <RadialChartComponent
              income={income}
              expenses={expenses}
              balance={balance}
            />
          )}
        </>
      ) : (
        <Typography variant='p' className='text-center'>
          Nothing to see here.
        </Typography>
      )}
    </Card>
  );
}

export default TransactionsCard;
