import type { Meta, StoryObj } from '@storybook/react';
import { PersonaCard } from './PersonaCard';

const meta = {
  title: 'Molecules/PersonaCard',
  component: PersonaCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Persona title or name',
    },
    description: {
      control: 'text',
      description: 'Persona description',
    },
    tagText: {
      control: 'text',
      description: 'Tag text shown in top-right',
    },
  },
} satisfies Meta<typeof PersonaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    tagText: 'Tag',
  },
};

export const Designer: Story = {
  args: {
    title: 'Sarah Chen',
    description: 'UX/UI Designer focused on creating delightful user experiences through thoughtful design.',
    tagText: 'Design',
  },
};

export const Developer: Story = {
  args: {
    title: 'Marcus Rodriguez',
    description:
      'Senior Frontend Engineer specializing in React and design systems implementation across large-scale applications.',
    tagText: 'Engineering',
  },
};

export const ProductManager: Story = {
  args: {
    title: 'Emily Thompson',
    description: 'Product Manager with expertise in scaling platforms and leading cross-functional teams to success.',
    tagText: 'Product',
  },
};
