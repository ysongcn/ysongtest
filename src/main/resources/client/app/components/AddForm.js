var React = require('react');
var Actions = require('../Actions');
var config = require('../config')
var AddForm = React.createClass({

 getInitialState : function(){
   return{
    owners : [],
    removedOwner: null
   }
  },

  _addOwner:function(){
  		var form = $('#_form');
  	  var name = form.find('#owner_append').val();
      form.find('#owner_append').val('');

      var context = this;
      if(name){
        fetch(config.apibase + '/owner', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name : name })
            }).then(function(ret){
              return ret.json();
            }).then(function(json){
              if(json.id){
                  context.state.owners.push({name: name ,id: json.id});
                  context.state.owners = context.state.owners.filter(Boolean);
                  context.forceUpdate();
              }
            });
      }
  },

  _removeOwner:function(o,e){
      e.preventDefault();
      var ctx =this;
      fetch(config.apibase + '/owner/'+o.id, { method: 'DELETE'} )
      .then(function(ret){ return ret.json(); })
      .then(function(json){
        if(json && json ==='ok'){
          var idx = ctx.state.owners.indexOf(o)
          if(idx!=-1) {
            delete ctx.state.owners[idx];
            ctx.state.owners = ctx.state.owners.filter(Boolean);
            ctx.forceUpdate();
          }
        }
      });
  },

	render:function() {
		var that = this;
		return(
			<div id="_modal" className="modal">
				<form id="_form" onSubmit={this._saveData}>
					<div className="modal-content">
						<h4>Add New Company</h4>
						<div className="input-field">
							<i className="mdi-editor-format-textdirection-l-to-r prefix"></i>
							<input id="company_name" type="text" className="validate" />
							<label htmlFor="icon_prefix">Company Name</label>
						</div>

						<div className="input-field">
							<i className="mdi-communication-location-on prefix"></i>
							<input id="company_address" type="text" className="validate" />
							<label htmlFor="icon_prefix">Company Address</label>
						</div>

						<div className="input-field">
							<i className="mdi-maps-map prefix"></i>
							<input id="company_city" type="text" className="validate" />
							<label htmlFor="icon_prefix">City</label>
						</div>

			    <div className="input-field">
							<i className="mdi-action-language prefix"></i>
							<input id="company_country" type="text" className="validate" />
							<label htmlFor="icon_prefix">Country</label>
						</div>


						<div className="input-field">
							<i className="mdi-communication-email prefix"></i>
							<input id="company_email" type="email" className="validate"/>
							<label htmlFor="icon_email">Email</label>
						</div>

						<div className="input-field">
							<i className="mdi-communication-phone prefix"></i>
							<input id="company_phone" type="tel" className="validate"/>
							<label htmlFor="icon_telephone">Phone</label>
						</div>


						<div className="input-field">
							<i className="mdi-action-account-circle prefix"></i>

							<input id="owner_append" type="tel" className="validate"/>
							<label htmlFor="owner_append">Add Owner</label>

                <a onClick={this._addOwner} className="right-done-button teal darken-1 waves-effect waves-circle waves-light btn-floating secondary-content">
                      <i className="mdi-action-done"></i>
                    </a>

            <div className="owners">

            {this.state.owners.map(function(o){

            return <div className="chip" key={o.id+Date.now()}>{o.name}
            <a className="chipbutton" onClick={that._removeOwner.bind(null, o)}>x</a></div>

            })}

             <div className="right hint">input and click done icon to append new owner</div>
          </div>

						</div>

					</div>
					<input type="submit" className="hidden-btn"/>
				</form>

				<div className="modal-footer">
					<a onClick={this._saveData}
					className="waves-effect waves-green btn waves-effect waves-light ">Save Company </a>
				</div>

			</div>
		);
	},

	_saveData: function(e) {
		e.preventDefault();
		var data = {};
		var form = $('#_form');

		// getting data from form
		data.name =     form.find('#company_name').val();
		data.address =  form.find('#company_address').val();
		data.phone =    form.find('#company_phone').val();
		data.email =    form.find('#company_email').val();
		data.city =     form.find('#company_city').val();
		data.country =  form.find('#company_country').val();
		data.owner = this._owners();
    var validated = false;
    if(!data.name    ){ Materialize.toast('Company name cannot be null', 2000);form.find('#company_name').focus();return;}
    if(!data.address ){ Materialize.toast('Company address cannot be null', 2000);form.find('#company_address').focus();return;}
    if(!data.city    ){ Materialize.toast('Company city cannot be null', 2000);form.find('#company_city').focus();return;}
    if(!data.country ){ Materialize.toast('Company country cannot be null', 2000);form.find('#company_country').focus();return;}
    if(!data.owner   ){ Materialize.toast('Company owner cannot be null', 2000);form.find('#owner_append').focus();return;}
    if(form.find('#company_email').hasClass("invalid")){ Materialize.toast('Company email wrong format', 2000);form.find('#company_email').focus();return;}
    if(!this._isPhone(data.phone) ){ Materialize.toast('Company phone wrong format', 2000);form.find('#company_phone').focus();return;}

    validated = true;
    if(validated){
      console.log(data);
		  Actions.create(data);
		  this._clearForm();
		}
	},

  _isPhone:function(a){
      var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
      if (filter.test(a)||!a) {
          return true;
      }
      else {
          return false;
      }
  },
  _owners:function(){
    var result = '';
    this.state.owners.forEach(function(o){
      result += o.name +',' + o.id+";";
    });
    return result;
  },


	_clearForm: function() {
		var form = $('#_form');

		form.find('#company_name').val('');
    form.find('#company_address').val('');
    form.find('#company_phone').val('');
    form.find('#company_email').val('');
    form.find('#company_city').val('');
    form.find('#company_country').val('');
    this.state.owners = [];
		$('#_modal').closeModal();
	}
});

module.exports = AddForm;