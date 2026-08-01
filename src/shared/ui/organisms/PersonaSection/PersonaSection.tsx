import React from 'react';
import styles from './PersonaSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { PersonaCard, PersonaCardProps } from '../../molecules/PersonaCard/PersonaCard';

interface PersonaSectionProps {
  titleProps?: TitleProps;
  personas?: Array<Omit<PersonaCardProps, 'className'>>;
  className?: string;
}

export const PersonaSection: React.FC<PersonaSectionProps> = ({
  titleProps = { size: 'M', children: 'Personas' },
  personas = [
    { title: 'Persona 1', description: 'Description' },
    { title: 'Persona 2', description: 'Description' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.personaSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.cardsRow}>
          {personas.map((p, i) => (
            <PersonaCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { PersonaSectionProps };
