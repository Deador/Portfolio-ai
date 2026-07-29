import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    titleProps: {
      control: 'object',
      description: 'Title component props',
    },
    rows: {
      control: 'object',
      description: 'Array of 4 row items with label and value',
    },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultImage = (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #e2e4e7 0%, #d9dade 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#787878',
      fontSize: '16px',
    }}
  >
    Image Placeholder (1216px × 794px)
  </div>
);

const defaultRows = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Timeline', value: '6 months' },
  { label: 'Tools', value: 'Figma, React' },
  { label: 'Status', value: 'Completed' },
];

export const Default: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Hero Section Title',
    },
    image: defaultImage,
    rows: defaultRows,
  },
};

export const WithLongTitle: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'This is a longer title for the hero section that demonstrates text wrapping',
    },
    image: defaultImage,
    rows: defaultRows,
  },
};

export const CustomRows: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Project Overview',
    },
    image: defaultImage,
    rows: [
      { label: 'Team', value: 'Design + Engineering' },
      { label: 'Phase', value: 'MVP' },
      { label: 'Impact', value: '40% faster development' },
      { label: 'Launch', value: 'Q1 2024' },
    ],
  },
};

export const MinimalContent: Story = {
  args: {
    titleProps: {
      size: 'M',
      children: 'Minimal Hero',
    },
    image: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f0f0f0',
        }}
      />
    ),
    rows: [
      { label: 'Item', value: 'One' },
      { label: 'Item', value: 'Two' },
      { label: 'Item', value: 'Three' },
      { label: 'Item', value: 'Four' },
    ],
  },
};
