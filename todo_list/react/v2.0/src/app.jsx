/*
 * @Author: lcj
 * @Date:   2017-10-17 16:09:36
 * @Last Modified by:   lcj
 * @Last Modified time: 2017-10-17 17:14:20
 * @Descriptions: 
 */

import React from 'react'
import {
	render
} from 'react-dom'
import AddToDo from './AddToDo.jsx'
import ToDoItem from './ToDoItem.jsx'
import StatusBar from './StatusBar.jsx'

class Main extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			todoList: [{
				value: 1,
				status: 0
			}, {
				value: 2,
				status: 1
			}, {
				value: 3,
				status: 0
			}],
			showType: 2
		}
	}

	addToDo(value, status = 0) {
		let todoTemplate = {
			value: value,
			status: status
		}
		let todoList = this.state.todoList;
		todoList.push(todoTemplate);
		this.setState({
			todoList
		})
	}

	deleteToDo(todo) {
		let todoList = this.state.todoList;
		let index = todoList.indexOf(todo)
		todoList.splice(index, 1)
		this.setState({
			todoList
		})
	}

	changeStatus(todo) {
		let todoList = this.state.todoList;
		let index = todoList.indexOf(todo)
		todoList[index].status = todoList[index].status === 1 ? 0 : 1;
		this.setState({
			todoList
		})
	}

	changeShowTyps(showType) {
		this.setState({
			showType
		})
	}

	render() {
		const showList = this.state.showType === 2 ? this.state.todoList : this.state.todoList.filter((item) => item.status === this.state.showType)
		return (
			<div style={{textAlign:'center'}}>
				<h1>Todo Lists</h1>
				 <AddToDo addToDo={this.addToDo.bind(this)}/>
				 {
				 	showList.map((todo,i)=>
				 		<ToDoItem todo={todo} key={i} deleteToDo={this.deleteToDo.bind(this)} changeStatus={this.changeStatus.bind(this)}/>)
				 }
				 <StatusBar todoList={showList} changeShowTyps={this.changeShowTyps.bind(this)}/>
			</div>
		)
	}
}


render(<Main/>, document.getElementById('body'))