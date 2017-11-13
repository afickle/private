import React, { Component } from 'react';

import './../css/App.less';

import AddBar from './AddBar';
import TodoItem from './TodoItem';
import TodoBtn from './TodoBtn';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className="header">Todo Lists</header>
                <div className="main">
                    <AddBar />
                    <TodoItem />
                    <TodoBtn />
                </div>
            </div>
        );
    }
}

export default App;