import type { Meta, StoryObj } from '@storybook/react';
import { ContextSection } from './ContextSection';

const meta = {
  title: 'Organisms/ContextSection',
  component: ContextSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Context' },
    image: <div style={{ width: '100%', height: '100%', background: '#e2e4e7' }} />,
    rows: [
      { title: 'Context 1', description: 'Details' },
      { title: 'Context 2', description: 'Details' },
      { title: 'Context 3', description: 'Details' },
      { title: 'Context 4', description: 'Details' },
    ],
    card: { variant: 'risk', label: 'System approach', title: 'Key Insight', description: 'Important finding' },
  },
};
