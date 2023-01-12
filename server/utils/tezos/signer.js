import { verifySignature, char2Bytes } from "@taquito/utils";
import { Key } from "sotez";
import cryptoUtils from "sotez";

export async function isTezosSigner(message, pubkey, signature) {
  try {
    const bytes = char2Bytes(atob(message));
    const result = verifySignature(bytes, pubkey, signature);
    const address = await getTzPubKeyHash(pubkey);
    return { result, address};
  } catch(error) {
    return {result: false, address: null};
  }
}


async function getTzPubKeyHash(pubkey) {
  try {
  const sotezKey = new Key({ key: pubkey });
  await sotezKey.ready;
  return await sotezKey.publicKeyHash();
  } catch(error) {
    return null;
  }
}