import { fireEvent, render, screen } from '@testing-library/react-native';

import type { Section } from '../data/types';
import { ThemeProvider } from '../hooks/useTheme';
import { Sidebar } from './Sidebar';

const sections: Section[] = [
  {
    id: 'javascript',
    title: 'JavaScript',
    color: '#F7DF1E',
    concepts: [],
  },
];

describe('Sidebar', () => {
  describe('rendering', () => {
    it('renders logo and section item', () => {
      render(
        <ThemeProvider>
          <Sidebar sections={sections} activeSectionId="javascript" onSelectSection={jest.fn()} onGoWelcome={jest.fn()} />
        </ThemeProvider>
      );

      expect(screen.getByRole('button', { name: /go to welcome screen/i })).toBeVisible();
      expect(screen.getByRole('button', { name: /open javascript section/i })).toBeVisible();
      expect(screen.getByRole('switch', { name: /switch to light mode/i })).toBeVisible();
    });
  });

  describe('interactions', () => {
    it('calls handlers on logo and section press', () => {
      const onSelectSection = jest.fn();
      const onGoWelcome = jest.fn();

      render(
        <ThemeProvider>
          <Sidebar
            sections={sections}
            activeSectionId="javascript"
            onSelectSection={onSelectSection}
            onGoWelcome={onGoWelcome}
          />
        </ThemeProvider>
      );

      fireEvent.press(screen.getByRole('button', { name: /go to welcome screen/i }));
      fireEvent.press(screen.getByRole('button', { name: /open javascript section/i }));

      expect(onGoWelcome).toHaveBeenCalledTimes(1);
      expect(onSelectSection).toHaveBeenCalledWith('javascript');
    });
  });
});
