import type { Meta, StoryObj } from '@storybook/react';
import { HomeCaseCard } from './HomeCaseCard';
import { homeContent } from '../../data';

const meta = {
  title: 'Pages/Home/Sections/CaseCard',
  component: HomeCaseCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeCaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLink: Story = {
  args: {
    item: homeContent.cases[0],
  },
};

export const ComingSoon: Story = {
  args: {
    item: homeContent.cases[2],
  },
};