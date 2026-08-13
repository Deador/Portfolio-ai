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
      options: ['link', 'filled', 'outline'],
      description: 'Button variant',
    },
    shape: {
      control: 'radio',
      options: ['rounded', 'pill'],
      description: 'Button shape',
    },
    inverted: {
      control: 'boolean',
      description: 'Light palette for dark surfaces',
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

export const Outline: Story = {
  args: {
    type: 'outline',
    text: 'Label',
  },
};

export const OutlineInverted: Story = {
  args: {
    type: 'outline',
    inverted: true,
    text: 'Смотреть кейсы',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#060c17' }}>
      <Button {...args} />
    </div>
  ),
};

export const PillInverted: Story = {
  args: {
    type: 'outline',
    shape: 'pill',
    inverted: true,
    text: 'Смотреть кейсы',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#060c17' }}>
      <Button {...args} />
    </div>
  ),
};

export const FilledInverted: Story = {
  args: {
    type: 'filled',
    inverted: true,
    text: 'Резюме',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#060c17' }}>
      <Button {...args} />
    </div>
  ),
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
