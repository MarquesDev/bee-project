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
