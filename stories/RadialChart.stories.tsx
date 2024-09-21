import type { Meta, StoryObj } from '@storybook/react';
import { RadialChartComponent } from '@/components/radial-chart/radial-chart';

const meta: Meta<typeof RadialChartComponent> = {
  title: 'Components/Radial Chart',
  component: RadialChartComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadialChartComponent>;

const chartData = [{ income: 1260, expenses: 570 }];

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

export const Default: Story = {
  args: {
    chartData,
    chartConfig,
  },
};
