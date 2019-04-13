import React from 'react';
import { get } from 'lodash';
import { Container, Header } from './Article.sc';
import { Typography } from '../../Typography/Typography';
import { Link } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../../../utils/helpers';

export class Article extends React.Component {
  render() {
    return (
      <Container as="article">
        <Header>
          <Typography as="h3" type="title" variant="3">
            <Link to={this.props.href} rel="bookmark">
              {this.props.title}
            </Link>
          </Typography>
          <Typography type="small">
            {formatPostDate(this.props.date, 'fr')}
          </Typography>
        </Header>
        <Typography
          as="p"
          dangerouslySetInnerHTML={{
            __html: this.props.subTitle,
          }}
        />
      </Container>
    );
  }
}
