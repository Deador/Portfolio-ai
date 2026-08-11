import type { Meta, StoryObj } from '@storybook/react';
import { QuoteElement } from './QuoteElement';

const meta = {
  title: 'Atoms/QuoteElement',
  component: QuoteElement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Author or source name',
    },
    quote: {
      control: 'text',
      description: 'Quote text content',
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'end'],
      description: 'Author block alignment (avatar + name)',
    },
  },
} satisfies Meta<typeof QuoteElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Name',
    quote: 'Text',
  },
};

export const Example: Story = {
  args: {
    name: 'John Smith',
    quote: 'This is an excellent design system that helped us scale our product faster.',
  },
};

export const AlignedEnd: Story = {
  args: {
    name: 'John Smith',
    quote: 'Author block aligned to the right, matching the "Мой ответ" block.',
    align: 'end',
  },
};

export const LongQuote: Story = {
  args: {
    name: 'Jane Doe',
    quote:
      'The Design System approach transformed how we build features. It improved consistency across all platforms and reduced development time significantly.',
  },
};
