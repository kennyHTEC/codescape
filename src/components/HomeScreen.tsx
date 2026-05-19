import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { sections } from '../data';
import { colors } from '../theme/colors';

export function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <Pressable
          key={section.id}
          accessibilityRole="button"
          style={styles.card}
          onPress={() => router.push(`/${section.id}/${section.concepts[0]}`)}
        >
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.description}>{section.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
