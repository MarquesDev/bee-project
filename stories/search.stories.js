import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Search } from '../src/components/Home/Search/Search';
import { ThemeProvider } from '../src/components/ThemeProvider';

storiesOf('Home / Search', module).add('the search bar', () => (
  <ThemeProvider>
    <Search />
  </ThemeProvider>
));
