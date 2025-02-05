const isnull = (value) => undefined === value || null === value;

const isNotnull = (value) => false === isnull(value);

export {isnull, isNotnull};
