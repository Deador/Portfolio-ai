import type { Meta, StoryObj } from '@storybook/react';
import { ReflectionSection } from './ReflectionSection';

const meta = {
  title: 'Organisms/ReflectionSection',
  component: ReflectionSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ReflectionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Main Conclusion',
    paragraph: 'The most expensive problems were not in the interface but in the process.',
    header: 'My Role and Responsibilities',
    items: [
      'Responsibility one',
      'Responsibility two',
      'Responsibility three',
      'Responsibility four',
    ],
  },
};
