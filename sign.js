const {
  generateKeyPairSync,
  sign,
  verify,
  publicEncrypt,
  privateDecrypt
} = require('crypto');
const data = require('./data.json');
const boyKeys = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});
const girlKeys = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});
// Bob step
const message = new Buffer.from(JSON.stringify(data));
const enc = publicEncrypt(girlKeys.publicKey, message);
const signature = sign('sha256', enc, boyKeys.privateKey);

// Alice step
const isValid = verify('sha256', enc, boyKeys.publicKey, signature);
if (isValid) {
  console.log('valid success!', isValid)
  const dec = privateDecrypt(girlKeys.privateKey, enc);
  console.log(dec.toString());
}
