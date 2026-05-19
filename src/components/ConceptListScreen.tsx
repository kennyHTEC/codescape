import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useSections } from '../hooks/useSections';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ConceptCard } from './ConceptCard';

interface ConceptListScreenProps {
  sectionId: string;
}

export function ConceptListScreen({ sectionId }: ConceptListScreenProps) {
  const router = useRouter();
  const { getSectionById } = useSections();
  const { colors } = useTheme();

  const section = getSectionById(sectionId);

  const handleExplore = (conceptId: string): void => {
    router.push({ pathname: '/[section]/[concept]', params: { section: sectionId, concept: conceptId } });
  };

  if (!section) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.emptyText, { color: colors.text.primary }]}>Section not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[styles.header, { color: colors.text.primary }]}>{section.title} Concepts</Text>
      <FlatList
        data={section.concepts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <ConceptCard concept={item} onExplore={handleExplore} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    fontSize: typography.title.fontSize,
    lineHeight: typography.title.lineHeight,
    fontWeight: typography.title.fontWeight,
    marginBottom: spacing.md,
  },
  listContent: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  row: {
    gap: spacing.sm,
  },
  gridItem: {
    flex: 1,
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
