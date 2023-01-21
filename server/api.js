import express from "express";
import cors from "cors";
import { isTonSigner } from "./utils/ton/signer.js";
import { isMassaSigner } from "./utils/massa/signer.js";
import { isDesoSigner } from "./utils/deso/signer.js";
import { isTezosSigner } from "./utils/tezos/signer.js";
import { isAptosSigner } from "./utils/aptos/signer.js";
import { getEverTx } from "./utils/everpay/tx.js";
import { getTokenPrice } from "./utils/redstone/api.js";

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

app.get("/massa/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { pubkey, message, signature } = req.params;

    const response = await isMassaSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/deso/:address/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { address, message, signature } = req.params;

    const response = await isDesoSigner(address, message, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/tezos/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { pubkey, message, signature } = req.params;

    const response = await isTezosSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/aptos/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { pubkey, message, signature } = req.params;

    const response = await isAptosSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/everpay/tx/:txid", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { txid } = req.params;

    const response = await getEverTx(txid);

    if (response === null) {
      res.send({ molecule_error: "invalid_txid" });
      return;
    }
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ molecule_error: "everpay_invalid_txid" });
    return;
  }
});

app.get("/redstone/:ticker", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { ticker } = req.params;

    const response = await getTokenPrice(ticker);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ molecule_error: "redstone_error" });
    return;
  }
});


app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
