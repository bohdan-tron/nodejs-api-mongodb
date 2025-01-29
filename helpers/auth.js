const {randomBytes, pbkdf2} = require('crypto');

exports.hashPassword = (password) => {
  return new Promise((res, rej) => {
    const salt = randomBytes(16).toString("hex");
    pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if(err) rej(err);
      res(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

exports.comparePassword = (password, hashed) => {
  return new Promise((res, rej) => {
    const [salt, key] = hashed.split(":");
    pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if(err) rej(err);
      res(key === derivedKey.toString("hex"));
    });
  });
}
