import { generateDigest, getHttpSignature } from './index.js';

import {
  REQUEST_HOST,
  USER_AGENT,
  CONTENT_TYPE,
  MERCHANT_ID,
  RESOURCE,
  METHOD,
} from '../constants.js';

const getCybersourceHeaders = (payload) => {
  const signature = getHttpSignature({
    resource: RESOURCE,
    method: METHOD,
    payload,
  });

  let digest = generateDigest(payload);
  digest = `SHA-256=${digest}`;

  const config = {
    headers: {
      digest,
      'v-c-merchant-id': MERCHANT_ID,
      date: new Date(Date.now()).toUTCString(),
      host: REQUEST_HOST,
      signature,
      'User-Agent': USER_AGENT,
      'Content-Type': CONTENT_TYPE,
    },
  };

  return config;
};

export { getCybersourceHeaders };
