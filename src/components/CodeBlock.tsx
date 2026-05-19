import { useMemo } from 'react';
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
  const themedStyles = useMemo(() => createStyles(colors.code.keyword, colors.code.text), [colors.code.keyword, colors.code.text]);

  return (
    <View style={[styles.container, { backgroundColor: colors.code.background, borderColor: colors.border.default }]}>
      {lines.map((line, index) => {
        const parts = line.split(KEYWORD_REGEX);

        return (
          <Text key={index} style={[styles.line, themedStyles.line]}>
            {parts.map((part, partIndex) => {
              const isKeyword = /^(class|const|return|extends|new)$/.test(part);

              return (
                <Text key={partIndex} style={isKeyword ? themedStyles.keywordPart : themedStyles.defaultPart}>
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

function createStyles(keywordColor: string, textColor: string) {
  return StyleSheet.create({
    line: {
      color: textColor,
    },
    keywordPart: {
      color: keywordColor,
    },
    defaultPart: {
      color: textColor,
    },
  });
}
