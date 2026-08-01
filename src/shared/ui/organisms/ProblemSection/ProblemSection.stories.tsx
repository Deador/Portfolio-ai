import type { Meta, StoryObj } from '@storybook/react';
import { ProblemSection } from './ProblemSection';

const meta = {
  title: 'Organisms/ProblemSection',
  component: ProblemSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProblemSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Problem Statement',
    },
    paragraphTitle: 'Users face challenges with current workflows',
    paragraph: 'Users face challenges with current workflows',
    cite: {
      text: 'This is the core problem we need to solve',
      source: 'Research findings',
    },
    cards: [
      { variant: 'insight', title: 'Issue 1', description: 'Details about first issue' },
      { variant: 'insight', title: 'Issue 2', description: 'Details about second issue' },
      { variant: 'insight', title: 'Issue 3', description: 'Details about third issue' },
    ],
  },
};
