import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['link', 'filled'],
      description: 'Button variant',
    },
    text: {
      control: 'text',
      description: 'Button text content',
    },
    htmlType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {
    type: 'link',
    text: 'Label',
  },
};

export const Filled: Story = {
  args: {
    type: 'filled',
    text: 'Label',
  },
};

export const LinkExample: Story = {
  args: {
    type: 'link',
    text: 'Learn More',
  },
};

export const FilledExample: Story = {
  args: {
    type: 'filled',
    text: 'Get Started',
  },
};

export const LinkHover: Story = {
  args: {
    type: 'link',
    text: 'Hover me',
  },
};

export const FilledHover: Story = {
  args: {
    type: 'filled',
    text: 'Click me',
  },
};
