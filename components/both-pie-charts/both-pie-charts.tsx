import React from 'react';
import { PieChartComponent } from '../pie-chart/pie-chart';
import { Transaction } from '@/app/interfaces/transaction';

export interface BothPieChartsProps {
  transactions: Transaction[];
}

function BothPieChartsComponent({ transactions }: BothPieChartsProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
      <PieChartComponent type='income' transactions={transactions} />
      <PieChartComponent type='expense' transactions={transactions} />
    </div>
  );
}

export default BothPieChartsComponent;
