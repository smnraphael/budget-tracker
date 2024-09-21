import React from 'react';
import { PieChartComponent } from '../pie-chart/pie-chart';
import { Config } from '../transactions-card/transactions-card';

export interface BothPieChartsProps {
  type: string;
  transactions: {
    amount: number;
    category: string;
  }[];
  config: Config;
}

function BothPieChartsComponent({
  type,
  transactions,
  config,
}: BothPieChartsProps) {
  return (
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
  );
}

export default BothPieChartsComponent;
