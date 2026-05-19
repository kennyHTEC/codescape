export type Concept = {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  tryItCode: string;
};

export type Section = {
  id: string;
  title: string;
  description: string;
  concepts: string[];
};
