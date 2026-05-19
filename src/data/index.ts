import javascript from './javascript.json';
import type { Concept, Section } from './types';

const sections: Section[] = [javascript as Section];

export function getSections(): Section[] {
  return sections;
}

export function getSectionById(id: string): Section | undefined {
  return sections.find((section) => section.id === id);
}

export function getConceptById(sectionId: string, conceptId: string): Concept | undefined {
  const section = getSectionById(sectionId);
  return section?.concepts.find((concept) => concept.id === conceptId);
}
