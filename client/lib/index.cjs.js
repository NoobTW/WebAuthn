'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Use a lookup table to find the index.
let lookup = new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
	lookup[chars.charCodeAt(i)] = i;
}

let encode = function (arraybuffer) {
	let bytes = new Uint8Array(arraybuffer),
		i,
		len = bytes.length,
		base64url = '';

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

let decode = function (base64string) {
	let bufferLength = base64string.length * 0.75,
		len = base64string.length,
		i,
		p = 0,
		encoded1,
		encoded2,
		encoded3,
		encoded4;

	let bytes = new Uint8Array(bufferLength);

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

let methods = {
	decode: decode,
	encode: encode,
};

function publicKeyCredentialToJSON(pubKeyCred) {
	if (pubKeyCred instanceof Array) {
		let arr = [];
		for (let i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

		return arr;
	}

	else if (pubKeyCred instanceof ArrayBuffer) {
		return methods.encode(pubKeyCred);
	}

	else if (pubKeyCred instanceof Object) {
		let obj = {};

		for (let key in pubKeyCred) {
			obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
		}

		return obj;
	}

	return pubKeyCred;
}

let  preformatMakeCredReq = (makeCredReq) => {
	makeCredReq.challenge = methods.decode(makeCredReq.challenge);
	makeCredReq.user.id = methods.decode(makeCredReq.user.id);

	return makeCredReq;
};

let preformatGetAssertReq = (getAssert) => {
	getAssert.challenge = methods.decode(getAssert.challenge);

	for(let allowCred of getAssert.allowCredentials) {
		allowCred.id = methods.decode(allowCred.id);
	}

	return getAssert;
};

axios__default['default'].defaults.withCredentials = true;

const register = async (name, options = {}) => {
	const { data: challenge } = await axios__default['default'].post(options.REGISTER_URL || '/api/register', { name });
	const publicKey = preformatMakeCredReq(challenge);
	const credentials = await navigator.credentials.create({ publicKey });

	const makeCredResponse = publicKeyCredentialToJSON(credentials);
	const { data: response } = await axios__default['default'].post(options.REGISTER_RESP_URL || '/api/register_response', makeCredResponse);

	if (response.status === 'ok') {
		return true;
	} else {
		return false;
	}
};

const login = async (name, options = {}) => {
	const { data: assertion } = await axios__default['default'].post(options.LOGIN_URL || '/api/login', { name });
	const publicKey = preformatGetAssertReq(assertion);
	const credentials = await navigator.credentials.get({ publicKey });

	const assertionResponse = publicKeyCredentialToJSON(credentials);
	const { data: response } = await axios__default['default'].post(options.LOGIN_RESP_URL || '/api/login_response', assertionResponse);

	if (response.status === 'ok') {
		return true;
	} else {
		return false;
	}
};

exports.login = login;
exports.register = register;
