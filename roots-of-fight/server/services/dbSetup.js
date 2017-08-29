const app = require('./../server')
  ,db = app.get('db')
  ,config = require('./../config');


module.exports = {
  run: function() {
    console.log('Initializing database');
    db.initialize.tables_initialize(function(err, table) {
      if(err){
        return console.log('Some tables failed to create', err);
      }
        console.log('Tables successfully initialized');
    })
  }
}
