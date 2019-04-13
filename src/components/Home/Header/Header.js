import React from 'react';
import { get } from 'lodash';
import { Container, Logo, Links, Link } from './Header.sc';

class Header extends React.Component {
  render() {
    return (
      <Container>
        <Logo>Allo Maya</Logo>
        <Links>
          <Link href="/blog">Voir le blog</Link>
        </Links>
      </Container>
    );
  }
}

export default Header;
