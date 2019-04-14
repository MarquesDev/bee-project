const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { supportedLanguages } = require('./i18n');
const enterprises = require('./src/assets/enterprises.json');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');

    createPage({
      path: '/',
      component: path.resolve('./src/templates/site-index.js'),
      context: {},
    });

    createPage({
      path: '/blog',
      component: path.resolve('./src/templates/blog-index.js'),
      context: {
        langKey: 'fr',
      },
    });

    enterprises.slice(0, 10).forEach(enterprise => {
      const getSlug = enterprise => {
        const parseName = enterprise.name
          .split(' ')
          .join('-')
          .split('.')
          .join('')
          .toLowerCase();
        return `/enterprise/${parseName}`;
      };

      createPage({
        path: getSlug(enterprise),
        component: path.resolve('./src/templates/enterprise-page.js'),
        context: {
          enterprise: { ...enterprise, slug: getSlug(enterprise) },
          enterprises: enterprises
            .slice(0, 10)
            .map(enterprise => ({ ...enterprise, slug: getSlug(enterprise) })),
        },
      });
    });

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                    directoryName
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug);
            return result;
          },
          new Set()
        );

        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === 'en'
        );
        _.each(defaultLangPosts, (post, index) => {
          const previous =
            index === defaultLangPosts.length - 1
              ? null
              : defaultLangPosts[index + 1].node;
          const next = index === 0 ? null : defaultLangPosts[index - 1].node;

          const translations = [];

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              translations,
              translatedLinks: [],
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
    });

    // Capture a list of what looks to be absolute internal links.
    // We'll later remember which of them have translations,
    // and use that to render localized internal links when available.

    // TODO: check against links with no trailing slashes
    // or that already link to translations.
    const markdown = node.internal.content;
    let maybeAbsoluteLinks = [];
    let linkRe = /\]\((\/[^\)]+\/)\)/g;
    let match = linkRe.exec(markdown);
    while (match != null) {
      maybeAbsoluteLinks.push(match[1]);
      match = linkRe.exec(markdown);
    }
    createNodeField({
      node,
      name: 'maybeAbsoluteLinks',
      value: _.uniq(maybeAbsoluteLinks),
    });
  }
};
