const {
  splitEnterprisesByRegion,
  getAllRegions,
} = require('../split-enterprises-by-region');

describe('split-enterprises-by-region test suite', () => {
  it('should get all the regions', () => {
    const allRegions = getAllRegions();

    expect(allRegions.size).toEqual(104);
  });

  it('should get all regions with the correct schema', () => {
    const allRegions = [...getAllRegions().values()];

    allRegions.forEach(key => {
      expect(key.enterprises).toEqual([]);
    });
  });

  it('should order all enterprises', () => {
    const enterprises = [
      { name: 'a', countries: [{ name: 'Ain (01)', id: '01' }] },
      { name: 'b', countries: [{ name: 'Aisne (02)', id: '02' }] },
      { name: 'c', countries: [{ name: 'Ain (01)', id: '01' }] },
    ];
    const allRegions = [...getAllRegions().values()];
    const split = splitEnterprisesByRegion(enterprises);
    expect(split).toEqual([
      {
        name: 'Ain (01)',
        id: '01',
        enterprises: [
          { name: 'a', countries: [{ name: 'Ain (01)', id: '01' }] },
          { name: 'c', countries: [{ name: 'Ain (01)', id: '01' }] },
        ],
      },
      {
        name: 'Aisne (02)',
        id: '02',
        enterprises: [
          { name: 'b', countries: [{ name: 'Aisne (02)', id: '02' }] },
        ],
      },
      ...allRegions.slice(2),
    ]);
  });
});
