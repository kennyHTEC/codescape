import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function WelcomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        <Text style={[styles.eyebrow, { color: colors.accent.primary }]}>Welcome to CodeScape</Text>
        <Text style={[styles.headline, { color: colors.text.primary }]}>Build real coding intuition, one concept at a time.</Text>
        <Text style={[styles.copy, { color: colors.text.secondary }]}>
          Pick a section from the sidebar and dive into sharp explanations, clean examples, and practical ideas you can apply right away.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
  },
  content: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    gap: spacing.sm,
  },
  eyebrow: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  headline: {
    fontSize: typography.display.fontSize,
    lineHeight: typography.display.lineHeight,
    fontWeight: typography.display.fontWeight,
    textAlign: 'left',
  },
  copy: {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
    textAlign: 'left',
    marginTop: spacing.xs,
  },
});
