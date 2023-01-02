import * as ed from "@noble/ed25519";
import base58check from "base58check";
import * as varint from "varint";
import { blake3 } from "@noble/hashes/blake3";
import { PUBLIC_KEY_PREFIX } from "./constants.js";

export function base58Encode(data) {
  const bufData = Buffer.from(data);
  return base58check.encode(
    bufData.slice(1),
    bufData[0].toString(16).padStart(2, "0")
  );
}

export function base58Decode(data) {
  const decoded = base58check.decode(data);
  return Buffer.concat([decoded.prefix, decoded.data]);
}

export function hashBlake3(data) {
  return blake3(data);
}

export function varintEncode(data) {
  return varint.encode(data);
}

export function getBytesPublicKey(publicKey) {
  if (!(publicKey[0] == PUBLIC_KEY_PREFIX)) {
    return false;
  }
  const publicKeyVersionBase58Decoded = base58Decode(publicKey.slice(1));
  const _version = publicKeyVersionBase58Decoded.readUInt8(0);
  const publicKeyBase58Decoded = publicKeyVersionBase58Decoded.slice(1);
  return publicKeyBase58Decoded;
}
