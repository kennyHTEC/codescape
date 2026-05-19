import { renderHook } from '@testing-library/react-native';

import { useSections } from './useSections';

describe('useSections', () => {
  describe('rendering', () => {
    it('returns JavaScript section with two concepts', () => {
      const { result } = renderHook(() => useSections());

      expect(result.current).toHaveLength(1);
      expect(result.current[0]?.id).toBe('javascript');
      expect(result.current[0]?.concepts).toHaveLength(2);
    });
  });
});
