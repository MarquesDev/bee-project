import React from 'react';
import { get } from 'lodash';
import { Container, Logo, Links, Link } from './Header.sc';

export class Header extends React.Component {
  render() {
    return (
      <Container>
        <Logo>ALLO MAYA - BLOG</Logo>
      </Container>
    );
  }
}
