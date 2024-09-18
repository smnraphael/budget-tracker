import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/app/components/typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p'],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    variant: 'p',
    children: 'This is a paragraph example using Typography component',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children: 'Lorem ipsum dolor sit amet',
  },
};
