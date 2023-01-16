import nacl from "tweetnacl";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { sha3_256 as sha3Hash } from "@noble/hashes/sha3";

export async function isAptosSigner(message, pubkey, signature) {
  try {
    const decodedMsg = Buffer.from(atob(message));
    const result = nacl.sign.detached.verify(
      decodedMsg,
      hexToU8a(signature),
      hexToU8a(pubkey)
    );

    const address = deriveAptosAddr(pubkey);
    return {
      result,
      address,
    };
  } catch (error) {
    console.log(error);
    return { result: false, address: null };
  }
}

function deriveAptosAddr(publicKey) {
  try {
    const pubKeyBytes = hexToU8a(publicKey);

    const bytes = new Uint8Array(pubKeyBytes.length + 1);
    bytes.set(pubKeyBytes);
    bytes.set([0], pubKeyBytes.length);

    const hash = sha3Hash.create();
    hash.update(bytes);

    return u8aToHex(hash.digest());
  } catch (error) {
    throw error;
  }
}
