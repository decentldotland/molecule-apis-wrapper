import secp256k1 from "secp256k1";

import {
  desoAddressToPublicKey,
  decodeDesoMessage,
  decodeDesoSignature
} from "./crypto.js";

export async function isDesoSigner(
  address,
  encodedMessage,
  encodedSignature
) {
  try {
    const pk = desoAddressToPublicKey(address);
    const message = decodeDesoMessage(encodedMessage);
    const signature = decodeDesoSignature(encodedSignature);
    const result = secp256k1.ecdsaVerify(
      (signature.length === 65) ? signature.slice(0, -1) : signature,
      message,
      pk,
    );

    return { result, address };
  } catch (error) {
    console.log(error);

    return { result: false, address: null };
  }
}
