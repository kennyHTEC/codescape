import { useLocalSearchParams } from 'expo-router';

import { ConceptListScreen } from '../../../src/components/ConceptListScreen';

export default function SectionScreen() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  return <ConceptListScreen sectionId={section ?? ''} />;
}
