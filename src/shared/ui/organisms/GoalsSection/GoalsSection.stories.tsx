import type { Meta, StoryObj } from '@storybook/react';
import { GoalsSection } from './GoalsSection';

const meta = {
  title: 'Organisms/GoalsSection',
  component: GoalsSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof GoalsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Project Goals' },
    cards: [
      { variant: 'insight', title: 'Goal 1', description: 'Improve user engagement' },
      { variant: 'insight', title: 'Goal 2', description: 'Reduce friction' },
      { variant: 'insight', title: 'Goal 3', description: 'Increase retention' },
    ],
  },
};
