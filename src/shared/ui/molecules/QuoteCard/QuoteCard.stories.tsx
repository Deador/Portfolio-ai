import type { Meta, StoryObj } from '@storybook/react';
import { QuoteCard } from './QuoteCard';

const meta = {
  title: 'Molecules/QuoteCard',
  component: QuoteCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    leftName: {
      control: 'text',
      description: 'Left quote author name',
    },
    leftQuote: {
      control: 'text',
      description: 'Left quote text',
    },
    rightName: {
      control: 'text',
      description: 'Right quote author name',
    },
    rightQuote: {
      control: 'text',
      description: 'Right quote text',
    },
  },
} satisfies Meta<typeof QuoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftName: 'Name',
    leftQuote: 'Text',
    rightName: 'Name',
    rightQuote: 'Text',
  },
};

export const WithTestimonials: Story = {
  args: {
    leftName: 'Alex Johnson',
    leftQuote: 'The design system transformed our workflow. We delivered features 3x faster.',
    rightName: 'Maria Garcia',
    rightQuote: 'Consistency across platforms became effortless with this approach.',
  },
};

export const LongerQuotes: Story = {
  args: {
    leftName: 'Product Lead',
    leftQuote:
      'Implementing this design system was one of the best decisions we made. It provided a single source of truth for all our design decisions.',
    rightName: 'Engineering Manager',
    rightQuote:
      'Our development team appreciated having clear, documented components. It reduced back-and-forth with design significantly.',
  },
};
