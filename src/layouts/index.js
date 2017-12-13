import React from 'react';
import { func, shape, string } from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';
import { Provider } from 'rebass';

import theme from '../theme';
import Header from '../components/Header';
import Footer from '../components/Footer';

const propTypes = {
  children: func.isRequired,
  data: shape({
    site: shape({
      siteMetadata: shape({
        title: string,
        description: string,
      }),
    }),
  }).isRequired,
};

/* eslint-disable no-unused-expressions */

injectGlobal`
  *,
  *:before,
  *:after {
    transition: inherit;
  }

  body {
    margin: 0;
    transition: color 0.15s, background-color 0.15s, box-shadow 0.15s;
  }

  a {
    text-decoration: none;
  }
`;

/* eslint-enable no-unused-expressions */

function Template({
  children,
  data: { site: { siteMetadata: { title, description } } },
}) {
  return (
    <Provider theme={theme}>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <Header />
        {children()}
        <Footer />
      </div>
    </Provider>
  );
}

Template.propTypes = propTypes;

export default Template;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
