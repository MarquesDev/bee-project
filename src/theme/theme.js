import { grey } from '@material-ui/core/colors';

const colors = {
  blue: {
    500: '#3366BB',
    600: '#285094',
  },
  grey,
};

const fonts = {
  family: {
    system: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Open Sans',
      'Helvetica Neue',
      'sans-serif;',
    ].join(','),
  },
};

const border = {
  simple: '1px solid #ebebeb',
};

const spacing = {
  unit: 8,
};

export default {
  name: 'Default',
  colors,
  fonts,
  spacing,
  border,
};
