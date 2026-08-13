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
    variant: {
      control: 'radio',
      options: ['default', 'light', 'inverted'],
      description: 'Tag variant',
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

export const Light: Story = {
  args: {
    variant: 'light',
    text: '2022 – 2025',
  },
};

export const Inverted: Story = {
  args: {
    variant: 'inverted',
    text: 'UI/UX',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#060c17' }}>
      <Tag {...args} />
    </div>
  ),
};

export const LongText: Story = {
  args: {
    text: 'Very Long Tag Text',
  },
};
