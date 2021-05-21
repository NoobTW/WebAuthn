import axios from 'axios';
import { preformatGetAssertReq, preformatMakeCredReq, publicKeyCredentialToJSON } from './helpers';

axios.defaults.withCredentials = true;

export const register = async (name, options = {}) => {
	const { data: credentialOpt } = await axios.post(options.REGISTER_URL || '/api/register', { name });
	const publicKey = preformatMakeCredReq(credentialOpt);
	const credentials = await navigator.credentials.create({ publicKey });

	const makeCredResponse = publicKeyCredentialToJSON(credentials);
	const { data: response } = await axios.post(options.REGISTER_RESP_URL || '/api/register_response', makeCredResponse);

	if (response.status === 'ok') {
		return true;
	} else {
		return false;
	}
};

export const login = async (name, options = {}) => {
	const { data: assertion } = await axios.post(options.LOGIN_URL || '/api/login', { name });
	const publicKey = preformatGetAssertReq(assertion);
	const credentials = await navigator.credentials.get({ publicKey });

	const assertionResponse = publicKeyCredentialToJSON(credentials);
	const { data: response } = await axios.post(options.LOGIN_RESP_URL || '/api/login_response', assertionResponse);

	if (response.status === 'ok') {
		return true;
	} else {
		return false;
	}
}