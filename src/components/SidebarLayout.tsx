import { Slot, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useSections } from '../hooks/useSections';
import { useTheme } from '../hooks/useTheme';
import { Sidebar } from './Sidebar';

export function SidebarLayout() {
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section?: string }>();
  const { sections } = useSections();
  const { colors } = useTheme();

  const handleSelectSection = (sectionId: string): void => {
    router.push({ pathname: '/[section]', params: { section: sectionId } });
  };

  const handleGoWelcome = (): void => {
    router.push('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Sidebar
        sections={sections}
        activeSectionId={section}
        onSelectSection={handleSelectSection}
        onGoWelcome={handleGoWelcome}
      />
      <View style={styles.main}>
        <Slot />
      </View>
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
