import { parse } from 'mathjs';
import Point from 'lib/Point';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

/**
 * CurvePoints
 */
const CurvePoints = ({ color, fn, label, transformOrigin, x }) => {
  const points = useMemo(() => {
    const f = parse(fn);

    if (typeof x === 'number') {
      return [
        {
          color,
          label: Array.isArray(label) ? label[0] : label,
          transformOrigin,
          x,
          y: f.evaluate({ x })
        }
      ];
    }

    return x.map((e, i) => ({
      color,
      label: Array.isArray(label) ? label[i] : label,
      transformOrigin,
      x: e,
      y: f.evaluate({ x: e })
    }));
  }, [color, fn, label, transformOrigin, x]);

  return (
    <>
      {points.map(point => (
        <Point {...point} key={point.x} />
      ))}
    </>
  );
};

CurvePoints.defaultProps = {
  color: '#797979'
};

CurvePoints.propTypes = {
  color: PropTypes.string.isRequired,
  fn: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  transformOrigin: PropTypes.object,
  x: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired
};

export default CurvePoints;
