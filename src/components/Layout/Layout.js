import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { Container } from './Layout.sc';
import { ThemeProvider } from '../ThemeProvider';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <ThemeProvider>
        <Container>
          <Helmet
            meta={[
              {
                name: 'theme-color',
                content: '#ffa8c5',
              },
            ]}
          />
          <div>{children}</div>
        </Container>
      </ThemeProvider>
    );
  }
}

export default Layout;
