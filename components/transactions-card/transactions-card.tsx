'use client';

import { PieChartComponent } from '@/components/pie-chart/pie-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CategoryConfig = {
  label: string;
  color: string;
};

type Config = {
  [key: string]: CategoryConfig;
};

interface TransactionsCardProps {
  type: string;
  transactions: {
    amount: number;
    category: string;
  }[];
  config: Config;
}

function TransactionsCard({
  type,
  transactions,
  config,
}: TransactionsCardProps) {
  return (
    <Card className='col-span-2'>
      <div className='flex justify-between'>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <div className='p-4'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Choose Chart' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='bar-chart'>Bar Chart</SelectItem>
                <SelectItem value='pie-chart'>Pie Chart</SelectItem>
                <SelectItem value='pie-chart'>Radial Chart</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <PieChartComponent
          type='Income'
          transactions={transactions}
          config={config}
        />
        <PieChartComponent
          type={type}
          transactions={transactions}
          config={config}
        />
      </div>
    </Card>
  );
}

export default TransactionsCard;
