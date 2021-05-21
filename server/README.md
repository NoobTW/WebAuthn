# WebAuthn-server

> This is the server side package of WebAuthn. For full README, go to [WebAuthn](https://github.com/NoobTW/WebAuthn).

Here are three methods in `wenauthn-server`: `register`, `login`, and `verify`.

## register

Generate credential options with given user `name`. This will be send to frontend for generating credentials.

You should save the `credentialOpt.challenge` to `verify` to prevent replay attacks.

```javascript
const user = {
	name: 'NoobTW', // name is required.
};
const { user, credentialOpt } = register(user);

// saveCarefullyInSession(credentialOpt.challenge);
// sendToFrontend(credentialOpt)
```

## login

Generate assertion with given user authenticators. This will be send to frontend for signature.

You should
- save the `assertion.challenge` to `verify` to prevent replay attacks.
- set the Relying Party ID (`rpid`), usually it'll be your domain. Default value is 'localhost';

```javascript
const user = await User.find({ name: 'NoobTW' });
console.log(user.authenticators);
const assertion = login(user, { rpId: 'localhost' });
```

## verify

Verifying the authentications.

### Register

First, it checks if the challenge in the given session and given data are the same. Then it verifies the authenticator attestation response.

It'll return the user's authenticator info (PubKey, credentialId, ...). You should save it for login verification.

```javascript
const session = { challenge }; // The challenge we just saved to prevent replay attacks. It verifies here.
const data = request.body; // The attestation response sent from the client side.
const result = await verify({
	session,
	data,
});

if (result.staus === 'ok') {
	// saveScarefullyInDatabase(result.authrInfo);
}
```

### Login

First, it checks if the challenge in the given session and given data are the same. Then it verifies the signatures is valid with the given user's authenticator info.

```javascript
const session = {
	challenge, // The challenge we just saved to prevent replay attaks. It verifies here.
	authenticators, // The user's authenticator info we just saved.
};
const data = request.body; // The signatures sent from the client side.
const result = await verify ({
	session,
	data,
});

if (result.staus === 'ok') {
	// Login successfully.
}
```