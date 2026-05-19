export interface Concept {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  tryItCode?: string;
}

export interface Section {
  id: string;
  title: string;
  color: string;
  concepts: Concept[];
}
