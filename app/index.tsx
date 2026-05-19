import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../src/hooks/useTheme';
import { useSections } from '../src/hooks/useSections';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const sections = useSections();
  const defaultSection = sections[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Build your coding intuition.</Text>
      <Text style={[styles.copy, { color: colors.text.secondary }]}>Discover concise programming concepts and explore practical examples in seconds.</Text>
      {defaultSection ? (
        <Link href={{ pathname: '/[section]', params: { section: defaultSection.id } }} asChild>
          <Pressable accessibilityLabel="Start exploring concepts" accessibilityRole="button" style={[styles.button, { backgroundColor: colors.accent.primary }]}>
            <Text style={[styles.buttonText, { color: colors.background.secondary }]}>Start Exploring</Text>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  copy: {
    ...typography.body,
    maxWidth: 560,
    marginBottom: spacing.xl,
  },
  button: {
    minHeight: 44,
    minWidth: 44,
    alignSelf: 'flex-start',
    borderRadius: spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
  },
});
