const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { supportedLanguages } = require('./i18n');
const allEnterprises = require('./src/assets/enterprises.json');
const {
  splitEnterprisesByName,
} = require('./src/utils/split-enterprises-by-name');
const {
  splitEnterprisesByRegion,
} = require('./src/utils/split-enterprises-by-region');

function removeAccents(str) {
  let accents =
    'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  let accentsOut =
    'AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
  str = str.split('');
  str.forEach((letter, index) => {
    let i = accents.indexOf(letter);
    if (i != -1) {
      str[index] = accentsOut[i];
    }
  });
  return str.join('');
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const getEnterprises = allEnterprises.slice(0, 40);

    const getSlug = enterprise => {
      const parseName = removeAccents(
        enterprise.name
          .split(' ')
          .join('-')
          .split('.')
          .join('')
          .toLowerCase()
      );
      return `/entreprise/${parseName}/`;
    };
    const getSlugRegion = region => {
      const parseName = removeAccents(
        region.name.replace(/ \([0-9]+\)/gi, '').toLowerCase()
      );
      return `/entreprises/par-region/${parseName}/`;
    };
    const enterprises = getEnterprises.map(enterprise => ({
      ...enterprise,
      slug: getSlug(enterprise),
    }));

    const enterprisesAlphabeticalOrdered = splitEnterprisesByName(enterprises);
    const getEnterprisesByRegion = splitEnterprisesByRegion(enterprises);
    const regionFilterByEnterprises = getEnterprisesByRegion
      .filter(({ enterprises }) => enterprises.length > 0)
      .map(region => ({
        ...region,
        slug: getSlugRegion(region),
      }));

    createPage({
      path: '/',
      component: path.resolve('./src/templates/site-index.js'),
      context: {
        enterprises,
        href: '/',
        regions: regionFilterByEnterprises,
      },
    });

    createPage({
      path: '/blog/',
      component: path.resolve('./src/templates/blog-index.js'),
      context: {
        langKey: 'fr',
        enterprises,
        href: '/blog/',
        regions: regionFilterByEnterprises,
      },
    });

    enterprisesAlphabeticalOrdered.forEach(letter => {
      createPage({
        path: `/entreprises/par-ordre-alphabetique/${letter.letter}/`,
        component: path.resolve('./src/templates/enterprise-index.js'),
        context: {
          footerEnterprises: enterprises,
          enterprises: letter.enterprises,
          letter: letter.letter,
          href: `/entreprises/par-ordre-alphabetique/${letter.letter}/`,
          letters: enterprisesAlphabeticalOrdered.map(l => ({
            letter: l.letter,
            isActive: l.letter === letter.letter,
            hasEnterprises: l.enterprises.length > 0,
            slug: `/entreprises/par-ordre-alphabetique/${l.letter}/`,
          })),
          regions: regionFilterByEnterprises,
        },
      });
    });

    regionFilterByEnterprises.forEach((region, index) => {
      createPage({
        path: getSlugRegion(region),
        component: path.resolve('./src/templates/enterprise-region-index.js'),
        context: {
          enterprises: region.enterprises,
          regionName: region.name,
          regions: regionFilterByEnterprises,
        },
      });
    });

    enterprises.forEach((enterprise, index) => {
      createPage({
        path: getSlug(enterprise),
        component: path.resolve('./src/templates/enterprise-page.js'),
        context: {
          href: getSlug(enterprise),
          regions: regionFilterByEnterprises,
          enterprise,
          enterprises: enterprises.filter(
            ({ name }) => enterprise.name !== name
          ),
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
              href: post.node.fields.slug,
              regions: regionFilterByEnterprises,
              previous,
              next,
              translations,
              translatedLinks: [],
              enterprises,
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
