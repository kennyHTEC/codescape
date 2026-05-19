import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ConceptCard } from '../../src/components/ConceptCard';
import { getSectionById } from '../../src/data';
import { useTheme } from '../../src/hooks/useTheme';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function SectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const { colors } = useTheme();
  const sectionData = getSectionById(section);

  if (!sectionData) {
    return (
      <View style={[styles.stateContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.stateText, { color: colors.text.primary }]}>Section not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{sectionData.title}</Text>
      <FlatList
        data={sectionData.concepts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ConceptCard concept={item} sectionId={sectionData.id} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.lg,
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
