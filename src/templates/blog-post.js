import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/Layout/Layout';
import SEO from '../components/SEO';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
} from '../utils/i18n';
import { Content, Main } from '../components/Post';
import { Typography } from '../components/Typography/Typography';
import { Header } from '../components/Home';
import { Footer } from '../components/Footer/Footer';
import { Background } from '../components/Background';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    let { previous, next, slug, enterprises } = this.props.pageContext;
    const lang = post.fields.langKey;

    return (
      <Layout>
        <SEO
          lang={lang}
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <Background color="grey">
          <Header />
          <Main>
            <article>
              <header>
                <Typography as="h1" type="title" variant="1">
                  {post.frontmatter.title}
                </Typography>
                <Typography as="p" type="large">
                  {formatPostDate(post.frontmatter.date, 'fr')}
                  {` • ${formatReadingTime(post.timeToRead)}`}
                </Typography>
              </header>

              <Typography as="div" type="large">
                <Content dangerouslySetInnerHTML={{ __html: post.html }} />
              </Typography>
            </article>
          </Main>
        </Background>
        <Footer posts={posts} enterprises={enterprises} />
      </Layout>
    );
  }
}
import { from } from 'rxjs';

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
      fields {
        slug
        langKey
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
