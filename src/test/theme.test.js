import { describe, it, expect } from 'vitest';
import { theme } from '../styles/theme';

describe('Design System Theme', () => {
  describe('Color Palette', () => {
    it('should have Blush Plaster as background color', () => {
      expect(theme.colors.background).toBe('#F2E6DF');
    });

    it('should have Charcoal Black as primary color', () => {
      expect(theme.colors.primary).toBe('#1A1A1A');
    });

    it('should have Velvet Rust as accent color', () => {
      expect(theme.colors.accent).toBe('#C84C35');
    });

    it('should have proper text colors', () => {
      expect(theme.colors.text.primary).toBe('#1A1A1A');
      expect(theme.colors.text.inverse).toBe('#F2E6DF');
      expect(theme.colors.text.muted).toBeDefined();
    });
  });

  describe('Typography', () => {
    it('should have serif font for headlines', () => {
      expect(theme.fonts.headline).toContain('serif');
    });

    it('should have mono font for labels', () => {
      expect(theme.fonts.mono).toContain('Space Mono');
    });

    it('should have sans font for body text', () => {
      expect(theme.fonts.body).toContain('Inter');
    });
  });

  describe('Spacing & Layout', () => {
    it('should have sharp corners (0px or 2px radius)', () => {
      expect(theme.radius.none).toBe('0px');
      expect(theme.radius.subtle).toBe('2px');
    });

    it('should have 1px border width', () => {
      expect(theme.borderWidth).toBe('1px');
    });
  });
});
