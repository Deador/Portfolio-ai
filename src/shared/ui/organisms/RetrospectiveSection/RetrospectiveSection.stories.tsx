import type { Meta, StoryObj } from '@storybook/react';
import { RetrospectiveSection } from './RetrospectiveSection';

const meta = {
  title: 'Organisms/RetrospectiveSection',
  component: RetrospectiveSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RetrospectiveSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'What We Learned' },
    cards: [
      { variant: 'lesson', number: 1, title: 'Learning 1', description: 'Key insight' },
      { variant: 'lesson', number: 2, title: 'Learning 2', description: 'Key insight' },
      { variant: 'lesson', number: 3, title: 'Learning 3', description: 'Key insight' },
    ],
  },
};
