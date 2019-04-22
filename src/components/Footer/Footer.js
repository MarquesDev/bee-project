import React from 'react';
import { get } from 'lodash';
import { Container, Column, Title, Link, MiddleAlignment } from './Footer.sc';

export class Footer extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Container>
        <MiddleAlignment>
          <Column>
            <Title>Les derniers articles</Title>
            {this.props.posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug;

              return (
                <Link key={node.fields.slug} href={node.fields.slug}>
                  {title}
                </Link>
              );
            })}
          </Column>
          <Column>
            <Title>Les enterprises</Title>
            {this.props.regions.map(({ name, slug }) => {
              return (
                <div key={name}>
                  <Link href={slug}>{name}</Link>
                </div>
              );
            })}
          </Column>
          <Column>
            <Title>À propos</Title>
            <Link href="/rss.xml" target="_blank" rel="noopener noreferrer">
              Flux rss
            </Link>
          </Column>
        </MiddleAlignment>
      </Container>
    );
  }
}

Footer.defaultProps = {
  regions: [],
  posts: [],
};

export default Footer;
