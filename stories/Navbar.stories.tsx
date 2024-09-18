import type { Meta, StoryObj } from '@storybook/react';
import Navbar from '@/components/ui/navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const WithoutClerkUserButton: Story = {
  render: () => <Navbar showClerkUserButton={false} />,
};
