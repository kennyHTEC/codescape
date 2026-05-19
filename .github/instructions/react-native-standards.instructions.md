---
applyTo: "src/components/**,app/**"
---
# React Native Standards

## Lists — Always Use the Right Component
- Use `FlatList` for any list with more than 10 items or dynamic data
- Use `ScrollView` only for static, short content
- Never use `.map()` inside a `ScrollView` for concept lists or section lists
- Always provide `keyExtractor` in `FlatList`

```typescript
// ✅ correct
<FlatList
  data={concepts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ConceptCard concept={item} />}
/>

// ❌ wrong
<ScrollView>
  {concepts.map(c => <ConceptCard key={c.id} concept={c} />)}
</ScrollView>
```

## Performance
- Wrap components in `React.memo()` when they receive stable props and re-render often
- Use `useCallback` for functions passed as props to memoized components
- Use `useMemo` for expensive computations — not for simple values
- Never create objects or arrays inline in JSX props

```typescript
// ✅ correct
const handleExplore = useCallback(() => {
  router.push({ pathname: '/[section]/[concept]', params: { section, concept: id } });
}, [section, id]);

// ❌ wrong
<ConceptCard style={{ margin: 8 }} onPress={() => router.push(...)} />
```

## Styling
- Always use `StyleSheet.create()` — never inline style objects
- Never hardcode colors, spacing, or font sizes — always use theme tokens
- Use `flex` for layout — avoid fixed dimensions unless absolutely necessary
- Platform-specific styles use `Platform.select()` or `.ios.tsx` / `.android.tsx` file extensions

```typescript
// ✅ correct
const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.md,
    backgroundColor: theme.background.card,
    padding: spacing.md,
  }
});

// ❌ wrong
<View style={{ borderRadius: 12, backgroundColor: '#1E1E1E', padding: 16 }} />
```

## Touch Targets
- Minimum touch target size: 44x44px — enforce with `minHeight` and `minWidth`
- Use `Pressable` over `TouchableOpacity` for new components — better control over pressed states
- Always provide `accessibilityLabel` and `accessibilityRole` on interactive elements

```typescript
// ✅ correct
<Pressable
  style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
  onPress={onExplore}
  accessibilityLabel={`Explore ${title}`}
  accessibilityRole="button"
>
```

## Images and Assets
- Use `expo-image` over React Native's `Image` — better performance and caching
- Always define `width` and `height` for images — never let them be undefined

## State Management
- Local UI state: `useState`
- Shared state across components: React Context (see `useTheme` pattern)
- No Redux, no Zustand — overkill for this project
- Keep state as close to where it's used as possible

## Error Boundaries
- Wrap screen-level components in an error boundary
- Always handle empty states: no data, loading, error — never render nothing silently

## What NOT to Do
- ❌ Never use `View` as a button — use `Pressable` or `TouchableOpacity`
- ❌ Never use `console.log` in production code — use a flag or remove before PR
- ❌ Never mutate state directly
- ❌ Never use `useEffect` for derived state — compute it inline or with `useMemo`