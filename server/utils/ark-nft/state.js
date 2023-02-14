import axios from "axios";
import assert from "node:assert";
import { NFT_COLLECTIONS } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

export async function getNftCollection(contract_address, evm_address) {
  try {
    if (contract_address === "rwp") {
      return await _isRss3NftHolder(evm_address);
    }
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

async function _isRss3NftHolder(evm_address) {
  try {
    const req = await axios(
      `https://arweave.net/gA4_j6X578IMbmo-s_Lhs0WOmEks0EjjCiBey_vx7FQ`
    );
    const snapshot = req?.data;
    const isOwner = snapshot
      .map((entry) => entry?.Owner.toLowerCase())
      .includes(evm_address.toLowerCase());
    return { result: isOwner };
  } catch (error) {
    return { result: false };
  }
}
