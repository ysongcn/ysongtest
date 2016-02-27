var React = require('react');
var Actions = require('../Actions');
var config = require('../config')

var EditForm = React.createClass({

 getInitialState : function(){
   return{
    owners : [],
    removedOwner: null,
    ctx :this,
    editing: '0'
   }
  },

    _addOwner:function(){
    		var form = $('#edit_form');
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

  _owners:function(){
    var result = '';
    this.state.owners.forEach(function(o){
      result += o.name +',' + o.id+";";
    });
    return result;
  },

  componentDidUpdate: function() {
		  var id = $('#edit_form').find('#record_id').val();
      if( this.state.editing !== id) {
        this.state.owners = [];
        this.state.editing = id;
      }
      var form = $('#edit_form');

      var context = this;
      if(form.find('#ownersdata').val()!=''){

      form.find('#ownersdata').val().split(';').forEach(function(o){
        if(o === '') return;
        var name = o.split(',')[0]
        var id =  o.split(',')[1]
        context.state.owners.push({id:id,name:name});
      });

      form.find('#ownersdata').val('')
      this.forceUpdate();
      }
  },
  _save_all:function(){
    this._save();
    this._clearForm();
  },
	render:function() {


    ctx = this;

		return(

		<div id="edit_modal" className="modal">
    				<form id="edit_form" onSubmit={this._save_all}>
    				  <input id="ownersdata" type="hidden" />
              <input id="record_id" type="hidden" />
    					<div className="modal-content">
    						<h4>Edit Company</h4>
    						<div className="input-field">
    							<i className="mdi-editor-format-textdirection-l-to-r prefix"></i>
    							<input id="company_name" type="text" className="validate" />
    						</div>

    						<div className="input-field">
    							<i className="mdi-communication-location-on prefix"></i>
    							<input id="company_address" type="text" className="validate" />
    						</div>

    						<div className="input-field">
    							<i className="mdi-maps-map prefix"></i>
    							<input id="company_city" type="text" className="validate" />
    						</div>

    			    <div className="input-field">
    							<i className="mdi-action-language prefix"></i>
    							<input id="company_country" type="text" className="validate" />
    						</div>


    						<div className="input-field">
    							<i className="mdi-communication-email prefix"></i>
    							<input id="company_email" type="email" className="validate"/>
    						</div>

    						<div className="input-field">
    							<i className="mdi-communication-phone prefix"></i>
    							<input id="company_phone" type="tel" className="validate"/>
    						</div>


    						<div className="input-field">
    							<i className="mdi-action-account-circle prefix"></i>

    							<input id="owner_append" type="tel" className="validate"/>

                    <a onClick={this._addOwner} className="right-done-button teal darken-1 waves-effect waves-circle waves-light btn-floating secondary-content">
                          <i className="mdi-action-done"></i>
                        </a>

                <div className="owners" id="owners">

                {



               this.state.owners.map(function(o){

                    return <div className="chip" key={o.id+Date.now()}>{o.name}

                                <a className="chipbutton" onClick={ctx._removeOwner.bind(null, o)}>x</a></div>

                    })

               }

                 <div className="right hint">input and click done icon to append new owner</div>
              </div>

    						</div>

    					</div>
    					<input type="submit" className="hidden-btn"/>
    				</form>

    				<div className="modal-footer">
    					<a onClick={this._save_all}
    					className="waves-effect waves-green btn waves-effect waves-light ">Update Company </a>
    					<a onClick={this._remove} className="red lighten-4 modal-action modal-close waves-effect waves-red btn-flat">delete record</a>
    				</div>

    			</div>
		);
		
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
	_save: function(e) {
//		e.preventDefault();

		var data = {};
		var form = $('#edit_form');

		// getting data from form
    		data.name =     form.find('#company_name').val();
    		data.address =  form.find('#company_address').val();
    		data.phone =    form.find('#company_phone').val();
    		data.email =    form.find('#company_email').val();
    		data.city =     form.find('#company_city').val();
    		data.country =  form.find('#company_country').val();
    		data.owner = this._owners();
        data.id = form.find('#record_id').val();
        var validated = false;
        if(!data.name    ){ Materialize.toast('Company name cannot be null', 2000);form.find('#company_name').focus();return;}
        if(!data.address ){ Materialize.toast('Company address cannot be null', 2000);form.find('#company_address').focus();return;}
        if(!data.city    ){ Materialize.toast('Company city cannot be null', 2000);form.find('#company_city').focus();return;}
        if(!data.country ){ Materialize.toast('Company country cannot be null', 2000);form.find('#company_country').focus();return;}
        if(!data.owner   ){ Materialize.toast('Company owner cannot be null', 2000);form.find('#owner_append').focus();return;}
        if(form.find('#company_email').hasClass("invalid")){ Materialize.toast('Company email wrong format', 2000);form.find('#company_email').focus();return;}
        if(!this._isPhone(data.phone) ){ Materialize.toast('Company phone wrong format', 2000);form.find('#company_phone').focus();return;}

    		Actions.save(data);

	},
	// when the user clicks on delete button
	_remove: function(e) {
		//e.preventDefault();
		var removeId = $('#edit_form').find('#record_id').val();

		//sending to action
		Actions.remove(removeId);

		this._clearForm();
	},
	/*
	 * clearing form and closing modal for the next time
	 */
	_clearForm: function() {
		var form = $('#edit_form');


		form.find('#company_name').val('');
    form.find('#company_address').val('');
    form.find('#company_phone').val('');
    form.find('#company_email').val('');
    form.find('#company_city').val('');
    form.find('#company_country').val('');
    form.find('#ownersdata').val('');
    var ctx = this;
    this.state.owners.map(function(o){
      ctx.state.owners = []//.splice( ctx.state.owners.indexOf(o),1);// destroy
    });


    this.state.owners = []
    this.forceUpdate();
		$('#edit_modal').closeModal();
	}
});

module.exports = EditForm;