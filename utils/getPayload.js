import { PAYLOAD } from '../constants.js';

const parsedPayload = JSON.parse(PAYLOAD);

const { save, name, timezone, query, limit, sort } = parsedPayload;

export const getPayload = ({ offset }) => {
  let payload = JSON.stringify({
    save,
    name,
    timezone,
    query,
    offset,
    limit,
    sort,
  });
  return payload;
};
