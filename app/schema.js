config = require('../config/config.js')

var factory = require('bookshelf-factory')(config);
var type = factory.schemer.constants.type;
var schema = {
  tasks: {
    id: {
      type: type.integer,
      primary: true,
      increments: true
    },
    description: {
      type: type.string,
      size: 200
    }
  }
};


// call the create function to create all the models
var models = factory.create(schema);

module.exports = {
  models: models
}
