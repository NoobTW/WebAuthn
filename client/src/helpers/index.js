import base64url from './base64url-arraybuffer';

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof Array) {
    const arr = pubKeyCred.map((x) => publicKeyCredentialToJSON(x));

    // const arr = [];
    // for (const i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

    return arr;
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return base64url.encode(pubKeyCred);
  }

  if (pubKeyCred instanceof Object) {
    const obj = {};

    for (const key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
}

function generateRandomBuffer(length) {
  const len = length || 32;

  const randomBuffer = new Uint8Array(len);
  window.crypto.getRandomValues(randomBuffer);

  return randomBuffer;
}

const preformatMakeCredReq = (credReq) => {
  const makeCredReq = credReq;
  makeCredReq.challenge = base64url.decode(makeCredReq.challenge);
  makeCredReq.user.id = base64url.decode(makeCredReq.user.id);

  return makeCredReq;
};

const preformatGetAssertReq = (assert) => {
  const getAssert = assert;
  getAssert.challenge = base64url.decode(getAssert.challenge);

  getAssert.allowCredentials.forEach((allowCred) => {
    const ac = allowCred;
    ac.id = base64url.decode(ac.id);
  });

  return getAssert;
};

export {
  publicKeyCredentialToJSON, generateRandomBuffer, preformatGetAssertReq, preformatMakeCredReq,
};
