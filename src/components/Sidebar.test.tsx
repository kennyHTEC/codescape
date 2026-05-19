import { render } from '@testing-library/react-native';

import { ThemeProvider } from '../hooks/useTheme';
import { Sidebar } from './Sidebar';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const sections = [
  {
    id: 'javascript',
    title: 'JavaScript',
    color: '#F59E0B',
    concepts: [],
  },
];

describe('Sidebar', () => {
  describe('rendering', () => {
    it('renders logo and section links', () => {
      const { getByLabelText, getByText } = render(
        <ThemeProvider>
          <Sidebar sections={sections} />
        </ThemeProvider>,
      );

      expect(getByLabelText('Go to welcome screen')).toBeVisible();
      expect(getByText('JavaScript')).toBeVisible();
    });
  });
});
