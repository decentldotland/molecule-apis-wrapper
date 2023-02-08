import axios from "axios";
import assert from "node:assert";
import { NFT_COLLECTIONS } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

export async function getNftCollection(contract_address) {
  try {
    assert.equal(NFT_COLLECTIONS.includes(contract_address), true);
    const req = (
      await axios.get(
        `https://deep-index.moralis.io/api/v2/nft/${contract_address}/owners?chain=eth&format=decimal`,
        {
          headers: {
            Accept: "application/json",
            "X-API-Key": process.env.MORALIS_API_KEY,
          },
        }
      )
    )?.data;

    return req;
  } catch (error) {
    throw error;
  }
}
