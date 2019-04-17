const {
  splitEnterprisesByName,
  getAllLetters,
} = require('../split-enterprises-by-name');

describe('split-enterprises-by-name test suite', () => {
  it('should get the right numbers of letters', () => {
    const allLetters = getAllLetters();

    expect(allLetters.size).toEqual(26);
  });

  it('should get all letters with the correct schema', () => {
    const allLetters = [...getAllLetters().values()];

    allLetters.forEach(key => {
      expect(key.enterprises).toEqual([]);
    });
  });

  it('should order all enterprises', () => {
    const enterprises = [{ name: 'a' }, { name: 'b' }];
    const allLetters = [...getAllLetters().values()];
    const split = splitEnterprisesByName(enterprises);
    expect(split).toEqual([
      { letter: 'a', enterprises: [{ name: 'a' }] },
      { letter: 'b', enterprises: [{ name: 'b' }] },
      ...allLetters.slice(2),
    ]);
  });
});
