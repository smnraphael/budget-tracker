import { Meta, StoryObj } from '@storybook/react';
import { BarChartComponent } from '@/components/bar-chart/bar-chart';

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
  { day: '28', income: 2930, expense: 0 },
  { day: '29', income: 0, expense: 250 },
  { day: '30', income: 0, expense: 190 },
];

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--income))',
  },
  expense: {
    label: 'Expense',
    color: 'hsl(var(--expense))',
  },
};

export const Default: Story = {
  args: {
    chartData,
    chartConfig,
  },
};
