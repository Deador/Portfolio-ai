export interface CaseSection {
  component: string;
  figmaNode?: string;
  key?: string;
  content?: Record<string, unknown>;
  blocks?: CaseSection[];
}

export interface CaseDocument {
  schemaVersion: number;
  site: string;
  slug: string;
  meta?: {
    title?: string;
    description?: string;
  };
  sections: CaseSection[];
}
