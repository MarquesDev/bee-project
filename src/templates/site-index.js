import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import Layout from '../components/Layout/Layout';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { Background } from '../components/Background';
import { Footer } from '../components/Footer/Footer';
import {
  Title,
  SubTitle,
  Main,
  MainTitle,
  Header,
  Search,
} from '../components/Home';

class SiteIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const enterprises = get(this, 'props.pageContext.enterprises');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <Background color="grey">
          <Main>
            <Header />
            <MainTitle>
              <Title>Prenez un rendez-vous en ligne avec un professionel</Title>
              <SubTitle>Il viendra enlever les nids pour vous</SubTitle>
              <Search />
            </MainTitle>
          </Main>
        </Background>
        <Footer posts={posts} enterprises={enterprises} />
      </Layout>
    );
  }
}

export default SiteIndex;

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
