import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { Background } from '../components/Background';
import Footer from '../components/Footer';
import Layout from '../components/Layout/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import { Typography } from '../components/Typography/Typography';
import get from 'lodash/get';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Background color="grey">
          <SEO />
          <main>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <article key={node.fields.slug}>
                  <header>
                    <Typography as="h3" type="title" variant="3">
                      <Link to={node.fields.slug} rel="bookmark">
                        {title}
                      </Link>
                    </Typography>
                    <Typography type="small">
                      {formatPostDate(node.frontmatter.date, 'fr')}
                      {` • ${formatReadingTime(node.timeToRead)}`}
                    </Typography>
                  </header>
                  <Typography
                    as="p"
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.spoiler,
                    }}
                  />
                </article>
              );
            })}
          </main>
        </Background>
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`;
