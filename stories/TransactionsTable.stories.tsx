import { Meta, StoryObj } from '@storybook/react';
import TransactionsTable from '@/components/transactions-table/transactions-table';
import { Transaction } from '@/app/interfaces/transaction';

const transactionsData: Transaction[] = [
  {
    id: '1',
    date: 'August 12, 2024',
    category: { name: 'Housing 🏡', type: 'expense' },
    description: 'Rent Payment',
    amount: -1200.0,
  },
  {
    id: '2',
    date: 'August 10, 2024',
    category: { name: 'Groceries 🛒', type: 'expense' },
    description: 'Supermarket',
    amount: -150.0,
  },
  {
    id: '3',
    date: 'August 8, 2024',
    category: { name: 'Transportation 🚗', type: 'expense' },
    description: 'Gas Station',
    amount: -60.0,
  },
  {
    id: '4',
    date: 'August 5, 2024',
    category: { name: 'Salary 💼', type: 'income' },
    description: 'Company Payroll',
    amount: 2500.0,
  },
  {
    id: '5',
    date: 'August 3, 2024',
    category: { name: 'Entertainment 🎉', type: 'expense' },
    description: 'Concert Tickets',
    amount: -75.0,
  },
];

const meta: Meta<typeof TransactionsTable> = {
  title: 'Components/Transactions Table',
  component: TransactionsTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    transactions: transactionsData,
  },
};

export default meta;
type Story = StoryObj<typeof TransactionsTable>;

export const Default: Story = {};
