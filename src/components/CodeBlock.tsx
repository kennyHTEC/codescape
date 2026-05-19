import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface CodeBlockProps {
  code: string;
}

const KEYWORD_REGEX = /(class|const|return|extends|new)/g;

export function CodeBlock({ code }: CodeBlockProps) {
  const { colors } = useTheme();
  const lines = code.split('\n');

  return (
    <View style={[styles.container, { backgroundColor: colors.code.background, borderColor: colors.border.default }]}>
      {lines.map((line, index) => {
        const parts = line.split(KEYWORD_REGEX);

        return (
          <Text key={`${line}-${index}`} style={[styles.line, { color: colors.code.text }]}>
            {parts.map((part, partIndex) => {
              const isKeyword = /^(class|const|return|extends|new)$/.test(part);

              return (
                <Text key={`${part}-${partIndex}`} style={{ color: isKeyword ? colors.code.keyword : colors.code.text }}>
                  {part}
                </Text>
              );
            })}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  line: {
    ...typography.code,
    fontFamily: 'monospace',
  },
});
