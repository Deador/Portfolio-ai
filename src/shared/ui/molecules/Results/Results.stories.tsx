import type { Meta, StoryObj } from '@storybook/react';
import { Results } from './Results';

const meta = {
  title: 'Molecules/Results',
  component: Results,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['L', 'M'],
      description: 'Results block size variant',
    },
    title: {
      control: 'text',
      description: 'Main heading/title',
    },
    description: {
      control: 'text',
      description: 'Description or content',
    },
  },
} satisfies Meta<typeof Results>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeL: Story = {
  args: {
    size: 'L',
    title: 'Results Title',
    description: 'Results description goes here',
  },
};

export const SizeM: Story = {
  args: {
    size: 'M',
    title: 'Key Outcome',
    description: 'Improved user engagement by 60%',
  },
};

export const LargeSizeExample: Story = {
  args: {
    size: 'L',
    title: 'Improved User Experience',
    description: 'Redesigned onboarding flow resulting in 45% higher completion rate',
  },
};

export const MediumSizeExample: Story = {
  args: {
    size: 'M',
    title: 'Reduced Churn',
    description: 'Decreased customer churn by 30% through improved feature discovery',
  },
};
