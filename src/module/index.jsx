import Graph, { Line } from 'lib';
import React from 'react';

/**
 * Root
 */
const Root = () => (
  <div style={{ height: 500, margin: 'auto', width: 500 }}>
    <Graph>
      <Line x1={0} x2={100} y1={50} y2={50} />
      <Line x1={50} x2={50} y1={0} y2={100} />
    </Graph>
  </div>
);

export default Root;
