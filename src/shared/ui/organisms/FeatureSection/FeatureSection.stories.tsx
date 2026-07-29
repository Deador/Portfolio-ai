import type { Meta, StoryObj } from '@storybook/react';
import { FeatureSection } from './FeatureSection';

const meta = {
  title: 'Organisms/FeatureSection',
  component: FeatureSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Key Feature' },
    image: <div style={{ width: '100%', height: '100%', background: '#e2e4e7' }} />,
    metrics: [
      { type: 'short', title: 'Metric 1', description: 'Value' },
      { type: 'short', title: 'Metric 2', description: 'Value' },
      { type: 'short', title: 'Metric 3', description: 'Value' },
    ],
  },
};
