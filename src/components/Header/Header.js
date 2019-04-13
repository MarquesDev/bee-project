import React from 'react';
import { get } from 'lodash';
import { Container, Logo } from './Header.sc';
import { Link } from 'gatsby';

export class Header extends React.Component {
  render() {
    return (
      <Container>
        <Link to="/">
          <Logo>ALLO MAYA - BLOG</Logo>
        </Link>
      </Container>
    );
  }
}
