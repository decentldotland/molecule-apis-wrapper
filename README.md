<p align="center">
  <a href="https://decent.land">
    <img src="./img/new-logo.png" height="200">
  </a>
  <h3 align="center"><code>@decentdotland/molecule-apis-wrapper</code></h3>
  <p align="center">web3 libraries wrapper, util repo for molecule.sh</p>
</p>

## Build & Run

```console
git pull https://github.com/decentldotland/molecule-apis-wrapper.git

npm install && npm run start
```

## Endpoints

### Tonweb Wrapper

- `GET /tonweb/:pubkey/:message/:signature`

#### Parameters Format:
- all params should be base64 encoded

## Massa Wrapper

- `GET /massa/:pubkey/:message/:signature`

#### Parameters Format:
- `message` : base64 encoded
- `pubkey` and `signature` : base58 encoded

## Tezos Wrapper

- `GET /tezos/:pubkey/:message/:signature`

#### Parameters Format:
- `message` : base64 encoded

## Deso Wrapper

- `GET /deso/:pubkey/:message/:signature`

#### Parameters Format:
- `message` : base64 encoded

## Aptos Wrapper

- `GET /aptos/:pubkey/:message/:signature`

#### Parameters Format:
- `message` : base64 encoded
- `pubkey` and `signature` : hex string

## Nostr Wrapper

- `GET /nostr/:encoded_event/:pubkey/:encoded_content`

#### Parameters Format:
- `encoded_event`: base64 encoded string of the stringified Nostr signing object

- `pubkey`: the caller's Nostr public key

- `encoded_content`: the expected signature message from the Nostr signature

## EverPay Wrapper

- `GET /everpay/tx/:txid`

## Redstone Wrapper

- `GET /redstone/:ticker`


## ANS Storage Wrapper

- `GET /ans/store-sig/:sig`

#### Parameters Format
- `sig` : Arweave signature encoded in base64

## License
This repository is licensed under the [MIT license](./LICENSE)
