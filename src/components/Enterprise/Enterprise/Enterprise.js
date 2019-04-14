import React from 'react';
import { get } from 'lodash';
import {
  Container,
  Image,
  Center,
  EnterpriseName,
  Info,
  InfoLabel,
  InfoValue,
  SubTitle,
} from './Enterprise.sc';
import { Typography } from '../../Typography/Typography';
import { Link } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../../../utils/helpers';

const InfoBlock = ({ label, value }) => (
  <Info>
    <Typography>
      <InfoLabel>{label}: </InfoLabel>
    </Typography>
    <Typography>
      <InfoValue>{value}</InfoValue>
    </Typography>
  </Info>
);

export class Enterprise extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Center>
            <Image src={this.props.logo} />
            <EnterpriseName>
              <Typography as="h2" type="title" variant="3">
                {this.props.name}
              </Typography>
            </EnterpriseName>
          </Center>
        </Container>

        <Container margin>
          <SubTitle>
            <Typography as="h4" type="title" variant="4">
              Description
            </Typography>
          </SubTitle>

          <Typography
            as="p"
            dangerouslySetInnerHTML={{ __html: this.props.description }}
          />
        </Container>

        <Container margin>
          <SubTitle>
            <Typography as="h4" type="title" variant="4">
              Informations pratique
            </Typography>
          </SubTitle>

          <InfoBlock
            label="Adresse"
            value={`${this.props.street} - ${this.props.city}`}
          />

          <InfoBlock
            label="Numéro(s) de téléphone"
            value={this.props.phoneNumbers.join(' - ')}
          />

          <InfoBlock
            label="Site internet"
            value={
              <a href={this.props.url} target="_blank">
                {this.props.url}
              </a>
            }
          />

          <InfoBlock
            label="Villes d'intervention"
            value={this.props.countries.join(' - ')}
          />
        </Container>
      </>
    );
  }
}
