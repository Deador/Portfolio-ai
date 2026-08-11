import type { Meta, StoryObj } from '@storybook/react';
import { CaseRenderer } from './CaseRenderer';
import acquiringCase from '../../content/cases/acquiring/case.json';
import chatCase from '../../content/cases/chat/case.json';

const meta = {
  title: 'Case/CaseRenderer',
  component: CaseRenderer,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CaseRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Acquiring: Story = {
  args: {
    caseData: acquiringCase,
  },
};

export const Chat: Story = {
  args: {
    caseData: chatCase,
  },
};
