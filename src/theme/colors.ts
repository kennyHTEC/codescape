export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  accent: {
    primary: string;
    secondary: string;
  };
  border: {
    default: string;
    subtle: string;
  };
  section: {
    javascript: string;
  };
  code: {
    background: string;
    keyword: string;
    string: string;
    comment: string;
    text: string;
  };
}

export const lightColors: ThemeColors = {
  background: {
    primary: '#F7F8FA',
    secondary: '#FFFFFF',
    card: '#FFFFFF',
  },
  text: {
    primary: '#111827',
    secondary: '#374151',
    muted: '#6B7280',
  },
  accent: {
    primary: '#2563EB',
    secondary: '#DBEAFE',
  },
  border: {
    default: '#D1D5DB',
    subtle: '#E5E7EB',
  },
  section: {
    javascript: '#F59E0B',
  },
  code: {
    background: '#111827',
    keyword: '#93C5FD',
    string: '#FDE68A',
    comment: '#9CA3AF',
    text: '#E5E7EB',
  },
};

export const darkColors: ThemeColors = {
  background: {
    primary: '#090B10',
    secondary: '#121620',
    card: '#161B27',
  },
  text: {
    primary: '#F3F4F6',
    secondary: '#D1D5DB',
    muted: '#9CA3AF',
  },
  accent: {
    primary: '#60A5FA',
    secondary: '#1D4ED8',
  },
  border: {
    default: '#374151',
    subtle: '#1F2937',
  },
  section: {
    javascript: '#FBBF24',
  },
  code: {
    background: '#0B1020',
    keyword: '#93C5FD',
    string: '#FDE68A',
    comment: '#6B7280',
    text: '#E5E7EB',
  },
};

export const themeColors = {
  light: lightColors,
  dark: darkColors,
} as const;
