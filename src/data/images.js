// Interior design images curated from styles_manifest.json
// All images follow "Editorial Industrial" aesthetic guidelines:
// - Warm, moody lighting
// - High contrast
// - No people
// - Professional photography quality

import stylesManifest from './styles_manifest.json';

// Generate design images from the curated manifest
const generateImagesFromManifest = () => {
  const images = [];
  let id = 1;

  Object.entries(stylesManifest.styles).forEach(([styleKey, styleData]) => {
    styleData.images.forEach((image) => {
      images.push({
        id: id++,
        url: image.url,
        style: styleData.displayName,
        tags: [...image.tags, ...styleData.keywords.slice(0, 3)],
        description: image.alt
      });
    });
  });

  return images;
};

export const designImages = generateImagesFromManifest();

// Export style metadata for persona generation
export const styleMetadata = Object.fromEntries(
  Object.entries(stylesManifest.styles).map(([key, data]) => [
    data.displayName,
    {
      key,
      description: data.description,
      keywords: data.keywords
    }
  ])
);

// Get images by style
export const getImagesByStyle = (styleName) => {
  return designImages.filter(img => img.style === styleName);
};

// Get all available styles
export const getAvailableStyles = () => {
  return Object.values(stylesManifest.styles).map(style => style.displayName);
};

// Get style info by name
export const getStyleInfo = (styleName) => {
  const style = Object.values(stylesManifest.styles).find(
    s => s.displayName === styleName
  );
  return style || null;
};

export default designImages;
