import { describe, it, expect } from 'vitest';
import { designImages, getImagesByStyle, getAvailableStyles, styleMetadata } from '../data/images';

// Valid interior design styles from the curated manifest
const VALID_STYLES = [
  'Japandi',
  'Mid-Century Modern',
  'Industrial',
  'Coastal',
  'Modern Contemporary',
  'Bohemian',
  'Minimal',
  'Traditional',
  'Organic Modern',
  'Eclectic Maximalist',
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
  'nook',
  'entryway',
  'sunroom',
  'lounge',
  'office',
  'corner',
  'loft',
  'library',
  'warehouse',
];

describe('Design Images Data', () => {
  it('should have 50 curated images (5 per style × 10 styles)', () => {
    expect(designImages).toHaveLength(50);
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

  it('should have all 10 styles represented with 5 images each', () => {
    const stylesUsed = new Set(designImages.map((img) => img.style));
    expect(stylesUsed.size).toBe(10);

    // Each style should have exactly 5 images
    VALID_STYLES.forEach(style => {
      const styleImages = designImages.filter(img => img.style === style);
      expect(
        styleImages.length,
        `Style "${style}" should have exactly 5 images`
      ).toBe(5);
    });
  });

  it('image URLs should point to interior design photos from Unsplash', () => {
    designImages.forEach((image) => {
      const url = new URL(image.url);
      expect(
        url.hostname,
        `Image ${image.id} URL should be from images.unsplash.com`
      ).toBe('images.unsplash.com');
    });
  });

  it('image URLs should have quality parameters', () => {
    designImages.forEach((image) => {
      expect(
        image.url,
        `Image ${image.id} URL should include quality parameter`
      ).toContain('q=80');
      expect(
        image.url,
        `Image ${image.id} URL should include fit parameter`
      ).toContain('fit=crop');
    });
  });
});

describe('Image Helper Functions', () => {
  it('getImagesByStyle should return correct images', () => {
    const japandiImages = getImagesByStyle('Japandi');
    expect(japandiImages).toHaveLength(5);
    japandiImages.forEach(img => {
      expect(img.style).toBe('Japandi');
    });
  });

  it('getAvailableStyles should return all 10 styles', () => {
    const styles = getAvailableStyles();
    expect(styles).toHaveLength(10);
    VALID_STYLES.forEach(style => {
      expect(styles).toContain(style);
    });
  });

  it('styleMetadata should have metadata for all styles', () => {
    VALID_STYLES.forEach(style => {
      expect(styleMetadata[style]).toBeDefined();
      expect(styleMetadata[style].description).toBeDefined();
      expect(styleMetadata[style].keywords).toBeDefined();
    });
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

describe('Mid-Century Modern style images', () => {
  it('should have appropriate tags', () => {
    const mcmImages = designImages.filter((img) => img.style === 'Mid-Century Modern');
    const mcmTags = ['retro', 'vintage', 'teak', 'walnut', 'organic', 'brass', 'hairpin', 'atomic', 'sculptural', 'eames', 'leather', 'velvet', 'green', 'statement'];

    mcmImages.forEach((image) => {
      const hasRelevantTag = image.tags.some((tag) =>
        mcmTags.some((mTag) => tag.toLowerCase().includes(mTag))
      );
      expect(
        hasRelevantTag,
        `Mid-Century Modern image ${image.id} should have relevant style tags`
      ).toBe(true);
    });
  });
});

describe('Coastal style images', () => {
  it('should have appropriate tags', () => {
    const coastalImages = designImages.filter((img) => img.style === 'Coastal');
    const coastalTags = ['beach', 'white', 'blue', 'natural', 'airy', 'linen', 'driftwood', 'light', 'relaxed', 'woven', 'rattan', 'ocean', 'wicker', 'sea', 'brass', 'bright'];

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
