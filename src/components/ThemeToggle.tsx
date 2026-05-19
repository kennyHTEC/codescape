import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function ThemeToggle() {
  const { theme, colors, toggleTheme } = useTheme();
  const nextThemeLabel = theme === 'dark' ? 'light' : 'dark';

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={`Switch to ${nextThemeLabel} mode`}
      accessibilityHint="Toggles the app color theme"
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.background.card,
          borderColor: colors.border.default,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.indicator,
          { backgroundColor: theme === 'dark' ? colors.accent.primary : colors.accent.secondary },
        ]}
      />
      <Text style={[styles.text, { color: colors.text.primary }]}>Theme: {theme}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  text: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: typography.bodySmall.fontWeight,
    textTransform: 'capitalize',
  },
});
