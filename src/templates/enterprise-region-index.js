import { Link, graphql } from 'gatsby';
import { Background } from '../components/Background';
import Layout from '../components/Layout/Layout';
import React from 'react';
import SEO from '../components/SEO';
import { Typography } from '../components/Typography/Typography';
import { Article, Main } from '../components/Blog';
import { Header } from '../components/Home';
import { Footer } from '../components/Footer/Footer';
import {
  Enterprise,
  OtherEnterprise,
  Letter,
  Letters,
} from '../components/Enterprise';
import get from 'lodash/get';

class EnterprisesByRegionIndex extends React.Component {
  render() {
    const enterprises = get(this, 'props.pageContext.enterprises');
    const regionName = get(this, 'props.pageContext.regionName');
    const regions = get(this, 'props.pageContext.regions');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout>
        <Background color="grey">
          <SEO
            title={`Trouvez des entreprise d'anti-nuisible dans votre région, ici la région de ${regionName} -- Allo Maya`}
            description={`Trouvez des entreprise d'anti-nuisible dans votre région. Nid de guêpes, rats, pigeons...`}
          />
          <Header />
          <Main>
            <Typography as="h1" type="title" variant="3">
              Entreprises de la region {regionName}
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
        <Footer posts={posts} regions={regions} />
      </Layout>
    );
  }
}

export default EnterprisesByRegionIndex;

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
