var data = [
	{id : 1, author : "Pete", text : "This is one comment"},
	{id : 2, author : "Joeh", text : "This is another comment"}
];

// React.createClass to create a new React component 
var CommentList = React.createClass({
	render : function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>	
		);
	}
});

var CommentForm = React.createClass({
	getInitialState : function() {
		return{author : '', text : ''};
	},
	handleAuthorChange : function(e) {
		this.setState({author : e.target.value});
	},
	handleTextChange : function(e) {
		this.setState({text : e.target.value});
	},
	handleSubmit : function(e) {
		e.preventDefault();
		var author = this.status.author.trim();
		var text = this.status.text.trim();
		if(!text || !author) {
			return;
		}
		// TODO : send request to the server
		this.props.onCommetSubmit({author : author, text : text});
		this.setState({author : '', text : ''});
	},
	render : function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
				<input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
				<input type="submit" value="Post" />
			</form>
		);
	}
});	

var CommentBox = React.createClass({
	loadCommentsFromServer : function() {
		$.ajax({
			url : this.props.url,
			dataType : 'json',
			cache : false,
			success : function(data) {
				this.setState({data : data});
			}.bind(this),
			error : function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit : function(comment) {
		var comments = this.state.data;
		comment.id = Data.now();
		var newComments = comments.concat([comment]);
		this.setState({data : newComments});
		// TODO : submit to the server and refresh the list
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.setState({data : data});
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({data : comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState : function() {
		return {data : []};
	},
	componentDidMount : function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render : function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommetSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

var Comment = React.createClass({
	render : function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
				// {marked(this.props.children.toString())} 
			</div>
		);
	}
});

// 路径没有问题路径没有问题 需要在server端处理一下
ReactDOM.render(
	<CommentBox url="comments.json" pollInterval={2000} />,
	document.getElementById('content')
);