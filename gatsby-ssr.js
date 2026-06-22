/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="umami-analytics"
      defer
      src="https://um.kairo.click/script.js"
      data-website-id="ec0fb75b-9c8c-47be-b45e-60bb19756944"
    />,
  ]);
};
