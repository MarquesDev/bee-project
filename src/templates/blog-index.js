import { Link, graphql } from 'gatsby';
import { Background } from '../components/Background';
import Layout from '../components/Layout/Layout';
import React from 'react';
import SEO from '../components/SEO';
import { Typography } from '../components/Typography/Typography';
import { Article, Main } from '../components/Blog';
import { Header } from '../components/Home';
import { Footer } from '../components/Footer/Footer';
import get from 'lodash/get';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const enterprises = get(this, 'props.pageContext.enterprises');
    const href = get(this, 'props.pageContext.href');

    return (
      <Layout>
        <Background color="grey">
          <SEO
            title="Blog -- Apprenez à vous débarasser des nuisibles"
            slug={href}
          />
          <Header />
          <Main>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <Article
                  key={node.fields.slug}
                  date={node.frontmatter.date}
                  timeToRead={node.timeToRead}
                  subTitle={node.frontmatter.spoiler}
                  title={title}
                  href={node.fields.slug}
                />
              );
            })}
          </Main>
        </Background>
        <Footer posts={posts} enterprises={enterprises} />
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
