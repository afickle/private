import React, { Component } from 'react';
import './App.css';
// import TODOS from './data';

const TODOS = [
  {id: 1, item: 'Sporting', completed: false},
  {id: 2, item: 'Goods', completed: false}
];

class AddBar extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleInput(e) {
        this.props.onHandleInput(e.target.value);
    }

    handleCheck(e) {
        this.props.onHandleCheck(e.target.checked);
    }

    render() {
        return (
            <div className="main-input">
                <input type="checkbox" checked={this.props.isAll} onChange={this.handleCheck} />
                <input type="text" value={this.props.newItem} onChange={this.handleInput} />
            </div>
        )
    }
}

class RowItem extends Component {
    render() {
        return (
            <li className="todo">
                <div className="view">
                    <input type="checkbox" className="toggle" checked={this.props.todo.checked} />
                    <label>{this.props.todo.item}</label>
                    <span className="itme-delete">x</span>
                </div>
            </li>
        )
    }
}

class TodoBtn extends Component {
    render() {
        return (
            <div className="content-footer">
                <div>
                    <span>{this.props.todos.length}</span> items left
                </div>
                <div className="content-btn">
                    <button className="btn">All</button>
                    <button className="btn">Active</button>
                    <button className="btn">Completed</button>
                    <button className="btn btn-remove">Remove</button>
                </div>
            </div>
        )
    }
}

class TodoItem extends Component {
    render() {
        const items = [];
        this.props.todos.forEach((todo) => {
            items.push(
                <RowItem todo={todo} key={todo.id} />
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
        this.state = {newItem: '', isAll: false};
        this.onHandleInput = this.onHandleInput.bind(this);
        this.onHandleCheck = this.onHandleCheck.bind(this);
        // this.onHandleBlur = this.onHandleBlur.bind(this);
        // this.onHandleRemove = this.onHandleRemove.bind(this);
    }

    onHandleInput(e) {
        this.setState({newItem: e});
    }

    onHandleCheck(e) {
        this.setState({isAll: e});
    }

    /*onHandleBlur(e) {
        this.setState
    }*/

    /*onHandleRemove(e) {
        this.props.todos
    }*/

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
                        onHandleBlur={this.onHandleBlur}
                    />
                    <TodoItem 
                        todos={TODOS}
                        isAll={this.state.isAll}
                        onHandleRemove={this.onHandleRemove} 
                    />
                    <TodoBtn todos={TODOS} />
                </div>
            </div>
        );
    } 
}

export default App;
