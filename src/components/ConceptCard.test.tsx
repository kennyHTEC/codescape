import { render } from '@testing-library/react-native';

import { ThemeProvider } from '../hooks/useTheme';
import { ConceptCard } from './ConceptCard';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const concept = {
  id: 'inheritance',
  title: 'Inheritance',
  description: 'Inheritance lets one class extend another with shared behavior.',
  content: 'Detailed content',
  codeExample: 'class Dog extends Animal {}',
  tryItCode: 'const dog = new Dog();',
};

describe('ConceptCard', () => {
  describe('rendering', () => {
    it('renders title and description', () => {
      const { getByText } = render(
        <ThemeProvider>
          <ConceptCard concept={concept} sectionId="javascript" />
        </ThemeProvider>,
      );

      expect(getByText('Inheritance')).toBeVisible();
      expect(getByText('Inheritance lets one class extend another with shared behavior.')).toBeVisible();
    });

    it('renders Explore button', () => {
      const { getByRole } = render(
        <ThemeProvider>
          <ConceptCard concept={concept} sectionId="javascript" />
        </ThemeProvider>,
      );

      expect(getByRole('button', { name: 'Explore Inheritance' })).toBeVisible();
    });
  });
});
