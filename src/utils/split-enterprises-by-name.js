function getAllLetters() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return letters.reduce(
    (accumulator, value) =>
      accumulator.set(value, { letter: value, enterprises: [] }),
    new Map()
  );
}

function getFirstLetter(name) {
  return name.slice(0, 1).toLowerCase();
}

function splitEnterprisesByName(enterprises) {
  const objectMap = enterprises.reduce((accumulator, value) => {
    const key = getFirstLetter(value.name);
    const v = accumulator.get(key);
    accumulator.set(key, { ...v, enterprises: [...v.enterprises, value] });
    return accumulator;
  }, getAllLetters());

  return [...objectMap.values()];
}

module.exports = {
  getAllLetters,
  splitEnterprisesByName,
};
