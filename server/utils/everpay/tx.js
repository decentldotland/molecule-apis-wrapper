import Everpay from "everpay";
const everpay = new Everpay.default();

export async function getEverTx(txid) {
  try {
    const txObject = await everpay.txByHash(txid);
    return txObject;
  } catch (error) {
    throw null;
  }
}
