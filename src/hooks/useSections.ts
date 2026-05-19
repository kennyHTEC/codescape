import { useMemo } from 'react';

import { getSections } from '../data';
import type { Section } from '../data/types';

export function useSections(): Section[] {
  return useMemo(() => getSections(), []);
}
