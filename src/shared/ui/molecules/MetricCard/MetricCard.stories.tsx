import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['short', 'long'],
      description: 'Card layout variant',
    },
    title: {
      control: 'text',
      description: 'Main title or metric value',
    },
    description: {
      control: 'text',
      description: 'Secondary description text',
    },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    type: 'short',
    title: 'Title',
    description: 'Description',
  },
};

export const ShortExample: Story = {
  args: {
    type: 'short',
    title: 'Performance',
    description: 'Improved by 40% through optimization',
  },
};

export const Long: Story = {
  args: {
    type: 'long',
    title: 'Key Achievement',
    description: 'Implemented new design system that improved development velocity by 60%',
  },
};

export const LongAlternate: Story = {
  args: {
    type: 'long',
    title: 'User Engagement',
    description: 'Increased user retention through improved onboarding experience',
  },
};
