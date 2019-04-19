import { Link, graphql } from 'gatsby';
import { Background } from '../components/Background';
import Layout from '../components/Layout/Layout';
import React from 'react';
import SEO from '../components/SEO';
import { Typography } from '../components/Typography/Typography';
import { Article, Main } from '../components/Blog';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import {
  Enterprise,
  OtherEnterprise,
  Letter,
  Letters,
} from '../components/Enterprise';
import get from 'lodash/get';

class EnterprisePage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const footerEnterprises = get(this, 'props.pageContext.footerEnterprises');
    const enterprises = get(this, 'props.pageContext.enterprises');
    const letters = get(this, 'props.pageContext.letters');
    const letter = get(this, 'props.pageContext.letter');
    const href = get(this, 'props.pageContext.href');

    return (
      <Layout>
        <Background color="grey">
          <SEO
            slug={href}
            title="Liste des entreprises"
            description={`Trouvez des entreprise d'anti-nuisible dans votre région.
            Nid de guêpes, rats, pigeons...
            `}
          />
          <Header title="ALLO MAYA" />
          <Main>
            <Letters>
              {letters.map(({ letter, isActive, hasEnterprises, slug }) => (
                <Letter
                  key={letter}
                  isActive={isActive}
                  hasEnterprises={hasEnterprises}
                >
                  {hasEnterprises && <Link to={slug}>{letter}</Link>}
                  {!hasEnterprises && letter}
                </Letter>
              ))}
            </Letters>
            <Typography type="title" variant="3">
              Entreprises commençant par la lettre {letter}
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
        <Footer posts={posts} enterprises={footerEnterprises} />
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
