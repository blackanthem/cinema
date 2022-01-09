import { scrypt, randomBytes } from "crypto";

export function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    const salt = randomBytes(8).toString("hex");

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

export function verifyPassword(password: string, hash: string) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
}
