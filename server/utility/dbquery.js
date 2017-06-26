var dbInterface = require('../db/config');

/* these functions are called by api.js and query the database.
They send back JSON to the callback provided. */

//get users

//Create table models

//TODO: handle model relatioships by writing relationship functions in models

//user
var User = dbInterface.Model.extend({
  tableName: 'users',

  //has one company
  company: function() {
    return this.hasOne(Company);
  },

  //has many work orders
  work_orders: function() {
    return this.belongsToMany(WorkOrder);
  }

});

//company
var Company = dbInterface.Model.extend({
  tableName: 'companies',
});

//client
var Client = dbInterface.Model.extend({
  tableName: 'clients',
});

//work orders
var WorkOrder = dbInterface.Model.extend({
  tableName: 'work_orders',

  //has one client id
  clients: function() {
    return this.hasOne(Client);
  },

  //has one company id
  companies: function() {
    return this.hasOne(Company);
  },

  //has many users
  users: function() {
    return this.belongsToMany(User);
  }

});

//work orders users join table-- not sure how/if we ue this here?
var WorkOrdersUsers = dbInterface.Model.extend({
  tableName: 'work_orders_users'
});

//----------------------query functions------------------------

//------User queries---------


//get all User data

//pass in user ID, returns data model for user
//queryObj is an object with conditions.
//examples:
/*
  getUser({
    id: 1
  });

  getUser({
    username: 'HimanshuP@gmail.com'
  });
*/
exports.getUser = function (queryObj) {
  new User(queryObj)
    .fetch()
    .then( function(model) {
      return model;
    });
};

//add new user (returns new user model)
//NOTE: DO NOT INCLUDE the ID, this is an autoincrement value
//example:
/*
  addUser({
    username: 'Doug',
    password: '123abc',
    first_name: 'Doug',
    last_name: 'Lyford',
    role: 'worker' -or- 'admin',
    created_at: '<timedate>',
    photo: 'path/to/photo.jpg',
    phone: '207-xxx-xxxx',
    phone_alt: 'xxx-xxx-xxxx',
    company_id: '5' --- Foreign Key
  });
*/
exports.addUser = function (queryObj) {
  new User(queryObj).save()
    .then(function (model) {
      return model;
    });
};

//------Order queries -----------
exports.createOrder = function (queryObj) {
  new WorkOrder(queryObj).save()
    .then(function (model) {
      return model;
    });
};

exports.updateOrder = function (queryObj) {
  //same code as createOrder, but simply do not pass in
  // {id: } in the queryObj and it will be treated as an update
  //rather than a creation.
  new WorkOrder(queryObj).save()
    .then(function (model) {
      return model;
    });
};

exports.deleteOrder = function (queryObj) {
  new WorkOrder(queryObj)
    .destroy()
    .then(function (model) {
      return model;
    });
};

//------Company queries---------

exports.getCompany = function (queryObj) {
  new Company({queryObj})
    .fetch()
    .then( function(model) {
      return model;
    });
};

exports.addCompany = function(queryObj) {
  new Company({queryObj})
    .save()
    .then( function(model) {
      return model;
    });
};




