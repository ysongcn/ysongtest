var React = require('react');
var Actions = require('../Actions');

var Detail = React.createClass({
	render:function() {
		var data = this.props.data;
		return(
			<li className="collection-item avatar">
			<span className="title">CompanyName: {data.name}</span>
			<p>Address: {data.address} <br />
			Region: {data.city} {data.country}
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