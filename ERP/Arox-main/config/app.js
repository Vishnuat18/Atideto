require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  org: {
    name: process.env.ORG_NAME || 'Atideto Technologies Pvt. Ltd.',
    address: process.env.ORG_ADDRESS || 'Chennai, Tamil Nadu, India',
    phone: process.env.ORG_PHONE || '+91 98765 43210',
    email: process.env.ORG_EMAIL || 'info@atidetotech.com',
    website: process.env.ORG_WEBSITE || 'https://atidetotech.com',
    gstin: process.env.ORG_GSTIN || '33AABCU9603R1ZM'
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
    dir: process.env.UPLOAD_DIR || './public/uploads'
  }
};
