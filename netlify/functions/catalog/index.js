const products = require('../data/prints.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};