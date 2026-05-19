import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { getConcept } from '../../src/data';
import { colors } from '../../src/theme/colors';

export default function ConceptScreen() {
  const { section, concept } = useLocalSearchParams<{ section: string; concept: string }>();
  const conceptData = section && concept ? getConcept(section, concept) : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{conceptData?.title ?? 'Concept not found'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
