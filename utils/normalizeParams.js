import { paramToString } from './paramToString.js';

export const normalizeParams = (params) => {
  let newParams = {};
  for (let key in params) {
    if (
      params.hasOwnProperty(key) &&
      params[key] != undefined &&
      params[key] != null
    ) {
      let value = params[key];
      if (Array.isArray(value)) {
        newParams[key] = value;
      } else {
        newParams[key] = paramToString(value);
      }
    }
  }
  return newParams;
};
