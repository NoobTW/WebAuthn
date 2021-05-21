# WebAuthn

Implementation of WebAuthn API for server side and client side. User register with an username and one of supported authenticators. Login process requires matching username and authenticator pair.

The original codes are from [tonijukica/wenauthn](https://github.com/tonijukica/webauthn). I've just extract the core functions so that you can reuse them on Express, Koa, and any other frameworks. It's just a demo of WebAuthn, and it aims to be easy to use. Not really optimized for production use, yet, PRs are welcome.

## Example

The demo link is available here: *coming soon*

You can also launch from the example folder. The server example are build with Koa.js, and the client example are built with Next.js

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

Again, source here: [tonijukica/webauthn](https://github.com/tonijukica/webauthn).