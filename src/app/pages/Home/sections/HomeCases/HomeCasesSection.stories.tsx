import type { Meta, StoryObj } from '@storybook/react';
import { HomeCasesSection } from './HomeCasesSection';
import { homeContent } from '../../data';

const meta = {
  title: 'Pages/Home/Sections/Cases',
  component: HomeCasesSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeCasesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Кейсы',
    items: homeContent.cases,
  },
};