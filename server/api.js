import express from "express";
import cors from "cors";
import { isTonSigner } from "./utils/ton/signer.js";
import { isMassaSigner } from "./utils/massa/signer.js";
import { isDesoSigner } from "./utils/deso/signer.js";
import { isTezosSigner } from "./utils/tezos/signer.js";
import { isAptosSigner } from "./utils/aptos/signer.js";
import { isNostrSigner } from "./utils/nostr/signer.js";
import { getEverTx } from "./utils/everpay/tx.js";
import { getTokenPrice } from "./utils/redstone/api.js";
import { getNftCollection } from "./utils/ark-nft/state.js";
import { getErc20BalanceOf } from "./utils/erc20s/balance.js";

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

app.get("/nostr/:encoded_event/:pubkey/:encoded_content", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { encoded_event, pubkey, encoded_content } = req.params;

    const response = await isNostrSigner(encoded_event, pubkey, encoded_content);
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

app.get("/sender-form-collection/:contract_address/:optional_address?", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { contract_address, optional_address } = req.params;
    const response = await getNftCollection(contract_address, optional_address);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ molecule_error: "moralis_error" });
    return;
  }
});

app.get("/sender-form-erc20/:address/:token", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { address, token } = req.params;
    const response = await getErc20BalanceOf(address, token);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({ molecule_error: "moralis_error" });
    return;
  }
});


app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
