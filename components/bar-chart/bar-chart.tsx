'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Transaction } from '@/app/interfaces/transaction';
import { barChartConfig } from './bar-chart-config';

interface BarChartComponentProps {
  transactions: Transaction[];
}

export function BarChartComponent({ transactions }: BarChartComponentProps) {
  const formatTransactionDataForBarChart = (transactions: Transaction[]) => {
    const formattedData: { day: number; income: number; expense: number }[] =
      [];

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const day = transactionDate.getDate();

      const existingEntry = formattedData.find((entry) => entry.day === day);

      if (existingEntry) {
        if (transaction.category.type === 'income') {
          existingEntry.income += transaction.amount;
        } else {
          existingEntry.expense += transaction.amount;
        }
      } else {
        formattedData.push({
          day: day,
          income:
            transaction.category.type === 'income' ? transaction.amount : 0,
          expense:
            transaction.category.type === 'expense' ? transaction.amount : 0,
        });
      }
    });

    return formattedData.reverse();
  };

  const formattedData = formatTransactionDataForBarChart(transactions);

  return (
    <Card className='border-none shadow-none'>
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <ChartContainer config={barChartConfig} className='w-full lg:h-[350px]'>
          <BarChart accessibilityLayer data={formattedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey='income'
              fill={barChartConfig.income.color}
              radius={4}
              barSize={4}
            />
            <Bar
              dataKey='expense'
              fill={barChartConfig.expenses.color}
              radius={4}
              barSize={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
