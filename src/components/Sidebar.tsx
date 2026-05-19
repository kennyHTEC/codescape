import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import type { Section } from '../data/types';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  sections: Section[];
  activeSectionId?: string;
}

export function Sidebar({ sections, activeSectionId }: SidebarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary, borderRightColor: colors.border.subtle }]}>
      <View style={styles.header}>
        <Link href="/" asChild>
          <Pressable
            accessibilityLabel="Go to welcome screen"
            accessibilityRole="button"
            style={styles.logoButton}
          >
            <Text style={[styles.logo, { color: colors.text.primary }]}>CodeScape</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.list}>
        {sections.map((section) => {
          const isActive = activeSectionId === section.id;

          return (
            <Link
              key={section.id}
              href={{ pathname: '/[section]', params: { section: section.id } }}
              asChild
            >
              <Pressable
                accessibilityLabel={`Open ${section.title} section`}
                accessibilityRole="button"
                style={[
                  styles.sectionButton,
                  {
                    backgroundColor: isActive ? colors.accent.secondary : colors.background.secondary,
                    borderColor: colors.border.default,
                  },
                ]}
              >
                <Text style={[styles.sectionText, { color: colors.text.primary }]}>{section.title}</Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      <View style={styles.footer}>
        <ThemeToggle />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRightWidth: 1,
    minWidth: 220,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.heading,
  },
  logoButton: {
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  list: {
    flex: 1,
    gap: spacing.sm,
  },
  sectionButton: {
    borderWidth: 1,
    borderRadius: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  sectionText: {
    ...typography.body,
  },
  footer: {
    marginTop: spacing.md,
  },
});
