import { parse } from 'mathjs';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useGraph } from 'lib/Graph';

const styles = {
  fill: 'none',
  strokeWidth: 3
};

/**
 * Draw
 */
const Draw = ({ color, fn, resolution, ...props }) => {
  const { coord, x } = useGraph();

  const step = useMemo(() => (x.MAX - x.MIN) / resolution, [resolution, x]);

  const path = useMemo(() => {
    try {
      const f = parse(fn);

      const points = new Array(resolution).fill(true).map((_, i) => {
        const a = x.MIN + i * step,
          fa = f.evaluate({ x: a });

        return coord(a, fa);
      });

      const first = points.shift();
      const start = `M ${first.x} ${first.y}`;

      return points.reduce((p, pt) => `${p}, L ${pt.x} ${pt.y}`, start);
    } catch (e) {
      console.log(e);
      return '';
    }
  }, [coord, fn, resolution, step, x]);

  return <path {...styles} {...props} stroke={color} d={path} />;
};

Draw.defaultProps = {
  color: '#ff4081',
  resolution: 200
};

Draw.propTypes = {
  color: PropTypes.string.isRequired,
  fn: PropTypes.string.isRequired,
  resolution: PropTypes.number.isRequired
};

export default Draw;
