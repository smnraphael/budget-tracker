'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface Transaction {
  amount: number;
  category: string;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface PieChartProps {
  type?: string;
  transactions: Transaction[];
  config: ChartConfig;
}

export function PieChartComponent({
  type,
  transactions,
  config,
}: PieChartProps) {
  const data = transactions.map((transaction) => ({
    category: transaction.category,
    amount: transaction.amount,
    fill: config[transaction.category]?.color || '#ccc',
  }));

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{type}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        <ChartContainer
          config={config}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey='amount'
              nameKey='category'
              innerRadius={50}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
