import axios from "axios";
import dotenv from "dotenv";
import assert from "node:assert";
import { MASK_TOKEN_ADDRESS, RSS3_TOKEN_ADDRESS } from "../constants.js";
dotenv.config();

export async function getErc20BalanceOf(address, token) {
  try {
    assert(["rss3", "mask"].includes(token), true);
    const contract_addr =
      token === "mask" ? MASK_TOKEN_ADDRESS : RSS3_TOKEN_ADDRESS;
    const req = (
      await axios.get(
        `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contract_addr}&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`
      )
    )?.data;
    if (req?.status === "1") {
      return {result: Number(req?.result)}
    }

    return { result: 0 };
  } catch (error) {
    console.log(error);
    return {result: 0};
  }
}
