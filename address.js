const rlp = require('rlp')
const keccak = require('keccak')

var nonce = 0xe
var sender = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'

var input_arr = [sender, nonce]
var rlp_encoded = rlp.encode(input_arr)

var contract_address_long = keccak('keccak256')
  .update(Buffer.from(rlp_encoded))
  .digest('hex')

var contract_address = contract_address_long.substring(24)
console.log('contract_address: 0x' + contract_address)