var HelloMessage = React.creatClass({
	render : function() {
		return <div>Hello {this.props.name}</div>;
	}
});

ReactDOM.render(<HelloMessage name="World" />, document.getElementById('content'));