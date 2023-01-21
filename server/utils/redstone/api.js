import redstone from "redstone-api";
import assert from "node:assert";

export async function getTokenPrice(ticker) {
  try {
    assert.equal(!!ticker.length, true);
    const price = await redstone.getPrice(ticker.toUpperCase());
    return price;
  } catch (error) {
    console.log(error);
    return { molecule_error: "redstone_error" };
  }
}
