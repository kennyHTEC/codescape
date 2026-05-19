import javascriptSection from './javascript.json';

import type { Concept, Section } from './types';

const sections: Section[] = [javascriptSection as Section];

export function getSections(): Section[] {
  return sections;
}

export function getSectionById(id: string): Section | undefined {
  return sections.find((section) => section.id === id);
}

export function getConceptById(sectionId: string, conceptId: string): Concept | undefined {
  return getSectionById(sectionId)?.concepts.find((concept) => concept.id === conceptId);
}
