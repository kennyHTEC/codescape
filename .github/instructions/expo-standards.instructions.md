---
applyTo: "app/**,src/**"
---
# Expo + Expo Router Standards

## Expo Router Version
- This project uses Expo Router v3 — do not use v1/v2 patterns
- File-based routing only — never use React Navigation directly
- Never install `@react-navigation/native` manually — Expo Router wraps it

## File-Based Routing Conventions
```
app/
  index.tsx              → root route "/"
  _layout.tsx            → root layout
  (groups)/              → route groups (no URL segment)
    _layout.tsx          → layout for the group
    screen.tsx           → route within group
  [param].tsx            → dynamic segment
  [param]/
    [nested].tsx         → nested dynamic segment
```

- Use route groups `(name)/` to share layouts without affecting the URL
- Prefix private files with `_` (e.g. `_layout.tsx`) — they are not routes

## Navigation — Always Use Expo Router Hooks
```typescript
// ✅ correct
import { useRouter, useLocalSearchParams, Link } from 'expo-router';

const router = useRouter();
router.push('/javascript');
router.push({ pathname: '/[section]/[concept]', params: { section: 'javascript', concept: 'inheritance' } });

const { section, concept } = useLocalSearchParams<{ section: string; concept: string }>();

// ❌ wrong
import { useNavigation } from '@react-navigation/native';
navigation.navigate('Concept', { id: 'inheritance' });
```

## Layouts
- Every route group must have a `_layout.tsx`
- Use `<Slot />` to render child routes inside a layout
- Use `<Stack />` only when you need a stack navigator with header
- Never put UI logic directly in layout files — extract to components

```typescript
// ✅ correct layout
import { Slot } from 'expo-router';
import { SidebarLayout } from '@/components/layout/SidebarLayout';

export default function AppLayout() {
  return (
    <SidebarLayout>
      <Slot />
    </SidebarLayout>
  );
}
```

## Links
- Use `<Link>` for declarative navigation — prefer it over `router.push` in JSX
- Always pass `href` as a typed route object for dynamic routes

```typescript
// ✅ correct
import { Link } from 'expo-router';

<Link href={{ pathname: '/[section]', params: { section: 'javascript' } }}>
  JavaScript
</Link>

// ❌ wrong
<TouchableOpacity onPress={() => navigation.navigate('Section')}>
```

## app.json Configuration
- `scheme` must be defined for deep linking
- `plugins` array must include `expo-router`
- `web.bundler` must be `metro`

```json
{
  "expo": {
    "scheme": "codescape",
    "plugins": ["expo-router"],
    "web": { "bundler": "metro" }
  }
}
```

## Expo APIs
- Use `expo-font` for custom fonts — load in the root `_layout.tsx` with `useFonts`
- Use `expo-constants` for app config values — never hardcode app name/version
- Use `expo-splash-screen` in root layout to control splash visibility
- Never use `AsyncStorage` directly — use `@react-native-async-storage/async-storage`

## What NOT to Do
- ❌ Never use `createStackNavigator` or `createBottomTabNavigator` directly
- ❌ Never use `NavigationContainer` — Expo Router handles it
- ❌ Never use `require()` for navigation — use typed `href` objects
- ❌ Never put business logic in `app/` files — only routing and layout
- ❌ Never import from `expo-router/src` — only from `expo-router`