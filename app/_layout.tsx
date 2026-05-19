import { Slot } from 'expo-router';

import { AppShell } from '../src/components/layout/AppShell';
import { ThemeProvider } from '../src/hooks/useTheme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppShell>
        <Slot />
      </AppShell>
    </ThemeProvider>
  );
}
