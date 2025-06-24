const toTitleCase = (str) => {
  return str
    ?.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


const stateAbbreviations = {
  // Uttar Pradesh
  'up': 'Uttar Pradesh',
  'u.p': 'Uttar Pradesh',
  'u p': 'Uttar Pradesh',
  'uttar pradesh': 'Uttar Pradesh',
  'UP': 'Uttar Pradesh',
  'U.P': 'Uttar Pradesh',
  'U P': 'Uttar Pradesh',

  // Madhya Pradesh
  'mp': 'Madhya Pradesh',
  'm.p': 'Madhya Pradesh',
  'm p': 'Madhya Pradesh',
  'madhya pradesh': 'Madhya Pradesh',
  'MP': 'Madhya Pradesh',
  'M.P': 'Madhya Pradesh',
  'M P': 'Madhya Pradesh',

  // Andhra Pradesh
  'ap': 'Andhra Pradesh',
  'a.p': 'Andhra Pradesh',
  'a p': 'Andhra Pradesh',
  'andhra pradesh': 'Andhra Pradesh',
  'AP': 'Andhra Pradesh',
  'A.P': 'Andhra Pradesh',
  'A P': 'Andhra Pradesh',

  // Arunachal Pradesh
  'ar': 'Arunachal Pradesh',
  'AR': 'Arunachal Pradesh',
  'arunachal pradesh': 'Arunachal Pradesh',

  // Himachal Pradesh
  'hp': 'Himachal Pradesh',
  'h.p': 'Himachal Pradesh',
  'h p': 'Himachal Pradesh',
  'himachal pradesh': 'Himachal Pradesh',
  'HP': 'Himachal Pradesh',
  'H.P': 'Himachal Pradesh',
  'H P': 'Himachal Pradesh'
};

const normalizeState = (input) => {
  if (!input) return '';

  // Normalize spaces: replace multiple spaces with one space, trim, lowercase
  const normalizedSpace = input.trim().replace(/\s+/g, ' ').toLowerCase();
  
  // Also clean dots
  const normalizedNoDots = normalizedSpace.replace(/\./g, '');

  // Also variant with no spaces at all (just in case)
  const normalizedNoSpaces = normalizedSpace.replace(/\s/g, '');

  const variants = [normalizedSpace,normalizedNoDots,normalizedNoSpaces,normalizedSpace.toUpperCase(),
    normalizedNoDots.toUpperCase() ];

  for (let variant of variants) {
    if (stateAbbreviations[variant]) {
      return stateAbbreviations[variant];
    }
  }
  return toTitleCase(input);
};


module.exports = {
  toTitleCase,
  normalizeState
};
