module.exports = {
  secret: process.env.JWT_SECRET || 'atideto-erp-dev-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12
};
