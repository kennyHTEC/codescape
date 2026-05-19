import { render, screen } from '@testing-library/react-native';

import { ThemeProvider } from '../hooks/useTheme';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  describe('rendering', () => {
    it('renders code lines', () => {
      const code = "class Animal {\n  speak() {\n    return 'sound';\n  }\n}";

      render(
        <ThemeProvider>
          <CodeBlock code={code} />
        </ThemeProvider>
      );

      expect(screen.getByText('class Animal {')).toBeVisible();
      expect(screen.getByText("    return 'sound';")).toBeVisible();
    });
  });

  describe('edge cases', () => {
    it('renders comment lines without crashing', () => {
      const code = "// explain\nconst value = 'ok';";

      render(
        <ThemeProvider>
          <CodeBlock code={code} />
        </ThemeProvider>
      );

      expect(screen.getByText('// explain')).toBeVisible();
      expect(screen.getByText("const value = 'ok';")).toBeVisible();
    });
  });
});
