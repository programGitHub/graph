import React, { useMemo } from 'react';
import Scale from './Scale';
import useGraph from '../hooks/useGraph';
import useLines from '../hooks/useLines';

/**
 * Scales
 */
const Scales = () => {
  const { coord, gridBounds, x, y } = useGraph();
  const getLine = useLines();

  const xScales = useMemo(() => {
    if (x.MAX < 0 || x.MIN > 0) {
      return null;
    }

    const values = getLine(x.MIN, x.MAX, gridBounds.x);
    const scales = values.map(e => ({
      coord: coord(e, 0),
      label: e
    }));

    return scales;
  }, [coord, getLine, gridBounds.x, x]);

  const yScales = useMemo(() => {
    if (y.MAX < 0 || y.MIN > 0) {
      return null;
    }

    const values = getLine(y.MIN, y.MAX, gridBounds.y);
    const scales = values.map(e => ({
      coord: coord(0, e),
      label: e
    }));

    return scales;
  }, [coord, getLine, gridBounds.y, y]);

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

export default Scales;
