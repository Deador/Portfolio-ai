import type { Meta, StoryObj } from '@storybook/react';
import { DecisionSection } from './DecisionSection';

const meta = {
  title: 'Organisms/DecisionSection',
  component: DecisionSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DecisionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Decisions' },
    quotes: [
      { leftName: 'Person 1', leftQuote: 'Decision 1', rightName: 'Person 2', rightQuote: 'Decision 2' },
      { leftName: 'Person 3', leftQuote: 'Decision 3', rightName: 'Person 4', rightQuote: 'Decision 4' },
      { leftName: 'Person 5', leftQuote: 'Decision 5', rightName: 'Person 6', rightQuote: 'Decision 6' },
    ],
  },
};
