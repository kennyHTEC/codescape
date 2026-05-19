import { render } from '@testing-library/react-native';

import { ThemeProvider } from '../hooks/useTheme';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  describe('rendering', () => {
    it('renders provided code content', () => {
      const { getByText } = render(
        <ThemeProvider>
          <CodeBlock code={'class Dog extends Animal {}'} />
        </ThemeProvider>,
      );

      expect(getByText('class')).toBeVisible();
      expect(getByText('extends')).toBeVisible();
    });
  });
});
