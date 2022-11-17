import crypto from 'crypto';

export const generateDigest = (payload) => {
  let buffer = Buffer.from(payload, 'utf8');

  const hash = crypto.createHash('sha256');

  hash.update(buffer);

  let digest = hash.digest('base64');
  // console.log('----------------------------------------');
  // console.log(digest);
  // console.log('----------------------------------------');
  return digest;
};
