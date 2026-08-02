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
      { variant: 'number', number: 1, title: '18 days to onboard' },
      { variant: 'number', number: 2, title: '5 systems used' },
      { variant: 'number', number: 3, title: '3 departments involved' },
    ],
  },
};
