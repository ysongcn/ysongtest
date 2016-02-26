var React = require('react');
var Detail = require('./Detail');

var DataList = React.createClass({
	render:function() {
		var arr=[];

		for (bean in this.props.data) {
			arr.push(<Detail key={this.props.data[bean].id} data={this.props.data[bean]} />);
		}
		return(<ul>{arr}</ul>);
	}
});

module.exports = DataList;