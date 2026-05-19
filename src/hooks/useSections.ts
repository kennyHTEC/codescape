import { getConceptById, getSectionById, getSections } from '../data';
import type { Concept, Section } from '../data/types';

export interface UseSectionsResult {
  sections: Section[];
  getSectionById: (id: string) => Section | undefined;
  getConceptById: (sectionId: string, conceptId: string) => Concept | undefined;
}

export function useSections(): UseSectionsResult {
  return {
    sections: getSections(),
    getSectionById,
    getConceptById,
  };
}
