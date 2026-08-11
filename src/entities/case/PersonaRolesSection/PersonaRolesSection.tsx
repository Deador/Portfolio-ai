import React, { ReactNode } from 'react';
import styles from './PersonaRolesSection.module.scss';

interface PersonaRolesSectionProps {
  children?: ReactNode;
}

/**
 * PersonaRolesSection Component
 *
 * Composite wrapper for the "uf" group (Persona + RolesTable).
 * Keeps the tight vertical rhythm (48px gap) between the two sections.
 */
export const PersonaRolesSection: React.FC<PersonaRolesSectionProps> = ({ children }) => {
  return <div className={styles.personaRolesSection}>{children}</div>;
};

export type { PersonaRolesSectionProps };
