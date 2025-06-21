export const toTitleCase = (str) => {
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

 export const normalizeState = (input) => {
  if (!input) return '';

  const cleaned = input.trim().replace(/\./g, '').replace(/\s+/g, '').toLowerCase();
  const variants = [
    input.trim(),
    input.trim().toLowerCase(),
    input.trim().toUpperCase(),
    cleaned,
    input.trim().replace(/\./g, '').toLowerCase(),
    input.trim().replace(/\./g, '').toUpperCase(),
    input.trim().replace(/\s+/g, ' ')
  ];

  for (let variant of variants) {
    if (stateAbbreviations[variant]) {
      return stateAbbreviations[variant];
    }
  }

  // fallback to title case
  return toTitleCase(input);
};

