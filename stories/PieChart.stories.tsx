import type { Meta, StoryObj } from '@storybook/react';
import { PieChartComponent } from '@/components/pie-chart/pie-chart';
import { Transaction } from '@/app/interfaces/transaction';

const meta: Meta<typeof PieChartComponent> = {
  title: 'Components/Pie Chart',
  component: PieChartComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PieChartComponent>;

const type = 'expense';

const transactions: Transaction[] = [
  {
    id: '1',
    amount: 975,
    description: 'Monthly Rent',
    date: '2024-09-01',
    category: { name: 'Housing 🏡', type: 'expense' },
  },
  {
    id: '2',
    amount: 294,
    description: 'Groceries',
    date: '2024-09-02',
    category: { name: 'Groceries 🛒', type: 'expense' },
  },
  {
    id: '3',
    amount: 120,
    description: 'Clothes Shopping',
    date: '2024-09-03',
    category: { name: 'Clothing 👗', type: 'expense' },
  },
  {
    id: '4',
    amount: 60,
    description: 'Electricity Bill',
    date: '2024-09-04',
    category: { name: 'Utilities 💡', type: 'expense' },
  },
  {
    id: '5',
    amount: 12,
    description: 'Doctor Visit',
    date: '2024-09-05',
    category: { name: 'Health 🩺', type: 'expense' },
  },
];

export const Expenses: Story = {
  args: {
    type,
    transactions,
  },
};
