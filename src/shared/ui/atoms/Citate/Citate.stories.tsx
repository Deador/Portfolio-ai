import type { Meta, StoryObj } from '@storybook/react';
import { Citate } from './Citate';

const meta = {
  title: 'Atoms/Citate',
  component: Citate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Citation text content',
    },
    source: {
      control: 'text',
      description: 'Source or attribution',
    },
  },
} satisfies Meta<typeof Citate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Text',
  },
};

export const WithSource: Story = {
  args: {
    text: 'Design systems are the scalable way to build and maintain digital products.',
    source: 'Design System Expert',
  },
};

export const LongQuote: Story = {
  args: {
    text:
      'The best design systems balance flexibility with consistency, allowing teams to move quickly while maintaining brand integrity across all touchpoints.',
    source: 'UX Researcher',
  },
};
