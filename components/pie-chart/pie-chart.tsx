import { Label, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
import { Transaction } from '@/app/interfaces/transaction';
import { pieChartConfig } from './pie-chart-config';

interface PieChartProps {
  type: 'income' | 'expense';
  transactions: Transaction[];
}

export function PieChartComponent({ type, transactions }: PieChartProps) {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.category.type === type
  );

  const data = filteredTransactions.map((transaction) => ({
    category: transaction.category.name,
    amount: transaction.amount,
  }));

  const totalTransactions = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
  }, [data]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className='flex flex-col border-none shadow-none lg:mt-12'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>
          {type === 'income' ? 'Income per category' : 'Expenses per category'}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        <ChartContainer
          config={pieChartConfig}
          className='mx-auto aspect-square h-[300px]'
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
              innerRadius={75}
              outerRadius={100}
            >
              {data.map((entry, index) => {
                const color = pieChartConfig[entry.category]?.color || '#ccc';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
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
                          {formatAmount(Number(totalTransactions))}€
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
