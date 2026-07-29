import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Tag text content',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Text',
  },
};

export const Example: Story = {
  args: {
    text: 'Design System',
  },
};

export const ShortText: Story = {
  args: {
    text: 'Tag',
  },
};

export const LongText: Story = {
  args: {
    text: 'Very Long Tag Text',
  },
};
