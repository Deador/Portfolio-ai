import type { Meta, StoryObj } from '@storybook/react';
import { ContextSectionRow } from './ContextSectionRow';

const meta = {
  title: 'Molecules/ContextSectionRow',
  component: ContextSectionRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Row title',
    },
    description: {
      control: 'text',
      description: 'Row description',
    },
  },
} satisfies Meta<typeof ContextSectionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
  },
};

export const Example: Story = {
  args: {
    title: 'Design Strategy',
    description: 'Defined the overall design approach and visual direction for the product',
  },
};

export const AnotherExample: Story = {
  args: {
    title: 'User Research',
    description: 'Conducted interviews and usability testing with target users',
  },
};
