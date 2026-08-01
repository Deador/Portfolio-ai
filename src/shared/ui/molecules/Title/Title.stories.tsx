import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
  title: 'Molecules/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['L', 'M'],
      description: 'Title size variant',
    },
    children: {
      control: 'text',
      description: 'Title text content',
    },
    description: {
      control: 'text',
      description: 'Optional description text below the title',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML heading level',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeL: Story = {
  args: {
    size: 'L',
    children: 'Large Title (H1, 800px)',
    as: 'h1',
  },
};

export const SizeM: Story = {
  args: {
    size: 'M',
    children: 'Medium Title (H2, 720px)',
    as: 'h2',
  },
};

export const H1Large: Story = {
  args: {
    size: 'L',
    children: 'Main Page Title with Semantic HTML',
    as: 'h1',
  },
};

export const H2Medium: Story = {
  args: {
    size: 'M',
    children: 'Section Heading',
    as: 'h2',
  },
};

export const LongText: Story = {
  args: {
    size: 'L',
    children: 'A Very Long Title That Spans Multiple Lines to Show Text Wrapping Behavior',
    as: 'h1',
  },
};

export const WithDescription: Story = {
  args: {
    size: 'M',
    children: 'Section Heading',
    description: 'Supporting description that explains the context of the section below the title.',
    as: 'h2',
  },
};
