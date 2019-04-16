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
  Left,
  Right,
} from './OtherEnterprise.sc';
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

export class OtherEnterprise extends React.Component {
  render() {
    return (
      <Container margin={this.props.margin}>
        <Left>
          <Image src={this.props.logo} />
        </Left>
        <Right>
          <EnterpriseName>
            <Typography as="h3" type="title" variant="4">
              <Link to={this.props.slug}>{this.props.name}</Link>
            </Typography>
          </EnterpriseName>
          <Typography
            as="p"
            dangerouslySetInnerHTML={{ __html: this.props.description }}
          />
        </Right>
      </Container>
    );
  }
}
