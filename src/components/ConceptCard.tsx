import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Concept } from '../data/types';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ConceptCardProps {
  concept: Concept;
  onExplore: (conceptId: string) => void;
}

export function ConceptCard({ concept, onExplore }: ConceptCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border.default }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{concept.title}</Text>
      <Text numberOfLines={2} style={[styles.description, { color: colors.text.secondary }]}>
        {concept.description}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Explore ${concept.title}`}
        onPress={() => onExplore(concept.id)}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.accent.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.text.inverse }]}>Explore</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.md,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.subtitle.fontSize,
    lineHeight: typography.subtitle.lineHeight,
    fontWeight: typography.subtitle.fontWeight,
  },
  description: {
    fontSize: typography.bodySmall.fontSize,
    lineHeight: typography.bodySmall.lineHeight,
    fontWeight: typography.bodySmall.fontWeight,
  },
  button: {
    minHeight: 44,
    minWidth: 44,
    alignSelf: 'flex-start',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  buttonText: {
    fontSize: typography.button.fontSize,
    lineHeight: typography.button.lineHeight,
    fontWeight: typography.button.fontWeight,
  },
});
