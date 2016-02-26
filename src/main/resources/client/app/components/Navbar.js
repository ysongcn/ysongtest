var React = require('react');

var Navbar = React.createClass({
	render:function() {
		return(
			<li className="collection-header">
				<span className="title flow-text">Company Manager</span>
				<a onClick={this._openAddModal} className="teal darken-1 waves-effect waves-circle waves-light btn-floating secondary-content">
					<i className="mdi-content-add"></i>
				</a>
			</li>
		);
	},

	_openAddModal: function() {
		$('#_modal').openModal();
		$('#_modal').find('#contact_name').focus();
	}
});

module.exports = Navbar;