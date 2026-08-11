import type { Meta, StoryObj } from '@storybook/react';
import { QuoteSection } from './QuoteSection';

const meta = {
  title: 'Organisms/QuoteSection',
  component: QuoteSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof QuoteSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Не все требования заказчиков попадали в интерфейс',
      description: 'Моя задача была не только проектировать решения, но и объяснять, почему некоторые идеи создают новые проблемы для пользователей.',
    },
    cards: [
      {
        leftName: 'Руководители КЦ',
        leftQuote: 'Давайте покажем на дашборде время в каждом подстатусе для всех сотрудников.',
        rightName: 'Мой ответ',
        rightQuote: 'Это не про мониторинг в реальном времени. Оставим на дашборде основные статусы, а детали — в выгрузке отчёта.',
      },
      {
        leftName: 'Руководитель брокеров',
        leftQuote: 'Добавим в карточку клиента паспорт, счета, сделки и всю историю.',
        rightName: 'Мой ответ',
        rightQuote: 'Карточка в чате нужна для быстрого контекста, а не для полного досье клиента.',
      },
    ],
  },
};
