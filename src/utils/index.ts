import { HmacSHA256 } from "crypto-js";

export const generateCode = (salt: string) => {
  const time = new Date().toISOString().substring(0, 16)
  console.log(time)
  const token = HmacSHA256(time, salt).toString();
  const code = parseInt(token.substring(0, 5), 16) % 1000000
  return code.toString().padStart(6, "0");
};