import type { Meta, StoryObj } from '@storybook/react';
import { DecisionSection } from './DecisionSection';

const meta = {
  title: 'Organisms/DecisionSection',
  component: DecisionSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DecisionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Decisions' },
    paragraph: 'Early validation helped find problems before development.',
    tag: '19 corridor tests',
    image: <div style={{ width: 1216, height: 768, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ecedee', borderRadius: 16 }}>Image</div>,
    noteTitle: 'What this gave the team',
    noteText: 'Feedback was received before development started.',
  },
};
