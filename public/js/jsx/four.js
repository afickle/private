"use strict";

var MarkdownEditor = React.createClass({
    displayName: "MarkdownEditor",

    getInitialState: function getInitialState() {
        return { value: 'Type some *markdown* here!' };
    },
    handleChange: function handleChange() {
        this.setState({ value: this.refs.textarea.value });
    },
    rawMarkup: function rawMarkup() {
        return { __html: marked(this.state.value, { sanitize: true }) };
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "MarkdownEditor" },
            React.createElement(
                "h3",
                null,
                "Input"
            ),
            React.createElement("textarea", {
                onChange: this.handleChange,
                ref: "textarea",
                defaultValue: this.state.value }),
            React.createElement(
                "h3",
                null,
                "Output"
            ),
            React.createElement("div", {
                className: "content",
                dangerouslySetInnerHTML: this.rawMarkup()
            })
        );
    }
});

ReactDOM.render(React.createElement(MarkdownEditor, null), document.getElementById('content'));