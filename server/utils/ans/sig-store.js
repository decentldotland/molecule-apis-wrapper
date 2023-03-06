import axios from "axios";
import assert from "node:assert";
import { ANS_SIG_STORAGE } from "../constants.js";

export async function storeSig(signature) {
  try {
    const payload = {
      function: "storeSig",
      sig: atob(signature),
    };

    const storageState = (
      await axios.get(
        `https://${ANS_SIG_STORAGE}.exm.run`
      )
    )?.data?.signatures;
    assert(!storageState.includes(signature), true);

    const req = (
      await axios.post(
        `https://${ANS_SIG_STORAGE}.exm.run`,
        payload
      )
    )?.data;

    if (req?.status === "SUCCESS") {
      return { stored: true, status: 200 };
    }
    return { stored: false, status: 400 };
  } catch (error) {
    console.log(error);
    return { stored: null, status: 400 };
  }
}
