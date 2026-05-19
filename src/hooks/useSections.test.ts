import { renderHook } from '@testing-library/react-native';

import { useSections } from './useSections';

describe('useSections', () => {
  describe('rendering', () => {
    it('returns available sections', () => {
      const { result } = renderHook(() => useSections());

      expect(result.current.sections.length).toBe(1);
      expect(result.current.sections[0].id).toBe('javascript');
    });
  });

  describe('interactions', () => {
    it('returns concept by section and concept id', () => {
      const { result } = renderHook(() => useSections());
      const concept = result.current.getConceptById('javascript', 'inheritance');

      expect(concept?.title).toBe('Inheritance');
    });
  });

  describe('edge cases', () => {
    it('returns undefined for unknown section', () => {
      const { result } = renderHook(() => useSections());
      const section = result.current.getSectionById('unknown');

      expect(section).toBeUndefined();
    });
  });
});
