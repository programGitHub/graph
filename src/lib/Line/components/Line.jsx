import PropTypes from 'prop-types';
import React from 'react';

/**
 * Line
 */
const Line = props => <line {...props} stroke="black" />;

Line.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired
};

export default Line;
