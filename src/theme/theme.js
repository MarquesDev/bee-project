import * as colors from '@material-ui/core/colors';

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
