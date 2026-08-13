import type { Meta, StoryObj } from '@storybook/react';
import { HomeScrollTopButton } from './HomeScrollTopButton';

const meta = {
  title: 'Pages/Home/Sections/ScrollTopButton',
  component: HomeScrollTopButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeScrollTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Наверх',
  },
};