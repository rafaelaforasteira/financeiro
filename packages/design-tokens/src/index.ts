export const theme = {
  color: {
    background: '#FCFDFB',
    surface: '#FFFFFF',
    muted: '#F5F8F6',
    border: '#E5ECE7',
    text: '#243831',
    secondary: '#62766E',
    primary: '#276F5A',
    onPrimary: '#FFFFFF',
    mint: '#E8F6ED',
    mintAccent: '#C6F0DD',
    lavender: '#F1EBFF',
    lavenderAccent: '#805ED8',
    sky: '#EAF4F7',
    warning: '#876011',
    error: '#B73F55',
    disabled: '#A9B8B0',
    hover: '#205B4A',
    focus: '#276F5A',
    pressed: '#1B4C3E',
    skeleton: '#E5ECE7',
    overlay: '#24383133',
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    section: 32,
    page: 40,
    hero: 48,
  },
  radius: { input: 16, button: 18, card: 24, hero: 30, pill: 999 },
  typography: {
    family: 'Plus Jakarta Sans',
    body: 16,
    small: 14,
    title: 28,
    balance: 36,
  },
  motion: { feedback: 180, transition: 260 },
} as const;

export const cssVariables = Object.entries(theme.color)
  .map(([key, value]) => `--${key}: ${value}`)
  .join(';');
