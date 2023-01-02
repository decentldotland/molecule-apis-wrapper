export async function encodedToRaw(encoded_data) {
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