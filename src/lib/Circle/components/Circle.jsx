import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useGraph } from 'lib/Graph';

/**
 * Circle
 */
const Circle = ({ color, r: rProp, width, x: xProp, y: yProp }) => {
  const { coord } = useGraph();

  const { x, y } = useMemo(() => coord(xProp, yProp), [coord, xProp, yProp]);
  const r = useMemo(() => {
    const { x: xOrigin } = coord(0, 0);
    const { x: xPoint } = coord(rProp, 0);

    return Math.abs(xPoint - xOrigin);
  }, [coord, rProp]);

  return (
    <circle
      cx={x}
      cy={y}
      fill="none"
      r={r}
      stroke={color}
      strokeWidth={width}
    />
  );
};

Circle.defaultProps = {
  color: '#757575',
  width: 3
};

Circle.propTypes = {
  color: PropTypes.string.isRequired,
  r: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Circle;
