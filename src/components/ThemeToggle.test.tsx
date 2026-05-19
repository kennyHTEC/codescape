import { render, userEvent } from '@testing-library/react-native';

import { ThemeProvider } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  describe('interactions', () => {
    it('toggles between light and dark label when pressed', async () => {
      const user = userEvent.setup();
      const { getByLabelText, getByText } = render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>,
      );

      const button = getByLabelText('Toggle app theme');
      const beforeText = getByText(/Theme:/).props.children.join('');

      await user.press(button);

      const afterText = getByText(/Theme:/).props.children.join('');
      expect(beforeText).not.toEqual(afterText);
    });
  });
});
