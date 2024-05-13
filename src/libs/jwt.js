import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        console.error("Error al firmar el token:", err);
        reject("Error al firmar el token");
      } else {
        resolve(token);
      }
    });
  });
}
