import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function ThemeToggle() {
  const { mode, colors, toggleTheme } = useTheme();

  return (
    <Pressable
      accessibilityLabel="Toggle app theme"
      accessibilityRole="button"
      onPress={toggleTheme}
      style={styles.button}
    >
      <Text style={[styles.text, { color: colors.text.secondary }]}>Theme: {mode === 'dark' ? 'Dark' : 'Light'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    ...typography.caption,
  },
});
