import * as secp256k1 from "@noble/secp256k1";
import * as nostr_ from "nostr-tools";
import assert from "node:assert";

const nostr = nostr_.default;

export async function isNostrSigner(encoded_event, pubkey, encoded_event_content) {
  try {
    const decodedEvent = JSON.parse(atob(encoded_event));
    const decodedExpectedContent = atob(encoded_event_content);
    assert(decodedEvent.content === decodedExpectedContent, true);

    const result = await secp256k1.schnorr.verify(
      decodedEvent?.sig,
      decodedEvent?.id,
      pubkey
    );
    const address = nostr.nip19.npubEncode(pubkey);
    return { result, address };
  } catch (error) {
    return { result: false, address: null };
  }
}
