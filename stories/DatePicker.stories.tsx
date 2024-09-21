import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@/components/date-picker/date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'date',
      description: 'Selected date in the date picker',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => <DatePicker />,
};
