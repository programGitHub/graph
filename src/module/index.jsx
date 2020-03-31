import Graph, { Circle, CurvePoints, Draw, Point } from 'lib';
import React from 'react';

/**
 * Root
 */
const Root = () => (
  <div style={{ display: 'flex' }}>
    <Graph x={[-1.5, 1.5]} y={[-1, 2]}>
      <Draw color="#49a5fc" fn="x^2" />
      <Point
        label="A"
        x={1}
        y={1}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      />
      <Point color="#ca3567" label="B" x={0.5} y={0.25} />
      <CurvePoints
        color="#689f38"
        fn="x^2"
        label={['C', 'D']}
        x={[-0.5, -1]}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      />
    </Graph>

    <div style={{ width: 16 }} />

    <Graph x={[-1.5, 1.5]} y={[-1.5, 1.5]}>
      <Circle color="#363636" r={1} x={0} y={0} />
      <Point
        color="#d32f2f"
        latex="\frac{\pi}{2}"
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        x={0}
        y={1}
      />
      <Point
        color="#d32f2f"
        label="0"
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        x={1}
        y={0}
      />
      <Point
        color="#d32f2f"
        label="pi"
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        x={-1}
        y={0}
      />
      <Point
        color="#d32f2f"
        label="\frac{\pi}{3}"
        noLines
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        x={0.5}
        y={0.86602540378}
      />
      <Point
        color="#d32f2f"
        label="4pi/3"
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        x={-0.5}
        y={-0.86602540378}
      />
    </Graph>

    <div style={{ width: 16 }} />

    <Graph>
      <Draw fn="x^3" />
      <Draw fn="x-1" color="blue" />
      <Draw fn="1-3*x" color="orange" />
      <CurvePoints
        fn="x^3"
        x={[1, 1.5]}
        color="green"
        label={['A', 'B']}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      />
      <Point
        x={0.5}
        y={-0.5}
        latex="\text{intersection}"
        transformOrigin={{ horizontal: 'left', vertical: 'center' }}
      />
    </Graph>
  </div>
);

export default Root;
