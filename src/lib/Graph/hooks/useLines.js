import { useCallback } from 'react';

function getMagnitude(range) {
  const order = range.toString().length - 1;
  return Math.pow(10, range < 1 ? -order : order);
}

function getLevel(range, magnitude, trigger) {
  const v = Math.floor(range / magnitude);

  if (v > trigger.MAX) {
    return magnitude * 2.5;
  }

  if (v < trigger.MIN) {
    return v * 2 > trigger.MIN
      ? magnitude / 2
      : getLevel(range, magnitude / 10, trigger);
  }

  return magnitude;
}

function getLines(min, max, level) {
  const start = Math.sign(min) * Math.ceil((Math.abs(min) - level) / level);
  const a = [];

  for (let i = start; i * level < max; i++) {
    if (i !== 0) a.push(i * level);
  }

  return a;
}

function useLines() {
  return useCallback((min, max, triggerProp) => {
    const trigger = {
      MAX: 10,
      MIN: 5,
      ...triggerProp
    };

    const range = max - min;

    const magnitude = getMagnitude(range);

    const level = getLevel(range, magnitude, trigger);

    return getLines(min, max, level);
  }, []);
}

export default useLines;
