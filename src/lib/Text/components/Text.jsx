import { css } from 'glamor';
import katex from 'katex';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useMemo } from 'react';
import 'katex/dist/katex.min.css';
import '../styles/index.css';

const defaultOrigin = {
  horizontal: 'center',
  vertical: 'center'
};

const containerStyles = css({
  // border: '1px solid blue',
  height: 100,
  overflow: 'visible',
  position: 'relative',
  width: 100
});

const contentStyles = css({
  // border: '1px solid red',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  padding: 8,
  position: 'aboluste',
  width: '100%'
});

/**
 * Text
 */
const Text = ({ children, style, transformOrigin, x, y, ...props }) => {
  const ref = useRef();

  const [margin, align] = useMemo(() => {
    let alignItems, justifyContent, left, top;

    switch (transformOrigin.horizontal) {
      case 'center':
        justifyContent = 'center';
        left = '-50%';
        break;
      case 'right':
        justifyContent = 'flex-end';
        left = '-100%';
        break;
      case 'left':
      default:
        justifyContent = 'flex-start';
        left = 0;
        break;
    }

    switch (transformOrigin.vertical) {
      case 'bottom':
        alignItems = 'flex-end';
        top = '-100%';
        break;
      case 'center':
        alignItems = 'center';
        top = '-50%';
        break;
      case 'top':
      default:
        alignItems = 'flex-start';
        top = 0;
        break;
    }

    return [
      {
        left,
        top
      },
      {
        alignItems,
        justifyContent
      }
    ];
  }, [transformOrigin.horizontal, transformOrigin.vertical]);

  useEffect(() => {
    const elem = ref.current;

    if (!elem) {
      return;
    }

    katex.render(`\\sf{\\displaystyle ${children.toString()}}`, elem);
  }, [children]);

  return (
    <foreignObject {...containerStyles} x={x} y={y}>
      <div
        {...contentStyles}
        {...props}
        ref={ref}
        style={{
          alignItems: align.alignItems,
          justifyContent: align.justifyContent,
          marginLeft: margin.left,
          marginTop: margin.top,
          ...style
        }}
      />
    </foreignObject>
  );
};

Text.defaultProps = {
  transformOrigin: defaultOrigin
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  style: PropTypes.object,
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'center', 'top']).isRequired
  }).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Text;
