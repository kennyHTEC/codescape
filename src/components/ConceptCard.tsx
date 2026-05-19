import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Concept } from '../data/types';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ConceptCardProps {
  concept: Concept;
  sectionId: string;
}

export function ConceptCard({ concept, sectionId }: ConceptCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border.default }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{concept.title}</Text>
      <Text numberOfLines={2} style={[styles.description, { color: colors.text.secondary }]}>
        {concept.description}
      </Text>
      <Link href={{ pathname: '/[section]/[concept]', params: { section: sectionId, concept: concept.id } }} asChild>
        <Pressable
          accessibilityLabel={`Explore ${concept.title}`}
          accessibilityRole="button"
          style={[styles.button, { backgroundColor: colors.accent.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.background.secondary }]}>Explore</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.md,
    borderWidth: 1,
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  title: {
    ...typography.heading,
  },
  description: {
    ...typography.caption,
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    borderRadius: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
  },
});
