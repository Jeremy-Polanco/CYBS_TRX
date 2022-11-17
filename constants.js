const REQUEST_HOST = 'api.cybersource.com';
const MERCHANT_ID = 'visanetdr';
const MERCHANT_KEY_ID = '8073017c-3161-4cd1-bc91-818b1a291464';
const MERCHANT_SECRET_KEY = 'sdPENEuMunNgou7W7y1KmqthpYel6UhVedR1oMBVi9g=';
const PAYLOAD = JSON.stringify({
  save: 'false',
  name: 'Transacciones',
  timezone: 'America/La_Paz',
  query: 'submitTimeUtc: [NOW/DAY-1DAY TO NOW/DAY}',
  offset: 0,
  limit: 2500,
  sort: 'id:asc,submitTimeUtc:asc',
});
const RESOURCE = '/tss/v2/searches/';
const METHOD = 'post';
const URL = `https://${REQUEST_HOST}${RESOURCE}`;
const CONTENT_TYPE = 'application/json;charset=utf-8';
const USER_AGENT = 'Mozilla/5.0';

export {
  REQUEST_HOST,
  MERCHANT_ID,
  MERCHANT_KEY_ID,
  MERCHANT_SECRET_KEY,
  PAYLOAD,
  RESOURCE,
  METHOD,
  URL,
  CONTENT_TYPE,
  USER_AGENT,
};
