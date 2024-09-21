import { Meta, StoryObj } from '@storybook/react';
import { BarChartComponent } from '@/components/bar-chart/bar-chart';
import { Transaction } from '@/app/interfaces/transaction';

const meta: Meta<typeof BarChartComponent> = {
  title: 'Components/Bar Chart',
  component: BarChartComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BarChartComponent>;

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-09-01',
    description: 'Transaction 1',
    amount: 0,
    category: { name: 'Income', type: 'income' },
  },
  {
    id: '2',
    date: '2024-09-02',
    description: 'Transaction 2',
    amount: 20,
    category: { name: 'Expense', type: 'expense' },
  },
  {
    id: '3',
    date: '2024-09-03',
    description: 'Transaction 3',
    amount: 0,
    category: { name: 'Income', type: 'income' },
  },
  {
    id: '4',
    date: '2024-09-04',
    description: 'Transaction 4',
    amount: 15,
    category: { name: 'Expense', type: 'expense' },
  },
  {
    id: '5',
    date: '2024-09-05',
    description: 'Transaction 5',
    amount: 320,
    category: { name: 'Income', type: 'income' },
  },
  {
    id: '6',
    date: '2024-09-06',
    description: 'Transaction 6',
    amount: 0,
    category: { name: 'Income', type: 'income' },
  },
  {
    id: '7',
    date: '2024-09-07',
    description: 'Transaction 7',
    amount: 530,
    category: { name: 'Expense', type: 'expense' },
  },
];

export const Default: Story = {
  args: {
    transactions,
  },
};
