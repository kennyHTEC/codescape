import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSections } from '../hooks/useSections';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { CodeBlock } from './CodeBlock';

interface ConceptDetailScreenProps {
  sectionId: string;
  conceptId: string;
}

export function ConceptDetailScreen({ sectionId, conceptId }: ConceptDetailScreenProps) {
  const { getConceptById } = useSections();
  const { colors } = useTheme();

  const concept = getConceptById(sectionId, conceptId);

  if (!concept) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.emptyText, { color: colors.text.primary }]}>Concept not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{concept.title}</Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>{concept.content}</Text>
      <CodeBlock code={concept.codeExample} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: typography.title.fontSize,
    lineHeight: typography.title.lineHeight,
    fontWeight: typography.title.fontWeight,
  },
  description: {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
  },
});
