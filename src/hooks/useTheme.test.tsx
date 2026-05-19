import { act, renderHook } from '@testing-library/react-native';

import { ThemeProvider, useTheme } from './useTheme';

describe('useTheme', () => {
  describe('rendering', () => {
    it('returns dark mode by default', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe('dark');
    });
  });

  describe('interactions', () => {
    it('toggles theme mode', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });
  });

  describe('edge cases', () => {
    it('throws when used without provider', () => {
      expect(() => renderHook(() => useTheme())).toThrow(/ThemeProviderMissingError/i);
    });
  });
});
