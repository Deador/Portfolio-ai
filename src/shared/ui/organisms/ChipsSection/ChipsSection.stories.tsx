import type { Meta, StoryObj } from '@storybook/react';
import { ChipsSection } from './ChipsSection';

const meta = {
  title: 'Organisms/ChipsSection',
  component: ChipsSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Приоритеты контактного центра',
      description: 'В отличие от брокеров, сотрудники контактного центра работали с массовым потоком обращений.',
    },
    chips: ['Высокая скорость ответа', 'Управление очередями', 'Автоматические таймеры'],
  },
};
