import React, { useMemo } from 'react';
import useGraph from '../hooks/useGraph';

const attrs = {
  stroke: 'black',
  strokeWidth: 2
};

/**
 * Axes
 */
const Axes = () => {
  const { coord, x, y } = useGraph();

  const xAxe = useMemo(() => {
    if (y.MAX < 0 || y.MIN > 0) {
      return null;
    }

    const axe = {
      end: coord(0, y.MAX),
      start: coord(0, y.MIN)
    };

    return axe;
  }, [coord, y]);

  const yAxe = useMemo(() => {
    if (x.MAX < 0 || x.MIN > 0) {
      return null;
    }

    const axe = {
      end: coord(x.MAX, 0),
      start: coord(x.MIN, 0)
    };

    return axe;
  }, [coord, x]);

  return (
    <g id="axes">
      {xAxe && (
        <line
          {...attrs}
          id="x"
          x1={xAxe.start.x}
          y1={xAxe.start.y}
          x2={xAxe.end.x}
          y2={xAxe.end.y}
        />
      )}
      {yAxe && (
        <line
          {...attrs}
          ix="y"
          x1={yAxe.start.x}
          y1={yAxe.start.y}
          x2={yAxe.end.x}
          y2={yAxe.end.y}
        />
      )}
    </g>
  );
};

export default Axes;
