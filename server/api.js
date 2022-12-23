import nacl from "tweetnacl";
import TonWeb from "tonweb";

const tonweb = new TonWeb();

import express from "express";
import cors from "cors";


const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/tonweb/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { pubkey, message, signature } = req.params;

    const response = await isTonSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ result: false, address: null });
    return;
  }
});

async function isTonSigner(message, pubkey, signature) {
  try {
    const decodedMessage = Buffer.from(atob(message));
    const ua8PublicKey = await encodedToRaw(pubkey);
    const u8aSignature = await encodedToRaw(signature);

    const isValid = nacl.sign.detached.verify(
      new Uint8Array(decodedMessage),
      u8aSignature,
      ua8PublicKey
    );
    const wallet = tonweb.wallet.create({ publicKey: ua8PublicKey });
    const address = (await wallet.getAddress())?.toString(true, true, false);

    return { result: isValid, address: address };
  } catch (error) {
    return { result: false, address: null };
  }
}

async function encodedToRaw(encoded_data) {
  try {
    const bytesArray = atob(encoded_data)
      .split(",")
      .map((c) => Number(c));
    const ua8 = new Uint8Array(bytesArray);
    return ua8;
  } catch (error) {
    return false;
  }
}

app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
