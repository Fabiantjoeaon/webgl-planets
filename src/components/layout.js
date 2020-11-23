import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { BackgroundGradient } from "./BackgroundGradient";
import { useWindowSize } from "./hooks";
import { Scene } from "./Scene";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { width, height } = useWindowSize();

  return (
    <main>
      {children}
      <Scene />
      <BackgroundGradient width={width} height={height} />
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
