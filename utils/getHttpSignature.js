import crypto from 'crypto';

import { generateDigest } from './generateDigest.js';

import {
  REQUEST_HOST,
  MERCHANT_ID,
  MERCHANT_KEY_ID,
  MERCHANT_SECRET_KEY,
  PAYLOAD,
} from '../constants.js';

export const getHttpSignature = ({ resource, method, payload }) => {
  let signatureHeader = '';
  let signatureValue = '';

  // KeyId is the key obtained from EBC
  signatureHeader += 'keyid="' + MERCHANT_KEY_ID + '"';

  // Algorithm should be always HmacSHA256 for http signature
  signatureHeader += ', algorithm="HmacSHA256"';

  // Headers - list is choosen based on HTTP method.
  // Digest is not required for GET Method
  if (method === 'get') {
    let headersForGetMethod = 'host date (request-target) v-c-merchant-id';
    signatureHeader += ', headers="' + headersForGetMethod + '"';
  } else if (method === 'post') {
    let headersForPostMethod =
      'host date (request-target) digest v-c-merchant-id';
    signatureHeader += ', headers="' + headersForPostMethod + '"';
  }

  let signatureString = 'host: ' + REQUEST_HOST;

  signatureString += '\ndate: ' + new Date(Date.now()).toUTCString();
  signatureString += '\n(request-target): ';

  if (method === 'get') {
    let targetUrlForGet = 'get ' + resource;
    signatureString += targetUrlForGet + '\n';
  } else if (method === 'post') {
    // Digest for POST call
    var digest = generateDigest(payload);

    var targetUrlForPost = 'post ' + resource;
    signatureString += targetUrlForPost + '\n';

    signatureString += 'digest: SHA-256=' + digest + '\n';
  }

  signatureString += 'v-c-merchant-id: ' + MERCHANT_ID;

  var data = new Buffer.from(signatureString, 'utf8');

  // Decoding scecret key
  var key = new Buffer.from(MERCHANT_SECRET_KEY, 'base64');

  signatureValue = crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('base64');

  signatureHeader += ', signature="' + signatureValue + '"';

  return signatureHeader;
};
