import type { Meta, StoryObj } from '@storybook/react';
import { HomeHero } from './HomeHero';
import { homeContent } from '../../data';

const meta = {
  title: 'Pages/Home/Sections/Hero',
  component: HomeHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: homeContent.hero,
  },
};