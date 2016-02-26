var React = require('react');
var Navbar = require('./Navbar');
var AddForm = require('./AddForm');
var EditForm = require('./EditForm');
var DataList = require('./DataList');
var ApiStub = require('../ApiStub');
var Actions = require('../Actions');

function getContactsState() {
  return {
    allContacts: ApiStub.getAll(),
    editContact: ApiStub.getEditContact()
  };
}

var MainApp = React.createClass({
  getInitialState: function() {
    // load from server

    this._initializeContacts();
    return getContactsState();
  },
  componentDidMount: function() {
		ApiStub.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ApiStub.removeChangeListener(this._onChange);
  },
	render: function() {

    var editContact = this.state.editContact;
    if ( editContact.editmode ) {

      $('#edit_modal').openModal();
      $('#edit_form').find('#company_name'	  ).val(  editContact.name	)
      $('#edit_form').find('#company_address' ).val(  editContact.address	)
      $('#edit_form').find('#company_phone'	  ).val(  editContact.phone	)
      $('#edit_form').find('#company_email'	  ).val(  editContact.email	)
      $('#edit_form').find('#company_city'	  ).val(  editContact.city	)
      $('#edit_form').find('#company_country'	).val(  editContact.country	)
      $('#edit_form').find('#record_id'	      ).val(  editContact.id	)
      $('#edit_form').find('#ownersdata'	    ).val(  editContact.owner )


      setTimeout(function() {
        $('#edit_form').find('#contact_name').focus();
      },50);
    }

    editContact.editmode = false;

    return(
      <ul className="collection">
        <Navbar/>
        <DataList data={this.state.allContacts}/>
        <AddForm />
        <EditForm editContact={this.state.editContact} />
      </ul>
    );
  },

  _onChange: function() {
    this.setState(getContactsState());

  },
  _initializeContacts: function() {
    // loading imaginary contacts
    // can also be loaded from a remote server
    var contacts = [
            {
              id: 1,
              name : 'Terrence S. Hatfield',
              phone: '651-603-1723',
              email: 'TerrenceSHatfield@rhyta.com'
            },
            {
              id: 2,
              name : 'Chris M. Manning',
              phone: '513-307-5859',
              email: 'ChrisMManning@dayrep.com'
            },
            {
              id: 3,
              name : 'Ricky M. Digiacomo',
              phone: '918-774-0199',
              email: 'RickyMDigiacomo@teleworm.us'
            },
            {
              id: 4,
              name : 'Michael K. Bayne',
              phone: '702-989-5145',
              email: 'MichaelKBayne@rhyta.com'
            },
            {
              id: 5,
              name : 'John I. Wilson',
              phone: '318-292-6700',
              email: 'JohnIWilson@dayrep.com'
            },
            {
              id: 6,
              name : 'Rodolfo P. Robinett',
              phone: '803-557-9815',
              email: 'RodolfoPRobinett@jourrapide.com'
            }
          ];

        contacts.forEach(function(obj) {
        	Actions.create(obj);
        });
  }

});

module.exports = MainApp;