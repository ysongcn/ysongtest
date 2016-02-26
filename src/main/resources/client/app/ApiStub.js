
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _contacts = [];
var _editContact = {};

// will be used to incremental id for contacts
var currentId = 0;

// saving new contact
function create(contact) {

  contact.id = Date.now();
  currentId = contact.id
  _contacts[currentId] = {
      id     : contact.id         ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      name	 : contact.name	      ,
      owner: contact.owner
  };
}

// sending edit id to controller view
function edit(contact) {
  _editContact = {
      id     : contact.id         ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      name	 : contact.name	      ,
      owner: contact.owner        ,
      editmode: true
  };
}

// saving edited contact
function save(contact) {
  _contacts[contact.id] = {
      id: contact.id,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      name	 : contact.name	      ,
      owner: contact.owner

  };
}

// removing contact by user
function remove(removeId) {
  if (_contacts.hasOwnProperty(removeId)) {
    delete _contacts[removeId];
  }
}


var ApiStub = assign({}, EventEmitter.prototype, {

  getEditContact: function() {
    return _editContact;
  },
  getAll: function() {
    return _contacts;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case Constants._CREATE:
      text = action.name.trim();
      if (text !== '') {
        create(action);
      }
      break;

    case Constants._EDIT:
      edit(action);
      break;

    case Constants._SAVE:
      save(action);
      break;

    case Constants._REMOVE:
      remove(action.id);
      break;

    default:
      break;
  }
  ApiStub.emitChange();

});

module.exports = ApiStub;