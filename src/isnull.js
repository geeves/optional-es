const isnull = (value) => undefined === value || null === value;

const isnotnull = (value) => false === isnull(value);

export {isnull, isnotnull};
