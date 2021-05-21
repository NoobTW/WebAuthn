import base64url from 'base64url';
import {
	randomBase64URLBuffer,
	serverMakeCred,
	serverGetAssertion,
	verifyAuthenticatorAttestationResponse,
	verifyAuthenticatorAssertionResponse
} from './helpers';

export const register = (user) => {
	const u = {
		...user,
		id: randomBase64URLBuffer(8),
	};

	const makeCredChallenge = serverMakeCred(u.id, u.name);
	makeCredChallenge.status = 'ok';

	return {
		user: u,
		credentialOpt: makeCredChallenge,
	};
};

export const login = (user, options = {}) => {
	const getAssertion = serverGetAssertion(user.authenticators, options);
	getAssertion.status = 'ok';

	return getAssertion;
};

export const verify = async ({ session, data: webAuthnResp }) => {
	if (!webAuthnResp.id || !webAuthnResp.rawId || !webAuthnResp.response || !webAuthnResp.type) throw new Error('Parameter error');
	if (webAuthnResp.type !== 'public-key') throw new Error('Wrong Key Type');

	const clientData = JSON.parse(base64url.decode(webAuthnResp.response.clientDataJSON));

	if (clientData.challenge !== session.challenge) {
		throw new Error('Challenges don\'t match');
	}

	let result = {};
	let { authenticators } = session;

	if (webAuthnResp.response.attestationObject !== undefined) {
		result = await verifyAuthenticatorAttestationResponse(webAuthnResp);
		if(result.verified) {
			result.status = 'ok';
			return result;
		}
	} else if (webAuthnResp.response.authenticatorData !== undefined) {
		result = await verifyAuthenticatorAssertionResponse(webAuthnResp, authenticators);
		if(result.verified) {
			result.status = 'ok';
			return result;
		}
	}

	return {
		status: 'failed',
	};
}