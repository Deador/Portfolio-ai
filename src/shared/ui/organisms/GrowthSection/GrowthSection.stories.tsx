import type { Meta, StoryObj } from '@storybook/react';
import { GrowthSection } from './GrowthSection';

const meta = {
  title: 'Organisms/GrowthSection',
  component: GrowthSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof GrowthSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const placeholder = (height: number, label: string) => (
  <div
    style={{
      width: '100%',
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecedee',
      borderRadius: 16,
      color: '#787878',
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: {
    titleProps: { size: 'M', children: 'Platform Growth' },
    items: [
      {
        image: placeholder(414, 'Image 01'),
        persona: {
          tagText: 'Engineers',
          title: 'Change History',
          description: 'Made the process transparent',
        },
      },
      {
        image: placeholder(763, 'Image 02'),
        persona: {
          tagText: 'Managers',
          title: 'Working with Documents',
          description: 'Removed switching between systems',
        },
      },
      {
        image: placeholder(451, 'Image 03'),
        persona: {
          tagText: 'New Scenario',
          title: 'Terminal Replacement',
          description: 'Shortened the path for the client',
        },
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    titleProps: { size: 'M', children: 'Platform Growth' },
    items: [
      {
        image: placeholder(414, 'Image 01'),
        persona: {
          tagText: 'Engineers',
          title: 'Change History',
          description: 'Engineers got access to all changes and could find delay causes themselves.',
        },
      },
    ],
  },
};
