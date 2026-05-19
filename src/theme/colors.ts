export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    card: string;
    sidebar: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  accent: {
    primary: string;
    secondary: string;
  };
  border: {
    default: string;
    subtle: string;
  };
  code: {
    background: string;
    keyword: string;
    string: string;
    comment: string;
    function: string;
    plain: string;
  };
  section: {
    javascript: string;
  };
}

export const themeColors: Record<ThemeMode, ThemeColors> = {
  dark: {
    background: {
      primary: '#0C111B',
      secondary: '#111827',
      card: '#161F31',
      sidebar: '#0F1726',
    },
    text: {
      primary: '#E5EAF2',
      secondary: '#AAB5C8',
      muted: '#8090AA',
      inverse: '#0C111B',
    },
    accent: {
      primary: '#42C2A8',
      secondary: '#2A8E7B',
    },
    border: {
      default: '#263246',
      subtle: '#1B2535',
    },
    code: {
      background: '#0A0F17',
      keyword: '#7DD3FC',
      string: '#86EFAC',
      comment: '#6B7280',
      function: '#F9A8D4',
      plain: '#E5E7EB',
    },
    section: {
      javascript: '#F7DF1E',
    },
  },
  light: {
    background: {
      primary: '#F7FAFC',
      secondary: '#EDF2F7',
      card: '#FFFFFF',
      sidebar: '#ECF1F6',
    },
    text: {
      primary: '#122033',
      secondary: '#334155',
      muted: '#64748B',
      inverse: '#F8FAFC',
    },
    accent: {
      primary: '#0F766E',
      secondary: '#0C5B56',
    },
    border: {
      default: '#CBD5E1',
      subtle: '#E2E8F0',
    },
    code: {
      background: '#EEF2F7',
      keyword: '#0369A1',
      string: '#166534',
      comment: '#64748B',
      function: '#BE185D',
      plain: '#0F172A',
    },
    section: {
      javascript: '#D4A700',
    },
  },
};
