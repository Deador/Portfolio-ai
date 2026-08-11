import type { Meta, StoryObj } from '@storybook/react';
import { TextImageSection } from './TextImageSection';

const meta = {
  title: 'Organisms/TextImageSection',
  component: TextImageSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TextImageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Story block with image',
      description: 'Optional description under the title.',
    },
    image: <img src="https://placehold.co/1216x359?text=Image" alt="" style={{ width: '100%', display: 'block' }} />,
  },
};

export const WithHighlight: Story = {
  args: {
    titleProps: { size: 'M', children: 'Story block with highlight' },
    image: <img src="https://placehold.co/1216x752?text=Diagram" alt="" style={{ width: '100%', display: 'block' }} />,
    highlight: {
      title: 'Что изменилось',
      paragraphs: [
        'Первоначально обращение полностью исчезало из зоны видимости сотрудника.',
        'Я предложил сохранить возможность вернуть его в работу до автоматического закрытия.',
      ],
    },
  },
};

export const WithCards: Story = {
  args: {
    titleProps: { size: 'M', children: 'Story block with cards' },
    image: <img src="https://placehold.co/1216x359?text=Panel" alt="" style={{ width: '100%', display: 'block' }} />,
    cards: [
      { type: 'short', number: 1, title: 'Саммари вместо чтения всей переписки', description: 'Оператор видел суть обращения сразу после подключения к диалогу.' },
      { type: 'short', number: 2, title: 'Саммари не скрывало детали', description: 'При необходимости оператор мог открыть полный диалог и проверить контекст.' },
      { type: 'short', number: 3, title: 'Маршрутизация до подключения оператора', description: 'ИИ определял контекст обращения и помогал направить клиента.' },
    ],
  },
};
