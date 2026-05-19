import { Appearance, Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { ThemeProvider, useTheme } from './useTheme';

function TestComponent() {
  const { mode, toggleTheme } = useTheme();

  return (
    <>
      <Text>{mode}</Text>
      <Text accessibilityRole="button" onPress={toggleTheme}>
        toggle
      </Text>
    </>
  );
}

describe('useTheme', () => {
  beforeEach(() => {
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('dark');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('interactions', () => {
    it('reads system dark mode and toggles it', () => {
      const { getByText } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText('dark')).toBeVisible();
      fireEvent.press(getByText('toggle'));
      expect(getByText('light')).toBeVisible();
    });

    it('reads system light mode and toggles it to dark', () => {
      jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('light');
      const { getByText } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText('light')).toBeVisible();
      fireEvent.press(getByText('toggle'));
      expect(getByText('dark')).toBeVisible();
    });
  });

  describe('edge cases', () => {
    it('throws when used outside provider', () => {
      expect(() => render(<TestComponent />)).toThrow('useTheme must be used within ThemeProvider');
    });
  });
});
