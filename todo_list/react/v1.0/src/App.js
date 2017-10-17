import React, { Component } from 'react';
import './App.css';
// import TODOS from './data';

const TODOS = [
  {id: 1, item: 'Sporting', completed: false},
  {id: 2, item: 'Goods', completed: false}
];

let ids = 2;

let getItems = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed;
        })
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed;
        })
    }
}

class AddBar extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
    }

    handleInput(e) {
        this.props.onHandleInput(e.target.value);
    }

    handleCheck(e) {
        this.props.onHandleCheck(e.target.checked);
    }

    handleKeyup(e) {
        e.keyCode === 13 && this.props.onHandleKeyup(e.target.value);
    }

    render() {
        return (
            <div className="main-input">
                <input type="checkbox" checked={this.props.isAll} onChange={this.handleCheck} />
                <input type="text" value={this.props.newItem} onChange={this.handleInput} onKeyUp={this.handleKeyup} />
            </div>
        )
    }
}

class TodoBtn extends Component {
    constructor(props) {
        super(props);
        this.clickAll = this.clickAll.bind(this);
        this.clickActive = this.clickActive.bind(this);
        this.clickCompleted = this.clickCompleted.bind(this);
    }

    clickAll() {
        this.handleClick('all');
    }

    clickActive() {
        this.handleClick('active');
    }

    clickCompleted() {
        this.handleClick('completed');
    }

    handleClick(type) {
        this.props.checkAll(type);
    }

    render() {
        return (
            <div className="content-footer">
                <div>
                    <span>{this.props.todos.length}</span> items left
                </div>
                <div className="content-btn">
                    <button className="btn" onClick={this.clickAll}>All</button>
                    <button className="btn" onClick={this.clickActive}>Active</button>
                    <button className="btn" onClick={this.clickCompleted}>Completed</button>
                    <button className="btn btn-remove">Remove</button>
                </div>
            </div>
        )
    }
}

class RowItem extends Component {
    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleCheck(e) {
        this.props.eachHandleCheck(e.target.checked, this.props.todo);
    }

    handleRemove() {
        this.props.onHandleRemove(this.props.todo);
    }

    render() {
        return (
            <li className="todo">
                <div className="view">
                    <input type="checkbox" className="toggle" checked={this.props.todo.completed} onChange={this.handleCheck} />
                    <label>{this.props.todo.item}</label>
                    <span className="itme-delete" onClick={this.handleRemove}>x</span>
                </div>
            </li>
        )
    }
}

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.eachHandleCheck = this.eachHandleCheck.bind(this);
        this.onHandleRemove = this.onHandleRemove.bind(this);
    }

    eachHandleCheck(e, item) {
        this.props.eachHandleCheck(e, item);
    }

    onHandleRemove(e) {
        this.props.onHandleRemove(e);
    }
    render() {
        const items = [];
        this.props.todos.forEach((todo) => {
            items.push(
                <RowItem todo={todo} key={todo.id} eachHandleCheck={this.eachHandleCheck} onHandleRemove={this.onHandleRemove} />
            )
        })

        return (
            <div className="items-list">
                <ul className="todo-list">
                    {items}
                </ul>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: '', 
            isAll: false, 
            todos: TODOS,
            filtertodos: TODOS
        };
        this.onHandleInput = this.onHandleInput.bind(this);
        this.onHandleCheck = this.onHandleCheck.bind(this);
        this.onHandleKeyup = this.onHandleKeyup.bind(this);
        this.eachHandleCheck = this.eachHandleCheck.bind(this);
        this.onHandleRemove = this.onHandleRemove.bind(this);
        this.checkAll = this.checkAll.bind(this);
    }

    onHandleInput(e) {
        this.setState({newItem: e});
    }

    onHandleCheck(e) {
        var todos = this.state.todos.map((todo) => {
            todo.completed = e;
            return todo;
        })
        this.setState({isAll: e, todos: todos, filtertodos: todos});
    }

    onHandleKeyup(e) {
        /*如果TODOS是props怎么更新？*/
        let obj = {id: ++ids, item: e, completed: false};
        this.setState((preVal) => ({
            todos: preVal.todos.concat(obj),
            filtertodos: preVal.todos.concat(obj),
            newItem: ''
        }))
    }

    eachHandleCheck(e, item) {
        var todos = this.state.todos.map((todo) => {
            if (todo === item) {
                todo.completed = e;
            }
            return todo;
        })
        let checked = true;
        todos.forEach(function(todo) {
            if (!todo.completed) {
                checked = false;
            }
        })
        this.setState({isAll: checked, todos: todos, filtertodos: todos});
    }

    onHandleRemove(e) {
        let index = this.state.todos.indexOf(e);
        this.state.todos.splice(index, 1);
        this.setState((preVal) => ({
            todos: preVal.todos,
            filtertodos: preVal.todos
        }))
    }

    checkAll(type) {
        let filtertodos = getItems[type](this.state.todos);
        this.setState({filtertodos: filtertodos});
    }

    render() {
        return (
            <div>
                <header className="header">Todo Lists</header>
                <div className="main">
                    <AddBar 
                        newItem={this.state.newItem}
                        isAll={this.state.isAll}
                        onHandleInput={this.onHandleInput}
                        onHandleCheck={this.onHandleCheck}
                        onHandleKeyup={this.onHandleKeyup}
                    />
                    <TodoItem 
                        todos={this.state.filtertodos}
                        isAll={this.state.isAll}
                        onHandleRemove={this.onHandleRemove} 
                        eachHandleCheck={this.eachHandleCheck}
                    />
                    <TodoBtn 
                        todos={this.state.todos} 
                        checkAll={this.checkAll}
                    />
                </div>
            </div>
        );
    } 
}

export default App;
