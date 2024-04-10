// @server/src/utils/nanoid.js

const shortid = require('shortid');

function generateId() {
  return shortid.generate(); 
}

module.exports = {
  generateId
};
