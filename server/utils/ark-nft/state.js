import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getArkNfCollection() {
  try {
    const req = (
      await axios.get(
        `https://deep-index.moralis.io/api/v2/nft/0xb1cdb97ddc2b05ad9be7be17eabba3a0f42453fa/owners?chain=eth&format=decimal`,
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
