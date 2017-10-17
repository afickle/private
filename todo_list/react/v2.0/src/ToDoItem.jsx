/*
 * @Author: lcj
 * @Date:   2017-10-17 16:49:57
 * @Last Modified by:   lcj
 * @Last Modified time: 2017-10-17 17:06:57
 * @Descriptions: 
 */

import React from 'react'

export default class ToDoItem extends React.Component {
	render() {
		return (
			<div>
				<input type="checkbox" checked={this.props.todo.status} onChange={()=>this.props.changeStatus(this.props.todo)}/>
				<span>{this.props.todo.value}</span>
				<button onClick={()=>this.props.deleteToDo(this.props.todo)}>X</button>
			</div>
		)
	}
}