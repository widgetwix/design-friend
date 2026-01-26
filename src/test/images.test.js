import { describe, it, expect } from 'vitest';
import { designImages } from '../data/images';

// Valid interior design styles
const VALID_STYLES = [
  'Japandi',
  'Mid-century Modern',
  'Colonial',
  'Traditional',
  'Coastal',
  'Craftsman',
  'Minimal',
  'Bohemian',
  'Eclectic/Maximalist',
  'Organic',
  'Modern Contemporary',
];

// Keywords that indicate an image is NOT interior design focused
const INVALID_KEYWORDS = [
  'person',
  'people',
  'man',
  'woman',
  'cooking',
  'eating',
  'portrait',
  'selfie',
  'outdoor',
  'nature',
  'landscape',
  'food',
  'animal',
];

// Keywords that indicate an image IS interior design focused
const VALID_INTERIOR_KEYWORDS = [
  'room',
  'living',
  'bedroom',
  'kitchen',
  'dining',
  'bathroom',
  'interior',
  'furniture',
  'decor',
  'design',
  'space',
  'home',
  'house',
  'apartment',
  'sofa',
  'chair',
  'table',
  'lamp',
  'rug',
  'curtain',
  'shelf',
  'cabinet',
];

describe('Design Images Data', () => {
  it('should have exactly 25 images', () => {
    expect(designImages).toHaveLength(25);
  });

  it('each image should have required properties', () => {
    designImages.forEach((image, index) => {
      expect(image, `Image at index ${index} missing id`).toHaveProperty('id');
      expect(image, `Image at index ${index} missing url`).toHaveProperty('url');
      expect(image, `Image at index ${index} missing style`).toHaveProperty('style');
      expect(image, `Image at index ${index} missing tags`).toHaveProperty('tags');
      expect(image, `Image at index ${index} missing description`).toHaveProperty('description');
    });
  });

  it('each image should have a valid interior design style', () => {
    designImages.forEach((image) => {
      expect(
        VALID_STYLES,
        `Image ${image.id} has invalid style: "${image.style}"`
      ).toContain(image.style);
    });
  });

  it('each image should have at least 3 tags', () => {
    designImages.forEach((image) => {
      expect(
        image.tags.length,
        `Image ${image.id} should have at least 3 tags`
      ).toBeGreaterThanOrEqual(3);
    });
  });

  it('each image URL should be a valid URL', () => {
    designImages.forEach((image) => {
      expect(
        () => new URL(image.url),
        `Image ${image.id} has invalid URL: "${image.url}"`
      ).not.toThrow();
    });
  });

  it('each image should have unique id', () => {
    const ids = designImages.map((img) => img.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('image descriptions should reference interior/room elements', () => {
    designImages.forEach((image) => {
      const descLower = image.description.toLowerCase();
      const hasInteriorKeyword = VALID_INTERIOR_KEYWORDS.some((keyword) =>
        descLower.includes(keyword)
      );
      expect(
        hasInteriorKeyword,
        `Image ${image.id} description should reference interior design elements. Description: "${image.description}"`
      ).toBe(true);
    });
  });

  it('image descriptions should NOT primarily feature people', () => {
    designImages.forEach((image) => {
      const descLower = image.description.toLowerCase();
      // Use word boundaries to avoid false positives like "craftsman" matching "man"
      const hasPeopleKeyword = INVALID_KEYWORDS.some((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`);
        return regex.test(descLower);
      });
      expect(
        hasPeopleKeyword,
        `Image ${image.id} description should focus on interior design, not people. Description: "${image.description}"`
      ).toBe(false);
    });
  });

  it('should have representation from multiple styles', () => {
    const stylesUsed = new Set(designImages.map((img) => img.style));
    expect(
      stylesUsed.size,
      'Should have at least 8 different styles represented'
    ).toBeGreaterThanOrEqual(8);
  });

  it('image URLs should point to interior design photos', () => {
    // Verify URLs are from reputable image sources
    const validDomains = [
      'unsplash.com',
      'images.unsplash.com',
      'pexels.com',
      'images.pexels.com',
      'architecturaldigest.com',
    ];

    designImages.forEach((image) => {
      const url = new URL(image.url);
      const isValidDomain = validDomains.some((domain) =>
        url.hostname.includes(domain)
      );
      expect(
        isValidDomain,
        `Image ${image.id} URL should be from a reputable interior design image source`
      ).toBe(true);
    });
  });

  // Style-specific tests
  describe('Japandi style images', () => {
    it('should have appropriate tags', () => {
      const japandiImages = designImages.filter((img) => img.style === 'Japandi');
      const japandiTags = ['minimalist', 'natural', 'zen', 'clean', 'wood', 'neutral', 'simple', 'calm', 'muted', 'wabi-sabi', 'crafted', 'bamboo', 'balanced'];

      japandiImages.forEach((image) => {
        const hasRelevantTag = image.tags.some((tag) =>
          japandiTags.some((jTag) => tag.toLowerCase().includes(jTag))
        );
        expect(
          hasRelevantTag,
          `Japandi image ${image.id} should have relevant style tags`
        ).toBe(true);
      });
    });
  });

  describe('Mid-century Modern style images', () => {
    it('should have appropriate tags', () => {
      const mcmImages = designImages.filter((img) => img.style === 'Mid-century Modern');
      const mcmTags = ['retro', 'vintage', 'teak', 'walnut', 'organic', 'brass', 'hairpin', 'atomic', 'sculptural'];

      mcmImages.forEach((image) => {
        const hasRelevantTag = image.tags.some((tag) =>
          mcmTags.some((mTag) => tag.toLowerCase().includes(mTag))
        );
        expect(
          hasRelevantTag,
          `Mid-century Modern image ${image.id} should have relevant style tags`
        ).toBe(true);
      });
    });
  });

  describe('Coastal style images', () => {
    it('should have appropriate tags', () => {
      const coastalImages = designImages.filter((img) => img.style === 'Coastal');
      const coastalTags = ['beach', 'white', 'blue', 'natural', 'airy', 'linen', 'driftwood', 'light', 'relaxed'];

      coastalImages.forEach((image) => {
        const hasRelevantTag = image.tags.some((tag) =>
          coastalTags.some((cTag) => tag.toLowerCase().includes(cTag))
        );
        expect(
          hasRelevantTag,
          `Coastal image ${image.id} should have relevant style tags`
        ).toBe(true);
      });
    });
  });
});
