'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface BarChartData {
  day: string;
  income: number;
  expense: number;
}

interface BarChartComponentProps {
  chartData: BarChartData[];
  chartConfig: ChartConfig;
}

export function BarChartComponent({
  chartData,
  chartConfig,
}: BarChartComponentProps) {
  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <ChartContainer config={chartConfig} className='h-[350px]'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey='income' fill={chartConfig.income.color} radius={4} />
            <Bar
              dataKey='expense'
              fill={chartConfig.expenses.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
