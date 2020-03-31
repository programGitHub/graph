import { css } from 'glamor';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Text from 'lib/Text';
import { useGraph } from 'lib/Graph';

const strokeAttrs = {
  strokeDasharray: '5 5',
  strokeWidth: 1
};

const styles = css({
  fontFamily: 'Roboto, Arial, sans-serif !important',
  fontSize: 20,
  fontWeight: 600,
  textShadow: '2px 2px 5px rgba(100,100,100,0.2)'
});

/**
 * Point
 */
const Point = ({
  color,
  label,
  noLines,
  transformOrigin,
  x: xProp,
  y: yProp
}) => {
  const { coord } = useGraph();

  const xZero = useMemo(() => coord(0, yProp), [coord, yProp]);
  const yZero = useMemo(() => coord(xProp, 0), [coord, xProp]);
  const pt = useMemo(() => coord(xProp, yProp), [coord, xProp, yProp]);

  return (
    <g>
      {!noLines && (
        <>
          <line
            {...strokeAttrs}
            stroke={color}
            x1={xZero.x}
            x2={pt.x}
            y1={xZero.y}
            y2={pt.y}
          />
          <line
            {...strokeAttrs}
            stroke={color}
            x1={yZero.x}
            x2={pt.x}
            y1={yZero.y}
            y2={pt.y}
          />
        </>
      )}

      <circle cx={pt.x} cy={pt.y} fill={color} r={4} />

      {label && (
        <Text
          {...styles}
          style={{ color }}
          transformOrigin={transformOrigin}
          x={pt.x}
          y={pt.y}
        >
          {label}
        </Text>
      )}
    </g>
  );
};

Point.defaultProps = {
  color: '#797979',
  noLines: false,
  transformOrigin: { horizontal: 'right', vertical: 'bottom' }
};

Point.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string,
  noLines: PropTypes.bool.isRequired,
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired
  }).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Point;
