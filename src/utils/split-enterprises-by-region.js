const allRegions = require('../assets/regions.json');

function getAllRegions() {
  return allRegions.reduce(
    (accumulator, region) =>
      accumulator.set(region.id, { ...region, enterprises: [] }),
    new Map()
  );
}

function splitEnterprisesByRegion(enterprises) {
  const objectMap = enterprises.reduce((accumulator, enterprise) => {
    enterprise.countries.forEach(({ id }) => {
      const getCountry = accumulator.get(id);
      accumulator.set(id, {
        ...getCountry,
        enterprises: [...getCountry.enterprises, enterprise],
      });
    });
    return accumulator;
  }, getAllRegions());

  return [...objectMap.values()];
}

module.exports = {
  getAllRegions,
  splitEnterprisesByRegion,
};
