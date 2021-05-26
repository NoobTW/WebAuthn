const base64url = require('base64url');
const elliptic = require('elliptic');
const NodeRSA = require('node-rsa');
const cbor = require('cbor');
const { parseAuthData, COSEECDHAtoPKCS } = require('./common');
const {
  COSE_KEYS, COSE_KTY, COSE_RSA_SCHEME,
} = require('./cose');

const EdDSA = elliptic.eddsa;

async function noneAttestation(ctapCredentialResponse) {
  const authenticatorDataStruct = parseAuthData(ctapCredentialResponse.authData);

  const publicKeyCose = cbor.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.EC2) {
    const ansiKey = COSEECDHAtoPKCS(publicKeyCose);

    return {
      verified: true,
      authrInfo: {
        fmt: 'none',
        publicKey: ansiKey,
        counter: authenticatorDataStruct.counter,
        credID: base64url(authenticatorDataStruct.credID),
      },
    };
  }
  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.RSA) {
    const signingScheme = COSE_RSA_SCHEME[publicKeyCose.get(COSE_KEYS.alg)];
    const key = new NodeRSA(undefined, { signingScheme });
    key.importKey({
      n: publicKeyCose.get(COSE_KEYS.n),
      e: publicKeyCose.get(COSE_KEYS.e),
    }, 'components-public');
    return {
      verified: true,
      authrInfo: {
        fmt: 'none',
        publicKey: key.exportKey('pkcs1-public-pem'),
        counter: authenticatorDataStruct.counter,
        credID: base64url(authenticatorDataStruct.credID),
      },
    };
  }
  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.OKP) {
    const x = publicKeyCose.get(COSE_KEYS.x);
    const key = new EdDSA('ed25519');
    key.keyFromPublic(x);

    return {
      verified: true,
      authrInfo: {
        fmt: 'none',
        publicKey: key,
        counter: authenticatorDataStruct.counter,
        credID: base64url(authenticatorDataStruct.credID),
      },
    };
  }
  return null;
}

module.exports = noneAttestation;
