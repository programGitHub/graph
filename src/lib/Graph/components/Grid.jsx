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
const Grid = () => {
  const { coord, gridBounds, x, y } = useGraph();
  const getLines = useLines();

  const hL = useMemo(() => {
    const a = getLines(y.MIN, y.MAX, gridBounds.y);

    return a.map(e => ({
      end: coord(x.MAX, e),
      start: coord(x.MIN, e)
    }));
  }, [coord, getLines, gridBounds.y, x, y]);

  const vL = useMemo(() => {
    const a = getLines(x.MIN, x.MAX, gridBounds.x);

    return a.map(e => ({
      end: coord(e, y.MAX),
      start: coord(e, y.MIN)
    }));
  }, [coord, getLines, gridBounds.x, x, y]);

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

export default Grid;
