import conceptsBySection from './concepts.json';
import sectionsData from './sections.json';
import { Concept, Section } from '../types/concepts';

export const sections = sectionsData as Section[];

const concepts = conceptsBySection as Record<string, Concept[]>;

export function getConcept(sectionId: string, conceptId: string): Concept | undefined {
  return concepts[sectionId]?.find((concept) => concept.id === conceptId);
}
