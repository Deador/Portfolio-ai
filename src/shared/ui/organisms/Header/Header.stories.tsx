import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    button1Text: {
      control: 'text',
      description: 'First navigation button text',
    },
    button2Text: {
      control: 'text',
      description: 'Second navigation button text',
    },
    button3Text: {
      control: 'text',
      description: 'Third navigation button text',
    },
    showButton3: {
      control: 'boolean',
      description: 'Show third button',
    },
    button4Text: {
      control: 'text',
      description: 'Fourth navigation button text',
    },
    showButton4: {
      control: 'boolean',
      description: 'Show fourth button',
    },
    ctaText: {
      control: 'text',
      description: 'CTA button text',
    },
    onCtaClick: {
      action: 'CTA clicked',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    button1Text: 'Label',
    button2Text: 'Label',
    ctaText: 'Label',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <Header {...args} />
    </div>
  ),
};

export const WithLogo: Story = {
  args: {
    button1Text: 'Work',
    button2Text: 'About',
    ctaText: 'Contact',
    logo: (
      <svg
        width="40"
        height="48"
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="48" fill="#1e1e1e" rx="4" />
        <text
          x="20"
          y="32"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
        >
          A
        </text>
      </svg>
    ),
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <Header {...args} />
    </div>
  ),
};

export const AllButtons: Story = {
  args: {
    button1Text: 'Work',
    button2Text: 'About',
    button3Text: 'Blog',
    showButton3: true,
    button4Text: 'CV',
    showButton4: true,
    ctaText: 'Contact',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <Header {...args} />
    </div>
  ),
};

export const WithClickHandler: Story = {
  args: {
    button1Text: 'Portfolio',
    button2Text: 'About',
    ctaText: 'Get In Touch',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <Header
        {...args}
        onCtaClick={() => alert('CTA clicked!')}
      />
    </div>
  ),
};

export const Inverted: Story = {
  args: {
    theme: 'inverted',
    button1Text: 'Телеграмм',
    button2Text: 'Прочие контакты',
    ctaText: 'Резюме',
  },
  render: (args) => (
    <div style={{ padding: '20px', background: '#060c17' }}>
      <Header {...args} />
    </div>
  ),
};
