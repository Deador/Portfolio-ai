import type { Meta, StoryObj } from '@storybook/react';
import { PersonaSection } from './PersonaSection';

const meta = {
  title: 'Organisms/PersonaSection',
  component: PersonaSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Team Members' },
    personas: [
      { title: 'Designer', description: 'Responsible for UX/UI' },
      { title: 'Developer', description: 'Responsible for implementation' },
    ],
  },
};
