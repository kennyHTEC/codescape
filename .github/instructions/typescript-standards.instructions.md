---
applyTo: "**/*.ts,**/*.tsx"
---
# TypeScript Standards

## Strict Mode — Always On
- `strict: true` in tsconfig.json — never disable it
- No `any` — if you don't know the type, use `unknown` and narrow it
- No `// @ts-ignore` or `// @ts-expect-error` unless absolutely justified with a comment explaining why
- No implicit `any` in function parameters

## Types vs Interfaces
- Use `interface` for object shapes that represent entities (props, data models)
- Use `type` for unions, intersections, primitives, and utility types
- Never use `{}` as a type — use `Record<string, unknown>` or a specific interface

```typescript
// ✅ correct
interface ConceptCardProps {
  concept: Concept;
  onPress: (id: string) => void;
}

type Theme = 'dark' | 'light';

// ❌ wrong
const handler = (data: any) => {}
type Props = {}
```

## Null and Undefined
- Prefer `undefined` over `null` for optional values
- Always handle the undefined case — no non-null assertions (`!`) unless truly impossible to be null
- Use optional chaining `?.` and nullish coalescing `??` over manual null checks

```typescript
// ✅ correct
const title = concept?.title ?? 'Untitled'

// ❌ wrong
const title = concept!.title
```

## Props and Interfaces
- Every component must have an explicit named interface for its props
- Never use inline type literals for props
- Mark optional props with `?`
- Never use `React.FC` — use explicit return type `JSX.Element` or none

```typescript
// ✅ correct
interface ConceptCardProps {
  title: string;
  description: string;
  onExplore: () => void;
  isActive?: boolean;
}

export function ConceptCard({ title, description, onExplore, isActive }: ConceptCardProps) {}

// ❌ wrong
export const ConceptCard: React.FC<{ title: string }> = ({ title }) => {}
```

## Functions
- Prefer named functions over arrow functions for components
- Use arrow functions for callbacks and hooks internals
- Always type return values of hooks and utility functions explicitly

```typescript
// ✅ correct
export function useTheme(): ThemeContextValue {}
const handlePress = (id: string): void => {}

// ❌ wrong
export const useTheme = () => {}
```

## Enums
- Avoid TypeScript `enum` — use `as const` objects instead
- They compile better and work with Expo's bundler without issues

```typescript
// ✅ correct
export const SectionIds = {
  JAVASCRIPT: 'javascript',
  PYTHON: 'python',
} as const;

export type SectionId = typeof SectionIds[keyof typeof SectionIds];

// ❌ wrong
enum SectionId { JAVASCRIPT = 'javascript' }
```

## Imports
- Use absolute imports from `src/` — configure path aliases in tsconfig.json
- Group imports: React → React Native → Expo → internal — separated by blank lines
- Never import types with `import` — use `import type`

```typescript
// ✅ correct
import { useState } from 'react';
import { View, Text } from 'react-native';

import type { Concept } from '@/data/types';
import { useTheme } from '@/hooks/useTheme';
```