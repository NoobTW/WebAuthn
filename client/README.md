# WebAuthn-Client

> This is the client side package of WebAuthn. For full README, go to [WebAuthn](https://github.com/NoobTW/WebAuthn).

Here are two methods in `webauthn-client`: `register` and `login`.

For now, we use `axios` to fulfill the HTTP request. This may be changed in the future.

## Register

It requests the credential options from server, generates the credentials using `navigator.credentials.create`, and sends back to server.

```javascript
const registerOptions = {
	REGISTER_URL: '/api/register',                // OPTIONAL: the server path to request the credential options.
	REGISTER_RESP_URL: '/api/register_response',  // OPTIONAL: the server path to verify the authenticator response.
};
const response = await register(name, registerOptions);
if (response) {
	// registered successfully.
}
```

## Login

It requests the assertion from server, signing the assertion with credentials, and sends back to server.

```javascript
const loginOptions = {
	LOGIN_URL: '/api/login',               // OPTIONAL: the server path to request the assertion.
	LOGIN_RESP_URL: '/api/login_response',  // OPTIONAL: the server path to verify the signature.
};
const response = await login(name, loginOptions);
if (response) {
	// login successfully.
}
```