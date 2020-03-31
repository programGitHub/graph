import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Scale from './Scale';
import useGraph from '../hooks/useGraph';
import useLines from '../hooks/useLines';

/**
 * Scales
 */
const Scales = ({ values }) => {
  const { coord, gridBounds, x, y } = useGraph();
  const getLine = useLines();

  const xScales = useMemo(() => {
    if (x.MAX < 0 || x.MIN > 0) {
      return null;
    }

    const v =
      values && Array.isArray(values.x)
        ? values.x
        : getLine(x.MIN, x.MAX, gridBounds.x);

    const scales = v.map(e =>
      typeof e === 'number'
        ? {
            coord: coord(e, 0),
            label: e
          }
        : {
            coord: coord(e.value, 0),
            label: e.label
          }
    );

    return scales;
  }, [coord, getLine, gridBounds.x, values, x]);

  const yScales = useMemo(() => {
    if (y.MAX < 0 || y.MIN > 0) {
      return null;
    }

    const v =
      values && Array.isArray(values.y)
        ? values.y
        : getLine(y.MIN, y.MAX, gridBounds.y);

    const scales = v.map(e =>
      typeof e === 'number'
        ? {
            coord: coord(0, e),
            label: e
          }
        : {
            coord: coord(0, e.value),
            label: e.label
          }
    );

    return scales;
  }, [coord, getLine, gridBounds.y, values, y]);

  return (
    <g id="scales">
      {xScales &&
        xScales.map(e => (
          <Scale
            key={e.label}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            x={e.coord.x}
            y={e.coord.y}
          >
            {e.label}
          </Scale>
        ))}
      {yScales &&
        yScales.map(e => (
          <Scale
            key={e.label}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            x={e.coord.x}
            y={e.coord.y}
          >
            {e.label}
          </Scale>
        ))}
    </g>
  );
};

Scales.propTypes = {
  values: PropTypes.shape({
    x: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired
        }),
        PropTypes.number
      ]).isRequired
    ),
    y: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired
        }),
        PropTypes.number
      ]).isRequired
    )
  })
};

export default Scales;
