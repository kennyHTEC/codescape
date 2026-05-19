import { fireEvent, render, screen } from '@testing-library/react-native';

import { ThemeProvider } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  describe('rendering', () => {
    it('starts in dark mode and offers light mode switch', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      expect(screen.getByText('Theme: dark')).toBeVisible();
      expect(screen.getByRole('switch', { name: /switch to light mode/i })).toBeVisible();
    });
  });

  describe('interactions', () => {
    it('toggles to light mode on press', () => {

      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      fireEvent.press(screen.getByRole('switch', { name: /switch to light mode/i }));

      expect(screen.getByText('Theme: light')).toBeVisible();
      expect(screen.getByRole('switch', { name: /switch to dark mode/i })).toBeVisible();
    });
  });
});
