import type { Meta, StoryObj } from '@storybook/react';
import { ResultsSection } from './ResultsSection';

const meta = {
  title: 'Organisms/ResultsSection',
  component: ResultsSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ResultsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Results' },
    results: [
      { size: 'L', title: 'Result 1', description: 'Achievement details' },
      { size: 'L', title: 'Result 2', description: 'Achievement details' },
      { size: 'L', title: 'Result 3', description: 'Achievement details' },
      { size: 'L', title: 'Result 4', description: 'Achievement details' },
      { size: 'L', title: 'Result 5', description: 'Achievement details' },
    ],
  },
};
