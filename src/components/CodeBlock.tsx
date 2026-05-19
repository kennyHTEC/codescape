import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface CodeBlockProps {
  code: string;
}

const keywords = new Set([
  'class',
  'extends',
  'return',
  'const',
  'new',
  'console.log',
  'super',
]);

function getTokenColor(token: string, colors: ReturnType<typeof useTheme>['colors']['code']): string {
  if (token.startsWith('//')) {
    return colors.comment;
  }

  if (token.startsWith("'") || token.endsWith("'") || token.startsWith('"') || token.endsWith('"')) {
    return colors.string;
  }

  if (keywords.has(token)) {
    return colors.keyword;
  }

  if (/^[a-zA-Z0-9_]+\(/.test(token)) {
    return colors.function;
  }

  return colors.plain;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const { colors } = useTheme();
  const lines = code.split('\n');

  return (
    <View style={[styles.container, { backgroundColor: colors.code.background, borderColor: colors.border.default }]}>
      {lines.map((line, lineIndex) => {
        const tokens = line.split(/(\s+)/);

        return (
          <Text key={`${line}-${lineIndex}`} style={[styles.line, { color: colors.code.plain }]}>
            {tokens.map((token, tokenIndex) => (
              <Text key={`${token}-${tokenIndex}`} style={{ color: getTokenColor(token, colors.code) }}>
                {token}
              </Text>
            ))}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.xxs,
  },
  line: {
    fontFamily: 'Courier',
    fontSize: typography.code.fontSize,
    lineHeight: typography.code.lineHeight,
    fontWeight: typography.code.fontWeight,
  },
});
