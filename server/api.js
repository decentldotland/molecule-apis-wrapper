import express from "express";
import cors from "cors";
import { isTonSigner } from "./utils/ton/signer.js";
import { isMassaSigner } from "./utils/massa/signer.js";


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

app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
