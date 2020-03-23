import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';

const styles = css({
  backgroundColor: '#fafafa',
  height: '100%',
  width: '100%'
});

/**
 * Graph
 */
const Graph = ({ children }) => (
  <svg {...styles} viewBox="0 0 100 100">
    {children}
  </svg>
);

Graph.propTypes = {
  children: PropTypes.node
};

export default Graph;
