import type { Meta, StoryObj } from '@storybook/react';
import { ReflectionRows } from './ReflectionRows';

const meta = {
  title: 'Molecules/ReflectionRows',
  component: ReflectionRows,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Header text',
    },
    items: {
      control: 'object',
      description: 'Array of list items',
    },
  },
} satisfies Meta<typeof ReflectionRows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'Header',
    items: [
      'Item one',
      'Item two',
      'Item three',
      'Item four',
    ],
  },
};

export const Example: Story = {
  args: {
    header: 'Единственный дизайнер проекта, отвечал за:',
    items: [
      'Исследование процессов',
      'Проектирование интерфейсов',
      'Защиту решений перед бизнесом',
      'Сопровождение разработки',
    ],
  },
};

export const ShortList: Story = {
  args: {
    header: 'Key Responsibilities',
    items: [
      'Product strategy',
      'Design direction',
    ],
  },
};

export const LongList: Story = {
  args: {
    header: 'Project Contributions',
    items: [
      'User research and analysis',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Design system creation',
      'Developer collaboration',
      'Quality assurance',
    ],
  },
};
