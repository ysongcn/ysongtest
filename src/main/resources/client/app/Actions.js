
var AppDispatcher = require('./AppDispatcher');
var Constants = require('./Constants');

var Actions = {

  create: function(contact) {
    AppDispatcher.dispatch({
      actionType: Constants._CREATE,
      id     : contact.id         ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      name	 : contact.name	      ,
      owner: contact.owner
    });
  },
  /**
   * Opening modal to edit contact
   */
  edit: function(contact) {
    AppDispatcher.dispatch({
      actionType: Constants._EDIT,
       id     : contact.id         ,
       address: contact.address	  ,
       city	 : contact.city	      ,
       country: contact.country	  ,
       email	 : contact.email	    ,
       name	 : contact.name	      ,
       owner: contact.owner
    });
  },
  /**
   * Saving edited contact
   */
  save: function(contact) {
    AppDispatcher.dispatch({
      actionType: Constants._SAVE,
      id     : contact.id         ,
      address: contact.address	  ,
      city	 : contact.city	      ,
      country: contact.country	  ,
      email	 : contact.email	    ,
      name	 : contact.name	      ,
      owner: contact.owner
    });
  },

  /**
   * removing contact
   */
  remove: function(removeId) {
    AppDispatcher.dispatch({
      actionType: Constants._REMOVE,
      id: removeId
    });
  }

};

module.exports = Actions;
