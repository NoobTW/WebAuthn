import base64url from 'base64url';
import {
  randomBase64URLBuffer,
  serverMakeCred,
  serverGetAssertion,
  verifyAuthenticatorAttestationResponse,
  verifyAuthenticatorAssertionResponse,
} from './helpers';

/**
 * Register method for server.
 * Generate credential options with given user `name`.
 * This will be sent to the front-end for generating credentials.
 * @param {Object} user with name property
 * @returns {Object} of user and credential options
 */
export const register = (user) => {
  const u = {
    ...user,
    id: randomBase64URLBuffer(8),
  };

  // Generate credentials
  const makeCredChallenge = serverMakeCred(u.id, u.name);
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
export const login = (user, options = {}) => {
  // Generate assertions for front-end
  const getAssertion = serverGetAssertion(user.authenticators, options);
  getAssertion.status = 'ok';

  return getAssertion;
};

/**
 * Verification method for server.
 * This verifies authenticators given the session key and client credentials.
 * @param {Object} arg of session object holding the challenge and data object with
 *        the credentials sent from client
 * @returns {Object} verification result
 */
export const verify = async ({
  session,
  data: webAuthnResp,
}) => {
  // Sanity check for input
  if (!webAuthnResp.id || !webAuthnResp.rawId || !webAuthnResp.response || !webAuthnResp.type) {
    throw new Error('Parameter error');
  }
  if (webAuthnResp.type !== 'public-key') throw new Error('Wrong Key Type');

  const clientData = JSON.parse(
    base64url.decode(
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
    result = await verifyAuthenticatorAttestationResponse(webAuthnResp);
    if (result.verified) {
      result.status = 'ok';
      return result;
    }
  } else if (webAuthnResp.response.authenticatorData !== undefined) {
    result = await verifyAuthenticatorAssertionResponse(
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
