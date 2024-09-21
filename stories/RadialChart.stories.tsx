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

export const Default: Story = {
  args: {
    income: 1260,
    expenses: 570,
    balance: 690,
  },
};
