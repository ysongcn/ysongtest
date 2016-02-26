var React = require('react');
var Actions = require('../Actions');

var Detail = React.createClass({
	render:function() {
		var data = this.props.data;
		return(
			<li className="collection-item avatar">
			<span className="title">{data.name}</span>
			<p>Phone Number: {data.id} <br />
			Email: {data.email}
			</p>
			<a href="#" onClick={this._openEditModal} className="secondary-content"><i className="mdi-editor-mode-edit"></i></a>
			</li>
		);
	},
	_openEditModal: function() {
		var data = this.props.data;
		data.editmode = true;
		Actions.edit(data);
	}
});

module.exports = Detail;