'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0$1 = require('base64url');
var require$$0 = require('crypto');
var require$$3 = require('cbor');
var require$$2 = require('jsrsasign');
var require$$1 = require('elliptic');
var require$$2$1 = require('node-rsa');
var require$$0$2 = require('@lapo/asn1js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);

const crypto$1 = require$$0__default['default'];
const cbor$4 = require$$3__default['default'];
const jsrsasign = require$$2__default['default'];

function hash$5(alg, data) {
  return crypto$1.createHash(alg).update(data).digest();
}

function parseAuthData$5(buf) {
  let buffer = buf;
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);

  const flagsInt = flagsBuf[0];
  const flags = {
    up: !!(flagsInt & 0x01),
    uv: !!(flagsInt & 0x04),
    at: !!(flagsInt & 0x40),
    ed: !!(flagsInt & 0x80),
    flagsInt,
  };

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);

  const counter = counterBuf.readUInt32BE(0);
  const aaguid = buffer.slice(0, 16);
  buffer = buffer.slice(16);

  const credIDLenBuf = buffer.slice(0, 2);
  buffer = buffer.slice(2);

  const credIDLen = credIDLenBuf.readUInt16BE(0);
  const credID = buffer.slice(0, credIDLen);
  buffer = buffer.slice(credIDLen);

  const COSEPublicKey = buffer;

  return {
    rpIdHash,
    flagsBuf,
    flags,
    counter,
    counterBuf,
    aaguid,
    credID,
    COSEPublicKey,
  };
}
async function verifySignature$5(signature, data, publicKey) {
  return crypto$1.createVerify('SHA256').update(data).verify(publicKey, signature);
}

function COSEECDHAtoPKCS$5(COSEPublicKey) {
  const coseStruct = cbor$4.decodeAllSync(COSEPublicKey)[0];
  const tag = Buffer.from([0x04]);
  const x = coseStruct.get(-2);
  const y = coseStruct.get(-3);

  return Buffer.concat([tag, x, y]);
}

function base64ToPem$2(base64cert) {
  let pemcert = '';
  for (let i = 0; i < base64cert.length; i += 64) { pemcert += `${base64cert.slice(i, i + 64)}\n`; }

  return `-----BEGIN CERTIFICATE-----\n${pemcert}-----END CERTIFICATE-----`;
}

function validateCertificationPath$2(certificates) {
  if (new Set(certificates).size !== certificates.length) { throw new Error('Failed to validate certificates path! Dublicate certificates detected!'); }

  for (let i = 0; i < certificates.length; i++) {
    const subjectPem = certificates[i];
    const subjectCert = new jsrsasign.X509();
    subjectCert.readCertPEM(subjectPem);

    let issuerPem = '';
    if (i + 1 >= certificates.length) issuerPem = subjectPem;
    else issuerPem = certificates[i + 1];

    const issuerCert = new jsrsasign.X509();
    issuerCert.readCertPEM(issuerPem);

    if (subjectCert.getIssuerString() !== issuerCert.getSubjectString()) { throw new Error('Failed to validate certificate path! Issuers dont match!'); }

    const subjectCertStruct = jsrsasign.ASN1HEX.getTLVbyList(subjectCert.hex, 0, [0]);
    const algorithm = subjectCert.getSignatureAlgorithmField();
    const signatureHex = subjectCert.getSignatureValueHex();

    const Signature = new jsrsasign.crypto.Signature({ alg: algorithm });
    Signature.init(issuerPem);
    Signature.updateHex(subjectCertStruct);

    if (!Signature.verify(signatureHex)) throw new Error('Failed to validate certificate path!');
  }
}

function getCertificationInfo$2(certificate) {
  const subjectCert = new jsrsasign.X509();
  subjectCert.readCertPEM(certificate);

  const subjectString = subjectCert.getSubjectString();
  const subjectParts = subjectString.slice(1).split('/');

  const subject = {};

  subjectParts.forEach((field) => {
    const [key, value] = field.split('=');
    subject[key] = value;
  });

  const { version } = subjectCert;
  const basicConstraintsCA = !!subjectCert.getExtBasicConstraints().cA;

  return {
    subject,
    version,
    basicConstraintsCA,
  };
}

const gsr2$1 = 'MIIDujCCAqKgAwIBAgILBAAAAAABD4Ym5g0wDQYJKoZIhvcNAQEFBQAwTDEgMB4GA1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjIxEzARBgNVBAoTCkdsb2JhbFNpZ24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDYxMjE1MDgwMDAwWhcNMjExMjE1MDgwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMjETMBEGA1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKbPJA6+Lm8omUVCxKs+IVSbC9N/hHD6ErPLv4dfxn+G07IwXNb9rfF73OX4YJYJkhD10FPe+3t+c4isUoh7SqbKSaZeqKeMWhG8eoLrvozps6yWJQeXSpkqBy+0Hne/ig+1AnwblrjFuTosvNYSuetZfeLQBoZfXklqtTleiDTsvHgMCJiEbKjNS7SgfQx5TfC4LcshytVsW33hoCmEofnTlEnLJGKRILzdC9XZzPnqJworc5HGnRusyMvo4KD0L5CLTfuwNhv2GXqF4G3yYROIXJ/gkwpRl4pazq+r1feqCapgvdzZX99yqWATXgAByUr6P6TqBwMhAo6CygPCm48CAwEAAaOBnDCBmTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUm+IHV2ccHsBqBt5ZtJot39wZhi4wNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL2NybC5nbG9iYWxzaWduLm5ldC9yb290LXIyLmNybDAfBgNVHSMEGDAWgBSb4gdXZxwewGoG3lm0mi3f3BmGLjANBgkqhkiG9w0BAQUFAAOCAQEAmYFThxxol4aR7OBKuEQLq4GsJ0/WwbgcQ3izDJr86iw8bmEbTUsp9Z8FHSbBuOmDAGJFtqkIk7mpM0sYmsL4h4hO291xNBrBVNpGP+DTKqttVCL1OmLNIG+6KYnX3ZHu01yiPqFbQfXf5WRDLenVOavSot+3i9DAgBkcRcAtjOj4LaR0VknFBbVPFd5uRHg5h6h+u/N5GJG79G+dwfCMNYxdAfvDbbnvRG15RjF+Cv6pgsH/76tuIMRQyV+dTZsXjAzlAcmgQWpzU/qlULRuJQ/7TBj0/VLZjmmx6BEP3ojY+x1J96relc8geMJgEtslQIxq/H5COEBkEveegeGTLg==';

var common = {
  hash: hash$5,
  parseAuthData: parseAuthData$5,
  verifySignature: verifySignature$5,
  COSEECDHAtoPKCS: COSEECDHAtoPKCS$5,
  base64ToPem: base64ToPem$2,
  validateCertificationPath: validateCertificationPath$2,
  getCertificationInfo: getCertificationInfo$2,
  gsr2: gsr2$1,
};

const base64url$5 = require$$0__default$1['default'];
const {
  hash: hash$4, parseAuthData: parseAuthData$4, verifySignature: verifySignature$4, COSEECDHAtoPKCS: COSEECDHAtoPKCS$4,
} = common;

function ASN1toPEM$1(pkBuf) {
  let pkBuffer = pkBuf;
  if (!Buffer.isBuffer(pkBuffer)) throw new Error('ASN1toPEM: input must be a Buffer');
  let type;
  if (pkBuffer.length === 65 && pkBuffer[0] === 0x04) {
    pkBuffer = Buffer.concat([Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex'), pkBuffer]);
    type = 'PUBLIC KEY';
  } else type = 'CERTIFICATE';
  const base64Certificate = pkBuffer.toString('base64');
  let PEMKey = '';

  for (let i = 0; i < Math.ceil(base64Certificate.length / 64); i++) {
    const start = 64 * i;
    PEMKey += `${base64Certificate.substr(start, 64)}\n`;
  }

  PEMKey = `-----BEGIN ${type}-----\n${PEMKey}-----END ${type}-----\n`;

  return PEMKey;
}

async function verifyU2FAttestation$1(ctapCredentialResponse, clientDataJSON) {
  const authenticatorDataStruct = parseAuthData$4(ctapCredentialResponse.authData);
  if (!(authenticatorDataStruct.flags.up)) { throw new Error('User was NOT presented durring authentication!'); }

  const clientDataHash = hash$4('SHA256', base64url$5.decode(clientDataJSON));
  const reservedByte = Buffer.from([0x00]);
  const publicKey = COSEECDHAtoPKCS$4(authenticatorDataStruct.COSEPublicKey);
  const signatureBase = Buffer.concat([
    reservedByte,
    authenticatorDataStruct.rpIdHash,
    clientDataHash,
    authenticatorDataStruct.credID,
    publicKey,
  ]);

  const PEMCertificate = ASN1toPEM$1(ctapCredentialResponse.attStmt.x5c[0]);
  const signature = ctapCredentialResponse.attStmt.sig;
  const verified = await verifySignature$4(signature, signatureBase, PEMCertificate);
  return {
    verified,
    authrInfo: {
      fmt: 'fido-u2f',
      publicKey: base64url$5(publicKey),
      counter: authenticatorDataStruct.counter,
      credID: base64url$5(authenticatorDataStruct.credID),
    },
  };
}

var u2fAttestation = verifyU2FAttestation$1;

const COSE_KEYS$3 = {
  kty: 1,
  alg: 3,
  crv: -1,
  x: -2,
  y: -3,
  n: -1,
  e: -2,
};
const COSE_KTY$2 = {
  OKP: 1,
  EC2: 2,
  RSA: 3,
};

const COSE_RSA_SCHEME$2 = {
  '-3': 'pss-sha256',
  '-39': 'pss-sha512',
  '-38': 'pss-sha384',
  '-65535': 'pkcs1-sha1',
  '-257': 'pkcs1-sha256',
  '-258': 'pkcs1-sha384',
  '-259': 'pkcs1-sha512',
};

const COSE_CRV$1 = {
  1: 'p256',
  2: 'p384',
  3: 'p521',
};

const COSE_ALG_HASH$1 = {
  '-257': 'sha256',
  '-258': 'sha384',
  '-259': 'sha512',
  '-65535': 'sha1',
  '-39': 'sha512',
  '-38': 'sha384',
  // '-37': 'sha256',
  '-260': 'sha256',
  '-261': 'sha512',
  '-7': 'sha256',
  '-36': 'sha384',
  '-37': 'sha512',
};

var cose = {
  COSE_KEYS: COSE_KEYS$3,
  COSE_KTY: COSE_KTY$2,
  COSE_RSA_SCHEME: COSE_RSA_SCHEME$2,
  COSE_CRV: COSE_CRV$1,
  COSE_ALG_HASH: COSE_ALG_HASH$1,
};

const base64url$4 = require$$0__default$1['default'];
const elliptic$1 = require$$1__default['default'];
const NodeRSA$1 = require$$2__default$1['default'];
const cbor$3 = require$$3__default['default'];
const {
  hash: hash$3, parseAuthData: parseAuthData$3, verifySignature: verifySignature$3, COSEECDHAtoPKCS: COSEECDHAtoPKCS$3, base64ToPem: base64ToPem$1, getCertificationInfo: getCertificationInfo$1,
} = common;
const {
  COSE_ALG_HASH, COSE_KEYS: COSE_KEYS$2, COSE_KTY: COSE_KTY$1, COSE_CRV, COSE_RSA_SCHEME: COSE_RSA_SCHEME$1,
} = cose;

const EC = elliptic$1.ec;
const EdDSA$1 = elliptic$1.eddsa;

async function verifyPackedAttestation$1(ctapCredentialResponse, clientDataJSON) {
  const authenticatorDataStruct = parseAuthData$3(ctapCredentialResponse.authData);
  const clientDataHash = hash$3('SHA256', base64url$4.decode(clientDataJSON));
  const signatureBase = Buffer.concat([
    ctapCredentialResponse.authData,
    clientDataHash,
  ]);

  const signature = ctapCredentialResponse.attStmt.sig;

  if (ctapCredentialResponse.attStmt.x5c) {
    const leafCert = base64ToPem$1(ctapCredentialResponse.attStmt.x5c[0].toString('base64'));
    const certInfo = getCertificationInfo$1(leafCert);

    if (certInfo.subject.OU !== 'Authenticator Attestation') { throw new Error('Batch certificate OU MUST be set strictly to "Authenticator Attestation"!'); }

    if (!certInfo.subject.CN) { throw new Error('Batch certificate CN MUST no be empty!'); }

    if (!certInfo.subject.O) { throw new Error('Batch certificate CN MUST no be empty!'); }

    if (!certInfo.subject.C || certInfo.subject.C.length !== 2) { throw new Error('Batch certificate C MUST be set to two character ISO 3166 code!'); }

    if (certInfo.basicConstraintsCA) { throw new Error('Batch certificate basic constraints CA MUST be false!'); }

    if (certInfo.version !== 3) { throw new Error('Batch certificate version MUST be 3(ASN1 2)!'); }

    const verified = await verifySignature$3(signature, signatureBase, leafCert);
    const publicKey = COSEECDHAtoPKCS$3(authenticatorDataStruct.COSEPublicKey);

    return {
      verified,
      authrInfo: {
        fmt: 'packed',
        publicKey: base64url$4(publicKey),
        counter: authenticatorDataStruct.counter,
        credID: base64url$4(authenticatorDataStruct.credID),
      },
    };
  }
  if (ctapCredentialResponse.attStmt.ecdaaKeyId) { throw new Error('ECDAA not implemented yet'); } else {
    const publicKeyCose = cbor$3.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
    const hashAlg = COSE_ALG_HASH[publicKeyCose.get(COSE_KEYS$2.alg)];
    if (publicKeyCose.get(COSE_KEYS$2.kty) === COSE_KTY$1.EC2) {
      const ansiKey = COSEECDHAtoPKCS$3(publicKeyCose);

      const signatureBaseHash = hash$3(hashAlg, signatureBase);

      const ec = new EC(COSE_CRV[publicKeyCose.get(COSE_KEYS$2.crv)]);
      const key = ec.keyFromPublic(ansiKey);

      const verifed = key.verify(signatureBaseHash, signature);

      return {
        verifed,
        authrInfo: {
          fmt: 'packed',
          publicKey: ansiKey,
          counter: authenticatorDataStruct.counter,
          credID: base64url$4(authenticatorDataStruct.credID),
        },
      };
    }
    if (publicKeyCose.get(COSE_KEYS$2.kty) === COSE_KTY$1.RSA) {
      const signingScheme = COSE_RSA_SCHEME$1[publicKeyCose.get(COSE_KEYS$2.alg)];
      const key = new NodeRSA$1(undefined, { signingScheme });
      key.importKey({
        n: publicKeyCose.get(COSE_KEYS$2.n),
        e: publicKeyCose.get(COSE_KEYS$2.e),
      }, 'components-public');
      const verified = key.verify(signatureBase, signature);
      return {
        verified,
        authrInfo: {
          fmt: 'packed',
          publicKey: key.exportKey('pkcs1-public-pem'),
          counter: authenticatorDataStruct.counter,
          credID: base64url$4(authenticatorDataStruct.credID),
        },
      };
    }
    if (publicKeyCose.get(COSE_KEYS$2.kty) === COSE_KTY$1.OKP) {
      // Probly won't work
      const x = publicKeyCose.get(COSE_KEYS$2.x);
      const signatureBaseHash = hash$3(hashAlg, signatureBase);

      const key = new EdDSA$1('ed25519');
      key.keyFromPublic(x);

      const verifed = key.verify(signatureBaseHash, signature);
      return {
        verifed,
        authrInfo: {
          fmt: 'packed',
          publicKey: key,
          counter: authenticatorDataStruct.counter,
          credID: base64url$4(authenticatorDataStruct.credID),
        },
      };
    }
  }
  return null;
}

var packedAttestation = verifyPackedAttestation$1;

const asn1 = require$$0__default$2['default'];
const base64url$3 = require$$0__default$1['default'];
const cbor$2 = require$$3__default['default'];
const {
  hash: hash$2, parseAuthData: parseAuthData$2, verifySignature: verifySignature$2, COSEECDHAtoPKCS: COSEECDHAtoPKCS$2, base64ToPem, validateCertificationPath: validateCertificationPath$1,
} = common;
const { COSE_KEYS: COSE_KEYS$1 } = cose;

function findOID(asn1object, oid) {
  if (!asn1object.sub) return null;

  for (const sub of asn1object.sub) {
    if (sub.typeName() !== 'OBJECT_IDENTIFIER' || sub.content() !== oid) {
      const result = findOID(sub, oid);

      if (result) return result;
    } else return asn1object;
  }
  return null;
}

function asn1ObjectToJSON(asn1object) {
  const JASN1 = {
    type: asn1object.typeName(),
  };

  if (!asn1object.sub) {
    if (asn1object.typeName() === 'BIT_STRING' || asn1object.typeName() === 'OCTET_STRING') { JASN1.data = asn1object.stream.enc.slice(asn1object.posContent(), asn1object.posEnd()); } else JASN1.data = asn1object.content();

    return JASN1;
  }

  JASN1.data = [];
  for (const sub of asn1object.sub) {
    JASN1.data.push(asn1ObjectToJSON(sub));
  }

  return JASN1;
}

function containsASN1Tag(seq, tag) {
  for (const member of seq) if (member.type === `[${tag}]`) return true;

  return false;
}

async function verifyAndroidKeyAttestation$1(ctapCredResp, clientDataJSON) {
  const authenticatorDataStruct = parseAuthData$2(ctapCredResp.authData);
  const clientDataHash = hash$2('SHA256', clientDataJSON);

  const signatureBase = Buffer.concat([ctapCredResp, clientDataHash]);
  const signature = ctapCredResp.attStmt.sig;

  const leafCert = base64ToPem(ctapCredResp.attStmt.x5c[0].toString('base64'));

  const signatureValid = await verifySignature$2(signature, signatureBase, leafCert);
  if (!signatureValid) throw new Error('Signature verification failed');

  const certPath = ctapCredResp.x5c.map((cert) => base64ToPem(cert.toString('base64')));

  validateCertificationPath$1(certPath);

  const certASN1 = asn1.decode(ctapCredResp.attStmt.x5c[0]);
  const certJSON = asn1ObjectToJSON(certASN1);
  const certTSB = certJSON.data[0];
  const certPubKey = certTSB.data[6];
  const certPubKeyBuff = certPubKey.data[1].data;

  const coseKey = cbor$2.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
  const ansiKeyPad = Buffer.concat([
    Buffer.from([0x00, 0x04]),
    coseKey.get(COSE_KEYS$1.x), coseKey.get(COSE_KEYS$1.y),
  ]);

  if (ansiKeyPad.toString('hex') !== certPubKeyBuff.toString('hex')) { throw new Error('Certificate public key does not match public key in authData'); }

  const attestationExtension = findOID(certASN1, '1.3.6.1.4.1.11129.2.1.17');
  const attestationExtensionJSON = asn1ObjectToJSON(attestationExtension);

  /*
  const attestationChallenge = attestationExtensionJSON.data[1].data[0].data[4].data;

  if (attestationChallenge.toString('hex') !== clientDataHashBuf.toString('hex')) {
    throw new Error('Certificate attestation challenge is not set to the clientData hash!');
  }
  */

  const softwareEnforcedAuthz = attestationExtensionJSON.data[1].data[0].data[6].data;
  const teeEnforcedAuthz = attestationExtensionJSON.data[1].data[0].data[7].data;

  if (containsASN1Tag(softwareEnforcedAuthz, 600) || containsASN1Tag(teeEnforcedAuthz, 600)) {
    throw new Error(
      'TEE or Software authorization list contains "allApplication" flag, which means that credential is not bound to the RP!',
    );
  }

  const verifed = true;
  const publicKey = COSEECDHAtoPKCS$2(authenticatorDataStruct.COSEPublicKey);

  return {
    verifed,
    authrInfo: {
      fmt: 'android-key',
      publicKey: base64url$3(publicKey),
      counter: authenticatorDataStruct.counter,
      credID: base64url$3(authenticatorDataStruct.credID),
    },
  };
}

var androidKeyAttestation = verifyAndroidKeyAttestation$1;

const base64url$2 = require$$0__default$1['default'];
const {
  hash: hash$1,
  parseAuthData: parseAuthData$1,
  verifySignature: verifySignature$1,
  COSEECDHAtoPKCS: COSEECDHAtoPKCS$1,
  getCertificationInfo,
  gsr2,
  validateCertificationPath,
} = common;

async function verifyAndroidSafetyNeyAttestation(ctapCredResp, clientDataJSON) {
  const authenticatorDataStruct = parseAuthData$1(ctapCredResp.authData);

  const jwtString = ctapCredResp.attStmt.response.toString('utf8');
  const jwtParts = jwtString.split('.');

  const HEADER = JSON.parse(base64url$2.decode(jwtParts[0]));
  const PAYLOAD = JSON.parse(base64url$2.decode(jwtParts[1]));
  const SIGNTURE = jwtParts[2];

  const clientDataHash = hash$1('SHA256', base64url$2.toBuffer(clientDataJSON));
  const nonceBase = Buffer.concat([ctapCredResp.authData, clientDataHash]);
  const nonceBuffer = hash$1('SHA256', nonceBase);
  const expectedNonce = nonceBuffer.toString('base64');

  if (PAYLOAD.nonce !== expectedNonce) { throw new Error(`PAYLOAD.nonce does not contains expected nonce! Expected ${PAYLOAD.nonce} to equal ${expectedNonce}!`); }

  if (!PAYLOAD.ctsProfileMatch) throw new Error('PAYLOAD.ctsProfileMatch is FALSE!');

  const certPath = HEADER.x5c.concat([gsr2]).map((cert) => {
    let pemcert = '';
    for (let i = 0; i < cert.length; i += 64) pemcert += `${cert.slice(i, i + 64)}\n`;
    return `-----BEGIN CERTIFICATE-----\n${pemcert}-----END CERTIFICATE-----`;
  });

  const { subject } = getCertificationInfo(certPath[0]);
  if (subject.CN !== 'attest.android.com') throw new Error('The common name is not set to "attest.android.com"!');

  validateCertificationPath(certPath);

  const signatureBaseBuffer = Buffer.from(`${jwtParts[0]}.${jwtParts[1]}`);
  const certificate = certPath[0];
  const signatureBuffer = base64url$2.toBuffer(SIGNTURE);

  const validSignature = await verifySignature$1(signatureBuffer, signatureBaseBuffer, certificate);

  if (!validSignature) throw new Error('Failed to verify the signature!');

  const publicKey = COSEECDHAtoPKCS$1(authenticatorDataStruct.COSEPublicKey);

  return {
    verified: validSignature,
    authrInfo: {
      fmt: 'android-safetynet',
      publicKey: base64url$2(publicKey),
      counter: authenticatorDataStruct.counter,
      credID: base64url$2(authenticatorDataStruct.credID),
    },
  };
}

var androidSafetyNetAttestation = verifyAndroidSafetyNeyAttestation;

const base64url$1 = require$$0__default$1['default'];
const elliptic = require$$1__default['default'];
const NodeRSA = require$$2__default$1['default'];
const cbor$1 = require$$3__default['default'];
const { parseAuthData, COSEECDHAtoPKCS } = common;
const {
  COSE_KEYS, COSE_KTY, COSE_RSA_SCHEME,
} = cose;

const EdDSA = elliptic.eddsa;

async function noneAttestation$1(ctapCredentialResponse) {
  const authenticatorDataStruct = parseAuthData(ctapCredentialResponse.authData);

  const publicKeyCose = cbor$1.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.EC2) {
    const ansiKey = COSEECDHAtoPKCS(publicKeyCose);

    return {
      verified: true,
      authrInfo: {
        fmt: 'none',
        publicKey: ansiKey,
        counter: authenticatorDataStruct.counter,
        credID: base64url$1(authenticatorDataStruct.credID),
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
        credID: base64url$1(authenticatorDataStruct.credID),
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
        credID: base64url$1(authenticatorDataStruct.credID),
      },
    };
  }
  return null;
}

var noneAttestation_1 = noneAttestation$1;

const crypto = require$$0__default['default'];
const base64url = require$$0__default$1['default'];
const cbor = require$$3__default['default'];
const verifyU2FAttestation = u2fAttestation;
const verifyPackedAttestation = packedAttestation;
const verifyAndroidKeyAttestation = androidKeyAttestation;
const verifyAndroidSafetyNetAttestation = androidSafetyNetAttestation;
const noneAttestation = noneAttestation_1;

async function verifySignature(signature, data, publicKey) {
  return crypto.createVerify('SHA256').update(data).verify(publicKey, signature);
}

function checkPEM(pubKey) {
  return pubKey.toString('base64').includes('BEGIN');
}

const randomBase64URLBuffer = (length) => {
  const len = length || 32;

  const buff = crypto.randomBytes(len);

  return base64url(buff);
};

function randomHex32String() {
  return crypto.randomBytes(32).toString('hex');
}

function serverMakeCred(id, name) {
  const displayName = name;

  const makeCredentialds = {
    challenge: randomBase64URLBuffer(32),
    rp: {
      name: 'WebAuthn App',
    },
    user: {
      id,
      name,
      displayName,
    },
    attestation: 'direct',
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7,
      },
      {
        type: 'public-key',
        alg: -35,
      },
      {
        type: 'public-key',
        alg: -36,
      },
      {
        type: 'public-key',
        alg: -257,
      },
      {
        type: 'public-key',
        alg: -258,
      },
      {
        type: 'public-key',
        alg: -259,
      },
      {
        type: 'public-key',
        alg: -38,
      },
      {
        type: 'public-key',
        alg: -39,
      },
      {
        type: 'public-key',
        alg: -8,
      },
    ],
    authenticatorSelection: {
      requireResidentKey: false,
      userVerification: 'discouraged',
    },
  };

  return makeCredentialds;
}
function serverGetAssertion(authenticators, options = {}) {
  const rpId = options.rpId || process.env.RP_ID || 'localhost';
  const allowCreds = authenticators.map((authr) => ({
    type: 'public-key',
    id: authr.credID,
    transports: ['usb', 'nfc', 'ble', 'internal'],
  }));
  return {
    challenge: randomBase64URLBuffer(32),
    allowCredentials: allowCreds,
    userVerification: 'discouraged',
    rpId,
    extensions: {
      txAuthSimple: '',
    },
    timeout: 60000,
  };
}
function hash(data) {
  return crypto.createHash('SHA256').update(data).digest();
}

function ASN1toPEM(pkBuf) {
  let pkBuffer = pkBuf;
  if (!Buffer.isBuffer(pkBuffer)) throw new Error('ASN1toPEM: input must be a Buffer');
  let type;
  if (pkBuffer.length === 65 && pkBuffer[0] === 0x04) {
    pkBuffer = Buffer.concat([Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex'), pkBuffer]);
    type = 'PUBLIC KEY';
  } else type = 'CERTIFICATE';
  const base64Certificate = pkBuffer.toString('base64');
  let PEMKey = '';

  for (let i = 0; i < Math.ceil(base64Certificate.length / 64); i++) {
    const start = 64 * i;
    PEMKey += `${base64Certificate.substr(start, 64)}\n`;
  }

  PEMKey = `-----BEGIN ${type}-----\n${PEMKey}-----END ${type}-----\n`;

  return PEMKey;
}

async function verifyAuthenticatorAttestationResponse(webAuthnResponse) {
  const attestationBuffer = base64url.toBuffer(webAuthnResponse.response.attestationObject);
  const ctapMakeCredResp = cbor.decodeAllSync(attestationBuffer)[0];
  const { clientDataJSON } = webAuthnResponse.response;
  let verification;
  if (ctapMakeCredResp.fmt === 'fido-u2f') { verification = await verifyU2FAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'packed') { verification = await verifyPackedAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'android-key') { verification = await verifyAndroidKeyAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'android-safetynet') { verification = await verifyAndroidSafetyNetAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'none') { verification = await noneAttestation(ctapMakeCredResp); }

  const { verified, authrInfo } = verification;
  if (verified) {
    const response = {
      verified,
      authrInfo,
    };
    return response;
  }
  return {
    verified: false,
  };
}

function findAuthenticator(credID, authenticators) {
  const authr = authenticators.find((x) => x.credID === credID);
  if (authr) return authr;

  throw new Error(`Unknown authenticator with credID ${credID}!`);
}

function parseGetAssertAuthData(buf) {
  let buffer = buf;
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);

  const flagsInt = flagsBuf[0];
  const flags = {
    up: !!(flagsInt & 0x01),
    uv: !!(flagsInt & 0x04),
    at: !!(flagsInt & 0x40),
    ed: !!(flagsInt & 0x80),
    flagsInt,
  };

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);

  const counter = counterBuf.readUInt32BE(0);

  return {
    rpIdHash, flagsBuf, flags, counter, counterBuf,
  };
}

async function verifyAuthenticatorAssertionResponse(webAuthnResponse, authenticators) {
  const authr = findAuthenticator(webAuthnResponse.id, authenticators);
  const authenticatorData = base64url.toBuffer(webAuthnResponse.response.authenticatorData);

  const response = { verified: false };
  if (authr.fmt === 'fido-u2f' || authr.fmt === 'packed' || authr.fmt === 'android-safetynet' || authr.fmt === 'android-key' || authr.fmt === 'none') {
    const authrDataStruct = parseGetAssertAuthData(authenticatorData);

    if (!authrDataStruct.flags.up) throw new Error('User was NOT presented durring authentication!');

    const clientDataHash = hash(base64url.toBuffer(webAuthnResponse.response.clientDataJSON));
    const signatureBase = Buffer.concat([
      authrDataStruct.rpIdHash,
      authrDataStruct.flagsBuf,
      authrDataStruct.counterBuf,
      clientDataHash,
    ]);
    const publicKey = checkPEM(authr.publicKey)
      ? authr.publicKey.toString('base64')
      : ASN1toPEM(base64url.toBuffer(authr.publicKey));
    const signature = base64url.toBuffer(webAuthnResponse.response.signature);
    response.verified = await verifySignature(signature, signatureBase, publicKey);

    if (response.verified) {
      if (response.counter <= authr.counter) throw new Error('Authr counter did not increase!');

      authr.counter = authrDataStruct.counter;
    }
  }

  return response;
}

var helpers = {
  randomBase64URLBuffer,
  serverMakeCred,
  randomHex32String,
  serverGetAssertion,
  verifyAuthenticatorAssertionResponse,
  verifyAuthenticatorAttestationResponse,
};

/**
 * Register method for server.
 * Generate credential options with given user `name`.
 * This will be sent to the front-end for generating credentials.
 * @param {Object} user with name property
 * @returns {Object} of user and credential options
 */
const register = (user) => {
  const u = {
    ...user,
    id: helpers.randomBase64URLBuffer(8),
  };

  // Generate credentials
  const makeCredChallenge = helpers.serverMakeCred(u.id, u.name);
  makeCredChallenge.status = 'ok';

  return {
    user: u,
    credentialOpt: makeCredChallenge,
  };
};

/**
 * Login method for server.
 * Generates assertion given `user.authenticators`.
 * This will be sent to the frontend for signature.
 * @param {Object} user
 * @param {Object} options
 * @returns
 */
const login = (user, options = {}) => {
  // Generate assertions for front-end
  const getAssertion = helpers.serverGetAssertion(user.authenticators, options);
  getAssertion.status = 'ok';

  return getAssertion;
};

/**
 * Verification method for server.
 * This verifies authenticators given the session key and client credentials.
 * @param {Object} arg of session object holding the challenge and data object with
 * 					   the credentials sent from client
 * @returns {Object} verification result
 */
const verify = async ({
  session,
  data: webAuthnResp,
}) => {
  // Sanity check for input
  if (!webAuthnResp.id || !webAuthnResp.rawId || !webAuthnResp.response || !webAuthnResp.type) {
    throw new Error('Parameter error');
  }
  if (webAuthnResp.type !== 'public-key') throw new Error('Wrong Key Type');

  const clientData = JSON.parse(
    require$$0__default$1['default'].decode(
      webAuthnResp.response.clientDataJSON,
    ),
  );

  //
  if (clientData.challenge !== session.challenge) {
    throw new Error('Challenges don\'t match');
  }

  let result = {};
  const {
    authenticators,
  } = session;

  // Verify registration or login
  if (webAuthnResp.response.attestationObject !== undefined) {
    result = await helpers.verifyAuthenticatorAttestationResponse(webAuthnResp);
    if (result.verified) {
      result.status = 'ok';
      return result;
    }
  } else if (webAuthnResp.response.authenticatorData !== undefined) {
    result = await helpers.verifyAuthenticatorAssertionResponse(
      webAuthnResp,
      authenticators,
    );

    if (result.verified) {
      result.status = 'ok';
      return result;
    }
  }

  return {
    status: 'failed',
  };
};

exports.login = login;
exports.register = register;
exports.verify = verify;
