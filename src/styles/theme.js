// Design Friend Theme Configuration
// Based on "Tactile Minimalism" design concept

export const theme = {
  colors: {
    // Primary palette
    background: '#F2E6DF',      // Blush Plaster
    primary: '#1A1A1A',         // Charcoal Black
    accent: '#C84C35',          // Velvet Rust

    // Text colors
    text: {
      primary: '#1A1A1A',
      inverse: '#F2E6DF',
      muted: 'rgba(26, 26, 26, 0.6)',
    },

    // UI colors
    border: '#1A1A1A',
    card: '#F2E6DF',
    overlay: 'rgba(26, 26, 26, 0.5)',
  },

  fonts: {
    headline: '"Playfair Display", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Space Mono", "SF Mono", monospace',
  },

  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },

  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  radius: {
    none: '0px',
    subtle: '2px',
  },

  borderWidth: '1px',

  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  shadows: {
    sm: '0 1px 2px rgba(26, 26, 26, 0.05)',
    md: '0 4px 6px rgba(26, 26, 26, 0.1)',
    lg: '0 10px 15px rgba(26, 26, 26, 0.1)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
  },
};

// CSS custom properties string for injection
export const cssVariables = `
  :root {
    /* Colors */
    --color-background: ${theme.colors.background};
    --color-primary: ${theme.colors.primary};
    --color-accent: ${theme.colors.accent};
    --color-text-primary: ${theme.colors.text.primary};
    --color-text-inverse: ${theme.colors.text.inverse};
    --color-text-muted: ${theme.colors.text.muted};
    --color-border: ${theme.colors.border};
    --color-card: ${theme.colors.card};
    --color-overlay: ${theme.colors.overlay};

    /* Typography */
    --font-headline: ${theme.fonts.headline};
    --font-body: ${theme.fonts.body};
    --font-mono: ${theme.fonts.mono};

    /* Spacing */
    --radius-none: ${theme.radius.none};
    --radius-subtle: ${theme.radius.subtle};
    --border-width: ${theme.borderWidth};

    /* Transitions */
    --transition-fast: ${theme.transitions.fast};
    --transition-normal: ${theme.transitions.normal};
    --transition-slow: ${theme.transitions.slow};
  }
`;

export default theme;
