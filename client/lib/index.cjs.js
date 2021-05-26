'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Use a lookup table to find the index.
const lookup = new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}

const encode = (arraybuffer) => {
  const bytes = new Uint8Array(arraybuffer);
  let i;
  const len = bytes.length;
  let base64url = '';

  for (i = 0; i < len; i += 3) {
    base64url += chars[bytes[i] >> 2];
    base64url += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64url += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64url += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64url = base64url.substring(0, base64url.length - 1);
  } else if (len % 3 === 1) {
    base64url = base64url.substring(0, base64url.length - 2);
  }

  return base64url;
};

const decode = (base64string) => {
  const bufferLength = base64string.length * 0.75;
  const len = base64string.length;
  let i;
  let p = 0;
  let encoded1;
  let encoded2;
  let encoded3;
  let encoded4;

  const bytes = new Uint8Array(bufferLength);

  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64string.charCodeAt(i)];
    encoded2 = lookup[base64string.charCodeAt(i + 1)];
    encoded3 = lookup[base64string.charCodeAt(i + 2)];
    encoded4 = lookup[base64string.charCodeAt(i + 3)];

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return bytes.buffer;
};

const methods = {
  decode,
  encode,
};

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof Array) {
    const arr = pubKeyCred.map((x) => publicKeyCredentialToJSON(x));

    // const arr = [];
    // for (const i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

    return arr;
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return methods.encode(pubKeyCred);
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

const preformatMakeCredReq = (credReq) => {
  const makeCredReq = credReq;
  makeCredReq.challenge = methods.decode(makeCredReq.challenge);
  makeCredReq.user.id = methods.decode(makeCredReq.user.id);

  return makeCredReq;
};

const preformatGetAssertReq = (assert) => {
  const getAssert = assert;
  getAssert.challenge = methods.decode(getAssert.challenge);

  getAssert.allowCredentials.forEach((allowCred) => {
    const ac = allowCred;
    ac.id = methods.decode(ac.id);
  });

  return getAssert;
};

axios__default['default'].defaults.withCredentials = true;

/**
 * Registration method for client.
 * Requests the credential options from server, generates the credentials using
 * `navigator.credentials.create`, and sends back to server.
 * @param {String} name of the user
 * @param {Object} options api URL of the server
 * @returns {boolean} response status from the server
 */
const register = async (name, options = {}) => {
  // Request credential options from server
  const {
    data: credentialOpt,
  } = await axios__default['default'].post(
    options.REGISTER_URL || '/api/register',
    { name },
  );

  // Generate credentials
  const publicKey = preformatMakeCredReq(credentialOpt);
  const credentials = await navigator.credentials.create({
    publicKey,
  });

  // Post credentials to the server
  const makeCredResponse = publicKeyCredentialToJSON(credentials);
  const {
    data: response,
  } = await axios__default['default'].post(
    options.REGISTER_RESP_URL || '/api/register_response',
    makeCredResponse,
  );

  // Return response status
  if (response.status === 'ok') {
    return true;
  }
  return false;
};

/**
 * Login method for client.
 * Request assertion from server, signs the assertion with the user credentials,
 * and sends it back to server for verification.
 * @param {String} name of the user
 * @param {Object} options api URL of the server
 * @returns {boolean} response status from server
 */
const login = async (name, options = {}) => {
  // Request assertion from server
  const {
    data: assertion,
  } = await axios__default['default'].post(options.LOGIN_URL || '/api/login',
    { name });

  // Get credentials from assertion
  const publicKey = preformatGetAssertReq(assertion);
  const credentials = await navigator.credentials.get({
    publicKey,
  });

  // Sign credentials and post to server
  const assertionResponse = publicKeyCredentialToJSON(credentials);
  const {
    data: response,
  } = await axios__default['default'].post(
    options.LOGIN_RESP_URL || '/api/login_response',
    assertionResponse,
  );

  // Return response status
  if (response.status === 'ok') {
    return true;
  }
  return false;
};

exports.login = login;
exports.register = register;
