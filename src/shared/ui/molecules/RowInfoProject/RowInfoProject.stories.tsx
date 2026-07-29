import type { Meta, StoryObj } from '@storybook/react';
import { RowInfoProject } from './RowInfoProject';

const meta = {
  title: 'Molecules/RowInfoProject',
  component: RowInfoProject,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label/key for the row',
    },
    value: {
      control: 'text',
      description: 'Value/content for the row',
    },
  },
} satisfies Meta<typeof RowInfoProject>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    value: 'Value',
  },
};

export const Role: Story = {
  args: {
    label: 'Role',
    value: 'Product Designer & Design Systems Lead',
  },
};

export const Timeline: Story = {
  args: {
    label: 'Timeline',
    value: '6 months, 2024',
  },
};

export const Tools: Story = {
  args: {
    label: 'Tools',
    value: 'Figma, React, TypeScript',
  },
};

export const Status: Story = {
  args: {
    label: 'Status',
    value: 'Completed',
  },
};

export const Impact: Story = {
  args: {
    label: 'Impact',
    value: 'Improved team velocity by 40%',
  },
};
