import { css } from 'glamor';
import React from 'react';
import Text from 'lib/Text';

const color = '#797979';

const styles = css({
  color: color,
  fontSize: 12,
  fontWeight: 500
});

/**
 * Scale
 */
const Scale = props => <Text {...props} {...styles} />;

export default Scale;
