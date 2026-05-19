import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

import { Sidebar } from '../Sidebar';
import { useSections } from '../../hooks/useSections';
import { useTheme } from '../../hooks/useTheme';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { section } = useLocalSearchParams<{ section?: string }>();
  const sections = useSections();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Sidebar activeSectionId={section} sections={sections} />
      <View style={styles.main}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  main: {
    flex: 1,
  },
});
