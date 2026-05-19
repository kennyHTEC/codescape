import { fireEvent, render, screen } from '@testing-library/react-native';

import type { Concept } from '../data/types';
import { ThemeProvider } from '../hooks/useTheme';
import { ConceptCard } from './ConceptCard';

const mockConcept: Concept = {
  id: 'inheritance',
  title: 'Inheritance',
  description:
    'Inheritance lets one class reuse behavior from another class while keeping specialized behavior in child classes.',
  content: 'Long explanation',
  codeExample: 'class Animal {}',
  tryItCode: 'class Dog extends Animal {}',
};

describe('ConceptCard', () => {
  describe('rendering', () => {
    it('renders title and description', () => {
      render(
        <ThemeProvider>
          <ConceptCard concept={mockConcept} onExplore={jest.fn()} />
        </ThemeProvider>
      );

      expect(screen.getByText('Inheritance')).toBeVisible();
      expect(screen.getByText(mockConcept.description)).toBeVisible();
      expect(screen.getByRole('button', { name: /explore inheritance/i })).toBeVisible();
    });
  });

  describe('interactions', () => {
    it('calls onExplore when Explore button is pressed', () => {
      const onExplore = jest.fn();

      render(
        <ThemeProvider>
          <ConceptCard concept={mockConcept} onExplore={onExplore} />
        </ThemeProvider>
      );

      fireEvent.press(screen.getByRole('button', { name: /explore inheritance/i }));
      expect(onExplore).toHaveBeenCalledWith('inheritance');
    });
  });

  describe('edge cases', () => {
    it('truncates long descriptions to two lines', () => {
      render(
        <ThemeProvider>
          <ConceptCard concept={mockConcept} onExplore={jest.fn()} />
        </ThemeProvider>
      );

      const description = screen.getByText(mockConcept.description);
      expect(description.props.numberOfLines).toBe(2);
    });
  });
});
