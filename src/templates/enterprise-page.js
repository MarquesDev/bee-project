import { Link, graphql } from 'gatsby';
import { Background } from '../components/Background';
import Layout from '../components/Layout/Layout';
import React from 'react';
import SEO from '../components/SEO';
import { Typography } from '../components/Typography/Typography';
import { Article, Main } from '../components/Blog';
import { Header } from '../components/Home';
import { Footer } from '../components/Footer/Footer';
import { Enterprise, OtherEnterprise } from '../components/Enterprise';
import get from 'lodash/get';

class EnterprisePage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const enterprises = get(this, 'props.pageContext.enterprises');
    const enterprise = get(this, 'props.pageContext.enterprise');
    const href = get(this, 'props.pageContext.href');

    return (
      <Layout>
        <Background color="grey">
          <SEO
            slug={href}
            title={
              enterprise.name + ' : entreprise qui vous débarasse des nuisibles'
            }
            description={enterprise.description}
            enterprise={enterprise}
            image={enterprise.logo}
          />
          <Header />
          <Main>
            <Enterprise {...enterprise} />
            <Typography type="title" variant="3">
              Entreprises dans la même zone
            </Typography>
            {enterprises.map((enterprise, index) => (
              <OtherEnterprise
                key={enterprise.name}
                {...enterprise}
                margin={index > 0}
              />
            ))}
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
