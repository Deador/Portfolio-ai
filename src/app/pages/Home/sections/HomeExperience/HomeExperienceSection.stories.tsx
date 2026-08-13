import type { Meta, StoryObj } from '@storybook/react';
import { HomeExperienceSection } from './HomeExperienceSection';
import { homeContent } from '../../data';

const meta = {
  title: 'Pages/Home/Sections/Experience',
  component: HomeExperienceSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeExperienceSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Опыт',
    items: homeContent.experience,
  },
};