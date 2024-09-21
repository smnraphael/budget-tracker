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

export interface CategoryConfig {
  label: string;
  color: string;
}

export interface Config {
  [key: string]: CategoryConfig;
}

export interface TransactionsCardProps {
  type: string;
  transactions: {
    amount: number;
    category: string;
  }[];
  config: Config;
}

const chartData = [
  { day: '1', income: 0, expense: 0 },
  { day: '2', income: 0, expense: 20 },
  { day: '3', income: 0, expense: 0 },
  { day: '4', income: 0, expense: 15 },
  { day: '5', income: 320, expense: 0 },
  { day: '6', income: 0, expense: 0 },
  { day: '7', income: 0, expense: 530 },
  { day: '8', income: 0, expense: 80 },
  { day: '9', income: 0, expense: 0 },
  { day: '10', income: 20, expense: 40 },
  { day: '11', income: 0, expense: 50 },
  { day: '12', income: 0, expense: 60 },
  { day: '13', income: 0, expense: 0 },
  { day: '14', income: 0, expense: 80 },
  { day: '15', income: 0, expense: 150 },
  { day: '16', income: 0, expense: 0 },
  { day: '17', income: 0, expense: 40 },
  { day: '18', income: 0, expense: 70 },
  { day: '19', income: 0, expense: 0 },
  { day: '20', income: 0, expense: 100 },
  { day: '21', income: 0, expense: 0 },
  { day: '22', income: 0, expense: 120 },
  { day: '23', income: 0, expense: 0 },
  { day: '24', income: 0, expense: 30 },
  { day: '25', income: 0, expense: 170 },
  { day: '26', income: 0, expense: 90 },
  { day: '27', income: 0, expense: 130 },
  { day: '28', income: 1930, expense: 0 },
  { day: '29', income: 0, expense: 250 },
  { day: '30', income: 0, expense: 190 },
];

const chartDataRadial = [{ income: 1260, expenses: 570 }];

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--income))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--expense))',
  },
};

function TransactionsCard({
  type,
  transactions,
  config,
}: TransactionsCardProps) {
  const [selectedChart, setSelectedChart] = useState<string>('bar-chart');

  const handleSelectChange = (value: string) => {
    setSelectedChart(value);
  };

  return (
    <Card className='col-span-1 lg:col-span-2 lg:h-[500px]'>
      <div className='flex justify-between'>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <div className='p-4'>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder='Choose Chart' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bar-chart'>Bar Chart</SelectItem>
              <SelectItem value='pie-chart'>Pie Chart</SelectItem>
              <SelectItem value='radial-chart'>Radial Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedChart === 'bar-chart' && (
        <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
      )}
      {selectedChart === 'pie-chart' && (
        <BothPieChartsComponent
          type={type}
          transactions={transactions}
          config={config}
        />
      )}
      {selectedChart === 'radial-chart' && (
        <RadialChartComponent
          chartData={chartDataRadial}
          chartConfig={chartConfig}
        />
      )}
    </Card>
  );
}

export default TransactionsCard;
