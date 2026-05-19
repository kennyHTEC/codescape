import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { Section } from '../data/types';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  sections: Section[];
  activeSectionId?: string;
  onSelectSection: (sectionId: string) => void;
  onGoWelcome: () => void;
}

export function Sidebar({ sections, activeSectionId, onSelectSection, onGoWelcome }: SidebarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.sidebar, borderColor: colors.border.subtle }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go to welcome screen"
        onPress={onGoWelcome}
        style={({ pressed }) => [styles.logoButton, { opacity: pressed ? 0.8 : 1 }]}
      >
        <View style={[styles.logoMark, { backgroundColor: colors.accent.primary }]} />
        <Text style={[styles.logoText, { color: colors.text.primary }]}>CodeScape</Text>
      </Pressable>

      <View style={styles.sectionList}>
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;

          return (
            <Pressable
              key={section.id}
              accessibilityRole="button"
              accessibilityLabel={`Open ${section.title} section`}
              onPress={() => onSelectSection(section.id)}
              style={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: isActive ? colors.background.card : 'transparent',
                  borderColor: isActive ? colors.border.default : 'transparent',
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View style={[styles.dot, { backgroundColor: section.color }]} />
              <Text style={[styles.sectionText, { color: isActive ? colors.text.primary : colors.text.secondary }]}>
                {section.title}
              </Text>
            </Pressable>
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
    width: 220,
    borderRightWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  logoButton: {
    minHeight: 44,
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  logoMark: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  logoText: {
    fontSize: typography.subtitle.fontSize,
    lineHeight: typography.subtitle.lineHeight,
    fontWeight: typography.subtitle.fontWeight,
  },
  sectionList: {
    flex: 1,
    gap: spacing.xs,
  },
  sectionItem: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionText: {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: '600',
  },
  footer: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
  },
});
