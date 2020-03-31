import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useGraph from '../hooks/useGraph';
import useLines from '../hooks/useLines';

const attrs = {
  stroke: 'black',
  strokeWidth: 0.3
};

/**
 * Grid
 */
const Grid = ({ values }) => {
  const { coord, gridBounds, x, y } = useGraph();
  const getLines = useLines();

  const hL = useMemo(() => {
    const a =
      values && Array.isArray(values.y)
        ? values.y.map(e => (typeof e === 'object' ? e.value : e))
        : getLines(y.MIN, y.MAX, gridBounds.y);

    return a.map(e => ({
      end: coord(x.MAX, e),
      start: coord(x.MIN, e)
    }));
  }, [coord, getLines, gridBounds.y, values, x, y]);

  const vL = useMemo(() => {
    const a =
      values && Array.isArray(values.x)
        ? values.x.map(e => (typeof e === 'object' ? e.value : e))
        : getLines(x.MIN, x.MAX, gridBounds.x);

    return a.map(e => ({
      end: coord(e, y.MAX),
      start: coord(e, y.MIN)
    }));
  }, [coord, getLines, gridBounds.x, values, x, y]);

  return (
    <g id="grid">
      {hL.map((pt, i) => (
        <line
          {...attrs}
          key={i}
          x1={pt.start.x}
          x2={pt.end.x}
          y1={pt.start.y}
          y2={pt.end.y}
        />
      ))}
      {vL.map((pt, i) => (
        <line
          {...attrs}
          key={i}
          x1={pt.start.x}
          x2={pt.end.x}
          y1={pt.start.y}
          y2={pt.end.y}
        />
      ))}
    </g>
  );
};

Grid.propTypes = {
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

export default Grid;
