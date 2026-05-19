import { Appearance, Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { ThemeProvider, useTheme } from './useTheme';

jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('dark');

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
  });
});
