const bcrypt = require('bcrypt')
const saltRounds = 10;

/**
 * Gera um hash de uma senha com bcrypt
 * @param {string} password Senha
 * @return {string}
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

/**
 * Valida um hash com bcrypt
 * @param {string} password Senha
 * @param {string} hash Hash
 * @return {boolean}
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword
}