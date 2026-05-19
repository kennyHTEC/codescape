import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CodeBlock } from '../../src/components/CodeBlock';
import { getConceptById } from '../../src/data';
import { useTheme } from '../../src/hooks/useTheme';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function ConceptScreen() {
  const { section, concept } = useLocalSearchParams<{ section: string; concept: string }>();
  const { colors } = useTheme();
  const conceptData = getConceptById(section, concept);

  if (!conceptData) {
    return (
      <View style={[styles.stateContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.stateText, { color: colors.text.primary }]}>Concept not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{conceptData.title}</Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>{conceptData.content}</Text>
      <CodeBlock code={conceptData.codeExample} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    ...typography.title,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
  },
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  stateText: {
    ...typography.heading,
  },
});
