
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./Constants');
var assign = require('object-assign');
var config = require('./config');


var CHANGE_EVENT = 'change';

var _contacts = {};
var _editContact = {};

// will be used to incremental id for contacts
var currentId = 0;

function init(contact) {
  currentId = contact.id
  _contacts[currentId] = {
      id     : contact.id         ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      phone  : contact.phone      ,
      name	 : contact.name	      ,
      owner: contact.owner
  };
    ApiStub.emitChange();
}

function create(contact) {
  fetch(config.apibase + '/company', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      phone  : contact.phone      ,
      name	 : contact.name	      ,
      owner  : contact.owner
    })})
    .then(function(rep){ return rep.json() })
    .then(function(ret){
      if(ret.id){
            currentId = ret.id
            _contacts[currentId] = {
                id     : ret.id             ,
                address: contact.address	  ,
                city	 : contact.city	      ,
                country: contact.country	  ,
                email	 : contact.email	    ,
                phone  : contact.phone,
                name	 : contact.name	      ,
                owner: contact.owner
            };
              ApiStub.emitChange();

      }

    });



}

// sending edit id to controller view
function edit(contact) {
  _editContact = {
      id     : contact.id         ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      phone  : contact.phone      ,
      name	 : contact.name	      ,
      owner  : contact.owner ,
      editmode: true
  };
    ApiStub.emitChange();

}

function save(contact) {
 fetch(config.apibase +'/company', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: contact.id	  ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      phone  : contact.phone      ,
      name	 : contact.name	      ,
      owner  : contact.owner
    })})
    .then(function(rep){ return rep.json() })
    .then(function(ret){

    if(ret.id){
        _contacts[contact.id] = {
              id: contact.id,
              address: contact.address	  ,
              city	 : contact.city	      ,
              country: contact.country	  ,
              email	 : contact.email	    ,
              phone  : contact.phone      ,
              name	 : contact.name	      ,
              owner: contact.owner
          };
            ApiStub.emitChange();

    }
   });



}

function remove(removeId) {
  fetch(config.apibase +'/company/'+removeId, { method: 'DELETE'} )
  .then(function(ret){ return ret.json(); })
  .then(function(json){
    if(json && json ==='ok'){
        if (_contacts.hasOwnProperty(removeId)) {
          delete _contacts[removeId];
        }
          ApiStub.emitChange();

    }
  });
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
    case Constants._INIT:
      init(action);
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

});

module.exports = ApiStub;