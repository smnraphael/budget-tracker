import type { Meta, StoryObj } from '@storybook/react';
import { PieChartComponent } from '@/components/pie-chart/pie-chart';

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

const type = 'Expenses';

const transactions = [
  { amount: 975, category: 'housing' },
  { amount: 294, category: 'groceries' },
  { amount: 120, category: 'clothing' },
  { amount: 60, category: 'utilities' },
  { amount: 12, category: 'health' },
];

const config = {
  housing: {
    label: 'Housing',
    color: 'hsl(var(--chart-housing))',
  },
  groceries: {
    label: 'Groceries',
    color: 'hsl(var(--chart-groceries))',
  },
  clothing: {
    label: 'Clothing',
    color: 'hsl(var(--chart-clothing))',
  },
  utilities: {
    label: 'Utilities',
    color: 'hsl(var(--chart-utilities))',
  },
  health: {
    label: 'Health',
    color: 'hsl(var(--chart-health))',
  },
};

export const Expenses: Story = {
  args: {
    type,
    transactions,
    config,
  },
};
