import React from 'react';
import { get } from 'lodash';
import { Container, Input, Button } from './Search.sc';

export class Search extends React.Component {
  render() {
    return (
      <Container>
        <Input placeholder="Paris, Lyon, Marseille..."/>
        <Button>Rechercher</Button>
      </Container>
    );
  }
}
