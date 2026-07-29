import type { Meta, StoryObj } from '@storybook/react';
import { TimelineStep } from './TimelineStep';

const meta = {
  title: 'Atoms/TimelineStep',
  component: TimelineStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: 'text',
      description: 'Step number or label',
    },
    title: {
      control: 'text',
      description: 'Step title or heading',
    },
    description: {
      control: 'text',
      description: 'Step description or content',
    },
    isActive: {
      control: 'boolean',
      description: 'Mark as active/current step',
    },
  },
} satisfies Meta<typeof TimelineStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    number: '1',
    title: 'Step Title',
    description: 'Step description goes here',
  },
};

export const Active: Story = {
  args: {
    number: '2',
    title: 'Current Step',
    description: 'This step is currently active',
    isActive: true,
  },
};

export const SecondStep: Story = {
  args: {
    number: '2',
    title: 'Analysis Phase',
    description: 'Deep dive into user research and market analysis',
  },
};

export const ThirdStep: Story = {
  args: {
    number: '3',
    title: 'Design & Iteration',
    description: 'Creating wireframes, prototypes, and design variations',
  },
};

export const WithoutNumber: Story = {
  args: {
    title: 'Process Step',
    description: 'A step without a number indicator',
  },
};
