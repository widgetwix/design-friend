// AI Service for Design Friend
// Placeholder function that simulates AI analysis
// Replace with actual API calls when API key is available

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Analyze liked images and generate initial vibe summary
export async function generateVibeCheck(likedImages) {
  await delay(2000); // Simulate API call

  // Count style occurrences
  const styleCounts = {};
  const allTags = [];

  likedImages.forEach(img => {
    styleCounts[img.style] = (styleCounts[img.style] || 0) + 1;
    allTags.push(...img.tags);
  });

  // Find dominant styles
  const sortedStyles = Object.entries(styleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([style]) => style);

  // Find common tags
  const tagCounts = {};
  allTags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  const primaryStyle = sortedStyles[0] || 'Modern';
  const secondaryStyle = sortedStyles[1] || 'Contemporary';

  return {
    summary: `You have a clear affinity for ${primaryStyle} aesthetics with hints of ${secondaryStyle} influence. Your selections reveal an appreciation for ${topTags.join(', ')} elements that create a cohesive visual story.`,
    dominantStyles: sortedStyles,
    topTags
  };
}

// Generate final design persona based on all data
export async function generateDesignPersona(likedImages, annotations) {
  await delay(3000); // Simulate API call

  // Analyze data
  const styleCounts = {};
  const allTags = [];
  const userPreferences = [];

  likedImages.forEach(img => {
    styleCounts[img.style] = (styleCounts[img.style] || 0) + 1;
    allTags.push(...img.tags);
  });

  annotations.forEach(ann => {
    if (ann.note) {
      userPreferences.push(ann.note.toLowerCase());
    }
  });

  // Find dominant elements
  const sortedStyles = Object.entries(styleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([style]) => style);

  const tagCounts = {};
  allTags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  // Generate creative style name
  const styleNames = {
    'Japandi': ['Zen', 'Serene', 'Harmonious'],
    'Mid-century Modern': ['Retro', 'Atomic', 'Classic'],
    'Coastal': ['Breezy', 'Coastal', 'Seaside'],
    'Modern Contemporary': ['Urban', 'Sleek', 'Refined'],
    'Bohemian': ['Free-spirited', 'Wanderlust', 'Artistic'],
    'Traditional': ['Timeless', 'Elegant', 'Heritage'],
    'Minimal': ['Essential', 'Pure', 'Curated'],
    'Eclectic/Maximalist': ['Collected', 'Bold', 'Expressive'],
    'Craftsman': ['Artisan', 'Handcrafted', 'Warm'],
    'Organic': ['Natural', 'Earthen', 'Grounded'],
    'Colonial': ['Stately', 'Classic', 'Grand']
  };

  const primaryStyle = sortedStyles[0] || 'Modern';
  const secondaryStyle = sortedStyles[1] || 'Contemporary';
  const primaryDescriptors = styleNames[primaryStyle] || ['Modern'];
  const secondaryDescriptors = styleNames[secondaryStyle] || ['Contemporary'];

  const styleName = `${primaryDescriptors[Math.floor(Math.random() * primaryDescriptors.length)]} ${secondaryDescriptors[Math.floor(Math.random() * secondaryDescriptors.length)]} ${primaryStyle.split(' ')[0]}`;

  // Extract material and color preferences from annotations
  const materials = ['wood', 'leather', 'velvet', 'linen', 'brass', 'marble', 'concrete', 'rattan'];
  const colors = ['warm', 'neutral', 'bold', 'muted', 'earth', 'jewel', 'monochrome', 'blue', 'green'];

  const mentionedMaterials = materials.filter(m =>
    userPreferences.some(p => p.includes(m)) || topTags.some(t => t.includes(m))
  );

  const mentionedColors = colors.filter(c =>
    userPreferences.some(p => p.includes(c)) || topTags.some(t => t.includes(c))
  );

  // Generate summary paragraphs
  const summary = `Your design sensibility is rooted in ${primaryStyle} principles with a distinctive ${secondaryStyle.toLowerCase()} twist. You're drawn to spaces that feel ${topTags.slice(0, 2).join(' and ')}, with a clear preference for ${topTags.slice(2, 4).join(' and ')} elements. Your selections reveal someone who values both form and function, seeking interiors that tell a story while remaining livable and inviting.

Based on your annotations, you have a particular appreciation for ${mentionedMaterials.length > 0 ? mentionedMaterials.join(', ') : 'natural materials and textures'}. ${mentionedColors.length > 0 ? `You gravitate towards ${mentionedColors.join(' and ')} color palettes.` : 'Your color preferences lean towards harmonious, balanced palettes.'} The specific details you highlighted—from ${userPreferences.slice(0, 2).join(' to ') || 'textural elements to lighting choices'}—suggest you notice the subtle touches that elevate a space from ordinary to extraordinary. You appreciate craftsmanship and intentional design choices that create atmosphere.`;

  // Generate shopping keywords
  const shoppingKeywords = generateShoppingKeywords(sortedStyles, topTags, mentionedMaterials, userPreferences);

  return {
    styleName,
    summary,
    shoppingKeywords,
    dominantStyles: sortedStyles,
    topTags
  };
}

function generateShoppingKeywords(styles, tags, materials, userNotes) {
  const keywords = [];
  const primaryStyle = styles[0] || 'Modern';

  // Style-specific keywords
  const styleKeywords = {
    'Japandi': [
      'low platform bed frame natural wood',
      'ceramic minimalist table lamp',
      'organic cotton linen duvet set',
      'bamboo room divider screen'
    ],
    'Mid-century Modern': [
      'walnut credenza with tapered legs',
      'brass sputnik chandelier',
      'leather lounge chair with ottoman',
      'teak coffee table hairpin legs'
    ],
    'Coastal': [
      'natural jute area rug',
      'white linen slipcover sofa',
      'rattan pendant light fixture',
      'driftwood decorative mirror'
    ],
    'Modern Contemporary': [
      'modular sectional sofa gray',
      'sculptural floor lamp chrome',
      'marble top console table',
      'abstract canvas wall art'
    ],
    'Bohemian': [
      'vintage Persian rug runner',
      'macrame wall hanging large',
      'terracotta planter set',
      'embroidered throw pillows'
    ],
    'Traditional': [
      'tufted velvet sofa navy',
      'crystal chandelier classic',
      'mahogany bookcase with glass doors',
      'oriental wool area rug'
    ],
    'Minimal': [
      'floating wall shelf white oak',
      'japanese floor cushion',
      'simple ceramic vase set',
      'linen curtains natural'
    ],
    'Eclectic/Maximalist': [
      'colorful patterned ottoman',
      'gallery wall frame set gold',
      'velvet accent chair emerald',
      'moroccan pouf leather'
    ],
    'Craftsman': [
      'mission style bookcase oak',
      'stained glass table lamp',
      'handwoven wool throw blanket',
      'arts and crafts tile coasters'
    ],
    'Organic': [
      'live edge wood dining table',
      'stone sculpture decorative',
      'woven seagrass basket set',
      'natural linen curtains'
    ],
    'Colonial': [
      'four poster bed mahogany',
      'brass candlestick holders',
      'wingback chair floral',
      'antique style wall mirror'
    ]
  };

  // Add style-specific keywords
  if (styleKeywords[primaryStyle]) {
    keywords.push(...styleKeywords[primaryStyle].slice(0, 3));
  }

  if (styles[1] && styleKeywords[styles[1]]) {
    keywords.push(...styleKeywords[styles[1]].slice(0, 2));
  }

  // Add material-based keywords
  materials.forEach(material => {
    switch(material) {
      case 'wood':
        keywords.push('solid wood accent table');
        break;
      case 'leather':
        keywords.push('genuine leather throw pillow');
        break;
      case 'velvet':
        keywords.push('velvet upholstered dining chairs');
        break;
      case 'brass':
        keywords.push('brass table lamp modern');
        break;
      case 'marble':
        keywords.push('marble side table round');
        break;
      case 'rattan':
        keywords.push('rattan armchair natural');
        break;
    }
  });

  // Add tag-based keywords
  if (tags.includes('plants') || tags.includes('greenery')) {
    keywords.push('indoor planter stand modern');
  }
  if (tags.includes('statement lighting') || tags.includes('chandelier')) {
    keywords.push('modern pendant light cluster');
  }

  // Return unique keywords, limited to 10
  return [...new Set(keywords)].slice(0, 10);
}

export default {
  generateVibeCheck,
  generateDesignPersona
};
