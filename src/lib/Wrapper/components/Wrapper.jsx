import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Wrapper
 */
const Wrapper = ({ children, ...props }) => {
  const ref = useRef();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  const update = useCallback(() => {
    if (ref.current) {
      const { height: h, width: w } = ref.current.getBoundingClientRect();

      if (height !== h) {
        setHeight(h);
      }

      if (width !== w) {
        setWidth(w);
      }
    }
  }, [height, width]); // eslint-disable-line

  useEffect(() => {
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener(update);
    };
  }, []); // eslint-disable-line

  return (
    <div {...props} ref={ref}>
      {height &&
        width &&
        React.cloneElement(children, {
          ...children.props,
          height,
          width,
        })}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;
