import { Link, graphql } from 'gatsby';
import { Background } from '../components/Background';
import Layout from '../components/Layout/Layout';
import React from 'react';
import SEO from '../components/SEO';
import { Typography } from '../components/Typography/Typography';
import { Article, Main } from '../components/Blog';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Enterprise } from '../components/Enterprise';
import get from 'lodash/get';

class EnterprisePage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const enterprises = get(this, 'props.pageContext.enterprises');
    const enterprise = get(this, 'props.pageContext.enterprise');

    return (
      <Layout>
        <Background color="grey">
          <SEO />
          <Header title="ALLO MAYA" />
          <Main>
            <Enterprise {...enterprise} />
          </Main>
        </Background>
        <Footer posts={posts} enterprises={enterprises} />
      </Layout>
    );
  }
}

export default EnterprisePage;

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
