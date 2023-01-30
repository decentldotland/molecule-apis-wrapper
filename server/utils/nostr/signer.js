import * as secp256k1 from "@noble/secp256k1";
import * as nostr_ from "nostr-tools";

const nostr = nostr_.default;

export async function isNostrSigner(event_id, pubkey, event_signature) {
  try {
    const result = await secp256k1.schnorr.verify(
      event_signature,
      event_id,
      pubkey
    );
    const address = nostr.nip19.npubEncode(pubkey);
    return { result, address };
  } catch (error) {
    return { result: false, address: null };
  }
}
