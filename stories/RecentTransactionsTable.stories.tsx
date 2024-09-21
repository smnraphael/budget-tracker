import { Meta, StoryObj } from '@storybook/react';
import { RecentTransactionsTable } from '@/components/recent-transactions-table/recent-transactions-table';
import { Transaction } from '@/app/interfaces/transaction';

const transactionsData: Transaction[] = [
  {
    id: '1',
    date: '12/08',
    category: 'Housing 🏡',
    description: 'Rent Payment',
    amount: -1200.0,
  },
  {
    id: '2',
    date: '10/08',
    category: 'Groceries 🛒',
    description: 'Supermarket',
    amount: -150.0,
  },
  {
    id: '3',
    date: '08/08',
    category: 'Transportation 🚗',
    description: 'Gas Station',
    amount: -60.0,
  },
  {
    id: '4',
    date: '05/08',
    category: 'Salary 💼',
    description: 'Company Payroll',
    amount: 2500.0,
  },
  {
    id: '5',
    date: '03/08',
    category: 'Entertainment 🎉',
    description: 'Concert Tickets',
    amount: -75.0,
  },
];

const meta: Meta<typeof RecentTransactionsTable> = {
  title: 'Components/Recent Transactions Table',
  component: RecentTransactionsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    transactions: transactionsData,
  },
};

export default meta;
type Story = StoryObj<typeof RecentTransactionsTable>;

export const Default: Story = {};
