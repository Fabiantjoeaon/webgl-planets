import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

import { GlobalStyle } from "../components/GlobalStyle";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GlobalStyle />
  </Layout>
);

export default IndexPage;
