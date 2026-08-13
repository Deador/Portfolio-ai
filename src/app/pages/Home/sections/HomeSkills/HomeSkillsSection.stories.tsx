import type { Meta, StoryObj } from '@storybook/react';
import { HomeSkillsSection } from './HomeSkillsSection';
import { homeContent } from '../../data';

const meta = {
  title: 'Pages/Home/Sections/Skills',
  component: HomeSkillsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeSkillsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Чем могу помочь вашему бизнесу?',
    description:
      'Работал в продуктовых командах двух банков. Развивал дизайн-систему для веба и Android, адаптировал её под сложные B2B-продукты (чат-платформа, эквайринг). Защищал решения перед бизнесом и стейкхолдерами.',
    items: homeContent.skills,
    onScrollTop: () => {},
  },
};