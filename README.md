# WebAuthn

Implementation of WebAuthn API for server side and client side. Users register with a username and choose from one of the supported authenticators. The login process requires a matched username and authenticator pair.

The original codes are derived from [tonijukica/webauthn](https://github.com/tonijukica/webauthn). I've just extracted the core functions so that you can apply them on Express, Koa, or any other framework. 

This is just a demonstration for WebAuthn, and it aims for ease of use. Not really optimized for production use yet. PRs are welcome.

## Example

The demo link is available here: *coming soon*

You can also launch from the example folder. The server example is built with Koa.js, and the client example is built with Next.js.

## Install

```shell
npm install webauthn-server webauthn-clt
```

## Usage

- [Server-side Usage](server)
- [Client-side Usage](client)

## Supported Attestation formats

- Packed
- Fido-U2F
- Android SafetyNet
- Android Key store (Needs testing)

## License

MIT

Again, sourced here: [tonijukica/webauthn](https://github.com/tonijukica/webauthn).
