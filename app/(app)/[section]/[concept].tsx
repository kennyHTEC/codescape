import { useLocalSearchParams } from 'expo-router';

import { ConceptDetailScreen } from '../../../src/components/ConceptDetailScreen';

export default function ConceptScreen() {
  const { section, concept } = useLocalSearchParams<{ section?: string; concept?: string }>();

  return <ConceptDetailScreen sectionId={section ?? ''} conceptId={concept ?? ''} />;
}
