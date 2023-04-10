export const getType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

export const isObject = (item) => getType(item) === 'object';

export const isArray = (item) => getType(item) === 'array';

export const isPrimitive = (item) => getType(item) !== 'object' && getType(item) !== 'array';