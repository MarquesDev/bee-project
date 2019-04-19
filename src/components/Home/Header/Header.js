import React from 'react';
import { get } from 'lodash';
import { Container, Logo, Links, Link } from './Header.sc';
import { Link as L } from 'gatsby';

export class Header extends React.Component {
  render() {
    return (
      <Container>
        <L to="/">
          <Logo>ALLO MAYA</Logo>
        </L>
        <Links>
          <Link href="/entreprises/par-ordre-alphabetique/a/">Entreprises</Link>
          <Link href="/blog/">Blog</Link>
        </Links>
      </Container>
    );
  }
}
