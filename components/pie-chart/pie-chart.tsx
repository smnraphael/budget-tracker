'use client';

import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';

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

  const totalTransactions = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card className='flex flex-col border-none shadow-none'>
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
              innerRadius={70}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-xl font-bold'
                        >
                          {totalTransactions.toLocaleString()}€
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
