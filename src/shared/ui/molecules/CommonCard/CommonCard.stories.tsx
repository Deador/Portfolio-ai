import type { Meta, StoryObj } from '@storybook/react';
import { CommonCard } from './CommonCard';

/**
 * CommonCard Component
 *
 * Versatile card component supporting 5 variants for different content types.
 * All styling uses design tokens. Production-ready implementation.
 */
const meta: Meta<typeof CommonCard> = {
  title: 'Molecules/CommonCard',
  component: CommonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['insight', 'risk', 'callout', 'lesson', 'number'],
      description: 'Card variant determines styling and layout',
    },
    title: {
      control: 'text',
      description: 'Main content - accepts text or rich formatting',
    },
    description: {
      control: 'text',
      description: 'Secondary content (optional, not used for number variant)',
    },
    number: {
      control: 'text',
      description: 'Badge number for number variant',
    },
    label: {
      control: 'text',
      description: 'Eyebrow label rendered above the title (risk/callout variants)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for override',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommonCard>;

// ========================================
// INSIGHT CARD STORIES
// ========================================

/**
 * Insight Card - Simple white card for key findings
 * Used for: highlights, summaries, key findings
 */
export const Insight: Story = {
  args: {
    variant: 'insight',
    title: 'Key insight',
    description: 'This is an important finding from the research phase',
  },
};

export const InsightWithLongContent: Story = {
  args: {
    variant: 'insight',
    title: 'Research finding',
    description:
      'User research revealed that 78% of participants preferred the simplified workflow, leading to a redesign of the core navigation system.',
  },
};

// ========================================
// RISK CARD STORIES
// ========================================

/**
 * Risk Card - White card with warning icon for risks/alerts
 * Used for: warnings, risks, important alerts
 */
export const Risk: Story = {
  args: {
    variant: 'risk',
    label: 'System approach',
    title: 'Risk identified',
    description: 'Potential issue requiring mitigation strategy',
  },
};

export const RiskWithLongContent: Story = {
  args: {
    variant: 'risk',
    label: 'System approach',
    title: 'Performance risk',
    description:
      'Current implementation may cause performance degradation on mobile devices with poor connectivity. Consider implementing progressive loading strategy.',
  },
};

// ========================================
// CALLOUT CARD STORIES
// ========================================

/**
 * Callout Card - White card with left border accent
 * Used for: important notes, tips, critical information
 * Note: Callout has two description lines (description prop + fixed "Text")
 */
export const Callout: Story = {
  args: {
    variant: 'callout',
    title: 'Important note',
    description: 'This is a highlighted callout with important information',
  },
};

export const CalloutWithLongContent: Story = {
  args: {
    variant: 'callout',
    title: 'Implementation guideline',
    description:
      'All components must be built using design tokens from the shared token system.',
  },
};

// ========================================
// LESSON CARD STORIES
// ========================================

/**
 * Lesson Card - Dark card for numbered lessons/steps
 * Used for: lesson steps, numbered items, dark-themed content
 */
export const Lesson: Story = {
  args: {
    variant: 'lesson',
    title: 'Key lesson learned',
    description: 'What we discovered from this process',
    number: '01',
  },
};

export const LessonSecondStep: Story = {
  args: {
    variant: 'lesson',
    title: 'Iterative refinement',
    description: 'Multiple rounds of user testing led to the final design',
    number: '02',
  },
};

export const LessonLongContent: Story = {
  args: {
    variant: 'lesson',
    title: 'Design system maturity',
    description:
      'Investing in a comprehensive design system early in the project reduced development time and improved consistency across all pages.',
    number: '03',
  },
};

// ========================================
// NUMBER CARD STORIES
// ========================================

/**
 * Number Card - White card with absolute-positioned number badge
 * Used for: metrics, statistics, key numbers
 */
export const Number: Story = {
  args: {
    variant: 'number',
    title: 'User satisfaction',
    number: '92',
  },
};

export const NumberWithDifferentValues: Story = {
  args: {
    variant: 'number',
    title: 'Conversion rate improvement',
    number: '45',
  },
};

export const NumberLargeValue: Story = {
  args: {
    variant: 'number',
    title: 'Baseline users tested',
    number: '1200',
  },
};

// ========================================
// SHOWCASE STORIES
// ========================================

/**
 * All variants side by side for quick comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '32px',
      }}
    >
      <CommonCard
        variant="insight"
        title="Key insight"
        description="This is an important finding"
      />
      <CommonCard
        variant="risk"
        title="Risk identified"
        description="Potential issue requiring attention"
      />
      <CommonCard
        variant="callout"
        title="Important note"
        description="This is a highlighted callout"
      />
      <CommonCard
        variant="lesson"
        title="Key lesson"
        description="What we learned"
        number="01"
      />
      <CommonCard
        variant="number"
        title="Metric value"
        number="42"
      />
    </div>
  ),
};

/**
 * Responsive layout demonstration
 */
export const ResponsiveLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '24px',
      }}
    >
      <CommonCard
        variant="insight"
        title="Finding 1"
        description="Research insight"
      />
      <CommonCard
        variant="insight"
        title="Finding 2"
        description="Research insight"
      />
      <CommonCard
        variant="insight"
        title="Finding 3"
        description="Research insight"
      />
    </div>
  ),
};

/**
 * Dark background context demonstration
 */
export const DarkBackgroundContext: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      style={{
        backgroundColor: '#1f1f1f',
        padding: '48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
      }}
    >
      <CommonCard
        variant="insight"
        title="Key insight"
        description="This is an important finding"
      />
      <CommonCard
        variant="risk"
        title="Risk identified"
        description="Potential issue requiring attention"
      />
    </div>
  ),
};

/**
 * With custom CSS class override
 */
export const WithCustomClass: Story = {
  args: {
    variant: 'insight',
    title: 'Custom styled card',
    description: 'Applied custom CSS class for override',
    className: 'custom-card',
  },
};
