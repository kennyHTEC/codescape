---
applyTo: "**/*.test.tsx,**/*.test.ts,**/*.spec.ts,**/*.spec.tsx"
---
# Testing Standards

## Stack
- Jest + React Native Testing Library (`@testing-library/react-native`)
- `jest-expo` as the Jest preset
- Never use Enzyme, never test implementation details

## File Conventions
- Test file lives alongside the component: `ConceptCard.tsx` → `ConceptCard.test.tsx`
- Hook test file: `useTheme.ts` → `useTheme.test.ts`
- One test file per component or hook — no combined test files

## Structure — Always Follow This Pattern
```typescript
describe('ComponentName', () => {
  // 1. Renders correctly
  describe('rendering', () => {
    it('renders title and description', () => {})
    it('renders Explore button', () => {})
  });

  // 2. Interactions
  describe('interactions', () => {
    it('calls onExplore when Explore button is pressed', () => {})
  });

  // 3. Edge cases
  describe('edge cases', () => {
    it('truncates long descriptions', () => {})
    it('handles missing optional fields gracefully', () => {})
  });
});
```

## Queries — Priority Order
Use queries in this order (most accessible to least):
1. `getByRole` — preferred for interactive elements
2. `getByLabelText` — for inputs and labeled elements
3. `getByText` — for visible text content
4. `getByTestId` — last resort only, use `testID` prop sparingly

```typescript
// ✅ correct
const button = getByRole('button', { name: /explore/i });
const title = getByText('Inheritance');

// ❌ wrong
const button = getByTestId('explore-btn');
container.querySelector('.button');
```

## Mocking

### Navigation (Expo Router)
```typescript
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useLocalSearchParams: () => ({ section: 'javascript', concept: 'inheritance' }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));
```

### Data
```typescript
// Never import real JSON files in tests — always mock inline
const mockConcept: Concept = {
  id: 'inheritance',
  title: 'Inheritance',
  description: 'Short description for testing',
  content: 'Full content',
  codeExample: 'class Dog extends Animal {}',
};
```

### Context (Theme)
```typescript
// Wrap components that use ThemeContext in a test wrapper
const renderWithTheme = (ui: React.ReactElement, theme: Theme = 'dark') => {
  return render(
    <ThemeProvider initialTheme={theme}>
      {ui}
    </ThemeProvider>
  );
};
```

## Assertions
- Use `@testing-library/jest-native` matchers: `toBeVisible()`, `toBeDisabled()`, `toHaveTextContent()`
- Never assert on styles unless the style is critical for the feature (e.g. active state color)
- Use `userEvent` over `fireEvent` for user interactions — closer to real behavior

```typescript
// ✅ correct
expect(getByText('Inheritance')).toBeVisible();
await userEvent.press(getByRole('button', { name: /explore/i }));
expect(mockOnExplore).toHaveBeenCalledTimes(1);

// ❌ wrong
expect(component.props.style.backgroundColor).toBe('#6C63FF');
fireEvent.press(button);
```

## Coverage
- Minimum 80% coverage per file
- 100% coverage for data utility functions (`src/data/index.ts`)
- Don't chase coverage numbers — test behavior, not lines

## What NOT to Test
- ❌ Don't test styling (unless it's conditional logic like active/inactive states)
- ❌ Don't test third-party library internals
- ❌ Don't snapshot test large component trees — only small, stable UI atoms
- ❌ Don't test that React renders — test what the user sees and does