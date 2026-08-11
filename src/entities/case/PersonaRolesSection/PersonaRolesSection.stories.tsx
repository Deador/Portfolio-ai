import type { Meta, StoryObj } from '@storybook/react';
import { PersonaRolesSection } from './PersonaRolesSection';

const meta = {
  title: 'Case/PersonaRolesSection',
  component: PersonaRolesSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonaRolesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PersonaRolesSection>
      <div style={{ width: '100%', padding: '32px', background: '#fff', borderRadius: '20px' }}>PersonaSection</div>
      <div style={{ width: '100%', padding: '32px', background: '#fff', borderRadius: '20px' }}>RolesTable</div>
    </PersonaRolesSection>
  ),
};
