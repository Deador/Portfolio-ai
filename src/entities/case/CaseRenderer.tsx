import React, { ReactNode } from 'react';
import styles from './CaseRenderer.module.scss';
import { HeroSection } from '../../shared/ui/organisms/HeroSection/HeroSection';
import { ProblemSection } from '../../shared/ui/organisms/ProblemSection/ProblemSection';
import { GoalsSection } from '../../shared/ui/organisms/GoalsSection/GoalsSection';
import { ContextSection } from '../../shared/ui/organisms/ContextSection/ContextSection';
import { PersonaSection } from '../../shared/ui/organisms/PersonaSection/PersonaSection';
import { FeatureSection } from '../../shared/ui/organisms/FeatureSection/FeatureSection';
import { DecisionSection } from '../../shared/ui/organisms/DecisionSection/DecisionSection';
import { RetrospectiveSection } from '../../shared/ui/organisms/RetrospectiveSection/RetrospectiveSection';
import { ResultsSection } from '../../shared/ui/organisms/ResultsSection/ResultsSection';
import { ReflectionSection } from '../../shared/ui/organisms/ReflectionSection/ReflectionSection';
import { GrowthSection } from '../../shared/ui/organisms/GrowthSection/GrowthSection';
import { RolesTable } from '../../shared/ui/molecules/RolesTable/RolesTable';
import { CommonCard } from '../../shared/ui/molecules/CommonCard/CommonCard';
import { MVPGrowthSection } from './MVPGrowthSection';
import { resolveContentAssets } from '../../lib/content-parser/resolveContent';
import { CaseDocument, CaseSection } from './types';

type SectionProps = Record<string, unknown>;

const sectionComponents: Record<string, React.ComponentType<SectionProps>> = {
  HeroSection: HeroSection as React.ComponentType<SectionProps>,
  ProblemSection: ProblemSection as React.ComponentType<SectionProps>,
  GoalsSection: GoalsSection as React.ComponentType<SectionProps>,
  ContextSection: ContextSection as React.ComponentType<SectionProps>,
  PersonaSection: PersonaSection as React.ComponentType<SectionProps>,
  FeatureSection: FeatureSection as React.ComponentType<SectionProps>,
  DecisionSection: DecisionSection as React.ComponentType<SectionProps>,
  RetrospectiveSection: RetrospectiveSection as React.ComponentType<SectionProps>,
  ResultsSection: ResultsSection as React.ComponentType<SectionProps>,
  ReflectionSection: ReflectionSection as React.ComponentType<SectionProps>,
  GrowthSection: GrowthSection as React.ComponentType<SectionProps>,
  RolesTable: RolesTable as React.ComponentType<SectionProps>,
  CommonCard: CommonCard as unknown as React.ComponentType<SectionProps>,
  MVPGrowthSection: MVPGrowthSection as React.ComponentType<SectionProps>,
};

const SUPPORTED_SCHEMA_VERSION = 2;

function renderSection(section: CaseSection, slug: string, key: string | number): ReactNode {
  const Component = sectionComponents[section.component];

  if (!Component) {
    console.warn(`[CaseRenderer] Unknown component "${section.component}"`);
    return null;
  }

  if (section.blocks) {
    return (
      <div className={styles.section} key={key}>
        <Component>{section.blocks.map((block, index) => renderSection(block, slug, index))}</Component>
      </div>
    );
  }

  const content = resolveContentAssets(section.content ?? {}, slug) as SectionProps;

  return (
    <div className={styles.section} key={key}>
      <Component {...content} />
    </div>
  );
}

export const CaseRenderer: React.FC<{ caseData: CaseDocument }> = ({ caseData }) => {
  const { schemaVersion, slug, sections } = caseData;

  if (schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
    console.warn(
      `[CaseRenderer] Unsupported schemaVersion ${schemaVersion}. Expected ${SUPPORTED_SCHEMA_VERSION}.`
    );
  }

  return (
    <main className={styles.caseStudyPage}>
      <div className={styles.pageContainer}>
        {sections.map((section, index) => renderSection(section, slug, index))}
      </div>
    </main>
  );
};
