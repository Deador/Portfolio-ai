import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CaseStudyAcquiring from './CaseStudyAcquiring';

/**
 * CaseStudyAcquiring
 * 
 * Complete case study page demonstrating:
 * - Product Design expertise
 * - Design System implementation
 * - B2B platform development
 * - AI-assisted development workflow
 * 
 * Case: "Система обработки заявок на эквайринг"
 * (B2B Acquiring Request Processing Platform)
 */
const meta = {
  title: 'Pages/CaseStudyAcquiring',
  component: CaseStudyAcquiring,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CaseStudyAcquiring>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full Case Study Page
 * 
 * Displays the complete case study with all sections:
 * 1. Hero Section - Introduction with key metrics
 * 2. Problem Section - Problem statement and user quote
 * 3. Goals Section - Business goals and priorities
 * 4. Context Section - User research and pie chart
 * 5. Persona Section - Interview findings
 * 6. Feature Section - Key features and metrics
 * 7. Decision Section - Research validation approach
 * 8. Persona Section - Role-based platform adaptation
 * 9. Context Section - Platform architecture
 * 10. Context Section - Expansion to new departments
 * 11. Retrospective Section - Key learnings
 * 12. Results Section - Impact metrics
 * 13. Reflection Section - Key takeaways
 */
export const FullPage: Story = {
  render: () => <CaseStudyAcquiring />,
  parameters: {
    docs: {
      description: {
        story: 'The complete case study page showcasing all sections of the acquiring platform case study.',
      },
    },
  },
};

/**
 * Responsive Preview
 * 
 * The page is responsive and works well on various screen sizes.
 */
export const ResponsivePreview: Story = {
  render: () => <CaseStudyAcquiring />,
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};
