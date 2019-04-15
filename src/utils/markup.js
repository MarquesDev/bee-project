export const parseEnterprise = enterprise => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: enterprise.url,
  logo: enterprise.logo,
  contactPoint: enterprise.phoneNumbers.map(number => ({
    '@type': 'ContactPoint',
    telephone: `+33${number}`,
    contactType: 'customer service',
    availableLanguage: ['French'],
  })),
});

export const parseWebsite = () => ({
  '@context': 'http://schema.org',
  '@id': 'https://www.allo-maya.fr',
  '@type': 'WebPage',
  url: 'https://www.allo-maya.fr',
  name: 'Allo Maya',
});
