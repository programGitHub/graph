import Axes from './Axes';
import { css } from 'glamor';
import Grid from './Grid';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import Scales from './Scales';

const defaultCoords = {
  x: [-5, 5],
  y: [-5, 5]
};

export const Context = React.createContext({
  ...defaultCoords
});

const styles = css({
  backgroundColor: '#fafafa',
  fontFamily: 'Arial, sans-serif'
});

/**
 * Graph
 */
const Graph = ({
  children,
  grid,
  height,
  scales,
  width,
  x: xRange,
  y: yRange
}) => {
  const x = useMemo(() => ({ MAX: xRange[1], MIN: xRange[0] }), [xRange]);
  const y = useMemo(() => ({ MAX: yRange[1], MIN: yRange[0] }), [yRange]);
  const xRatio = useMemo(() => width / (x.MAX - x.MIN), [width, x]);
  const yRatio = useMemo(() => height / (y.MAX - y.MIN), [height, y]);

  const coord = useCallback(
    (a, b) => {
      return {
        x: (a - x.MIN) * xRatio,
        y: (y.MAX - b) * yRatio
      };
    },
    [x, xRatio, y, yRatio]
  );

  const gridBounds = useMemo(() => {
    return {
      x: {
        MAX: Math.round(width / 50),
        MIN: Math.round(width / 100)
      },
      y: {
        MAX: Math.round(height / 50),
        MIN: Math.round(height / 100)
      }
    };
  }, [height, width]);

  return (
    <Context.Provider value={{ coord, gridBounds, x, y }}>
      <svg
        {...styles}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        {grid && <Grid values={scales} />}
        <Axes />
        {children}
        <Scales values={scales} />
      </svg>
    </Context.Provider>
  );
};

Graph.defaultProps = {
  ...defaultCoords,
  grid: true,
  height: 500,
  width: 500
};

Graph.propTypes = {
  children: PropTypes.node,
  grid: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  scales: PropTypes.object,
  width: PropTypes.number.isRequired,
  x: PropTypes.arrayOf(PropTypes.number.isRequired),
  y: PropTypes.arrayOf(PropTypes.number.isRequired)
};

export default Graph;
