import axios from 'axios';
import {
  preformatGetAssertReq,
  preformatMakeCredReq,
  publicKeyCredentialToJSON,
} from './helpers';

axios.defaults.withCredentials = true;

/**
 * Registration method for client.
 * Requests the credential options from server, generates the credentials using
 * `navigator.credentials.create`, and sends back to server.
 * @param {String} name of the user
 * @param {Object} options api URL of the server
 * @returns {boolean} response status from the server
 */
export const register = async (name, options = {}) => {
  // Request credential options from server
  const {
    data: credentialOpt,
  } = await axios.post(
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
  } = await axios.post(
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
export const login = async (name, options = {}) => {
  // Request assertion from server
  const {
    data: assertion,
  } = await axios.post(options.LOGIN_URL || '/api/login',
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
  } = await axios.post(
    options.LOGIN_RESP_URL || '/api/login_response',
    assertionResponse,
  );

  // Return response status
  if (response.status === 'ok') {
    return true;
  }
  return false;
};
