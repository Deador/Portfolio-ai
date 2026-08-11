import type { Meta, StoryObj } from '@storybook/react';
import { RolesTable } from './RolesTable';

const meta = {
  title: 'Molecules/RolesTable',
  component: RolesTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Block title',
    },
    description: {
      control: 'text',
      description: 'Block description',
    },
  },
} satisfies Meta<typeof RolesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Roles in the Platform',
    description: 'Different departments worked in one product, so roles had to be adapted.',
    rows: [
      {
        role: 'Managers',
        label: 'Version 1.0',
        tasks: '• Checking requests\n• Selecting equipment\n• Client support',
      },
      {
        role: 'Security',
        label: 'Version 2.0',
        tasks: '• Checking legal data\n• Approval decisions',
      },
      {
        role: 'Engineers',
        label: 'Version 2.0',
        tasks: '• Installation\n• Terminal fleet management',
      },
    ],
  },
};

export const WithSharedRoles: Story = {
  args: {
    title: 'Платформа поддерживала роли для обоих подразделений',
    description: 'Разные подразделения работали в одном продукте, поэтому роли и возможности пришлось адаптировать под разные сценарии работы.',
    headRole: 'Подразделение',
    headTasks: 'Возможности',
    rows: [
      {
        role: 'Брокеры',
        label: 'Оператор',
        tasks: '• Отображение статуса клиента рядом с чатом\n• Сквозная история обращений',
      },
      {
        role: 'Контакт-центр',
        label: 'Оператор',
        tasks: '• Минималистичный интерфейс под высокую нагрузку\n• Настройка очередей',
      },
      {
        role: 'Супервизор',
        label: 'Оба подразделения',
        shared: true,
        tasks: '• Дашборд с метриками отдела\n• Ручное распределение обращений',
      },
      {
        role: 'Админ',
        label: 'Оба подразделения',
        shared: true,
        tasks: '• Настройка таймеров, тем, прав доступа',
      },
    ],
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Roles in the Platform',
    description:
      'Different departments worked in one product, therefore roles and capabilities had to be adapted to different work scenarios.',
    rows: [
      {
        role: 'Managers',
        label: 'Version 1.0',
        tasks:
          '• Checking requests\n• Selecting equipment\n• Client support\n• Tracking request progress',
      },
      {
        role: 'Security',
        label: 'Version 2.0',
        tasks: '• Checking legal data\n• Approval decisions',
      },
      {
        role: 'Engineers',
        label: 'Version 2.0',
        tasks: '• Installation\n• Client support\n• Terminal fleet management',
      },
    ],
  },
};
