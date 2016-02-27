var React = require('react');
var Navbar = require('./Navbar');
var AddForm = require('./AddForm');
var EditForm = require('./EditForm');
var DataList = require('./DataList');
var ApiStub = require('../ApiStub');
var Actions = require('../Actions');
var config = require('../config')
function getContactsState() {
  return {
    allContacts: ApiStub.getAll(),
    editContact: ApiStub.getEditContact()
  };
}

var MainApp = React.createClass({
  getInitialState: function() {
    // load from server
    $("#none").hide();
    $("#loading").show();

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
        <div id="loading" className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div clasclassNames="circle"></div>
              </div>
              </div>
            </div>

      </ul>
    );
  },

  _onChange: function() {
    this.setState(getContactsState());

  },
  _initializeContacts: function() {


    var contacts = [];
    var api = config.apibase + "/company";
    fetch(api).then(function(resp){ return resp.json();}).then(function(result){

      contacts = result.list;
      console.log(contacts);
      if(contacts){
        $("#none").hide();
        contacts.forEach(function(obj) {
          Actions.init(obj);
        });
        }
      else
        $("#none").show();

       $("#loading").hide()
    });


  }

});

module.exports = MainApp;