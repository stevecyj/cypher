const {
  generateKeyPairSync,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash
} = require('crypto')
const { publicKey, privateKey } = generateKeyPairSync('ed25519', {
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
})
const iv = randomBytes(16).toString('hex').slice(0, 16)
const key = createHash('sha256').update(publicKey).digest('base64')

const message = new Buffer.from('Hello World!')

const cipher = createCipheriv('aes-256-gcm', key.substr(0, 32), iv)
const encrypted = cipher.update(message, 'utf8', 'hex')
const encryptedFinal = cipher.final('hex')

const msgCipher = encrypted + encryptedFinal

const decipher = createDecipheriv('aes-256-gcm', key.substr(0, 32), iv)
const msgDecipher = decipher.update(msgCipher, 'hex', 'utf8')
console.log(msgDecipher.toString())
