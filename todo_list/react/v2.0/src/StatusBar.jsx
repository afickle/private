/*
 * @Author: lcj
 * @Date:   2017-10-17 17:07:21
 * @Last Modified by:   lcj
 * @Last Modified time: 2017-10-17 17:12:47
 * @Descriptions: 
 */
import React from 'react'

export default class StatusBar extends React.Component {
	render() {
		return (
			<div>
				<span>{this.props.todoList.filter(item=>item.status===0).length} Items left</span>
				<button onClick={()=>this.props.changeShowTyps(2)}>All</button>
				<button onClick={()=>this.props.changeShowTyps(0)}>active</button>
				<button onClick={()=>this.props.changeShowTyps(1)}>completed</button>
			</div>
		)
	}
}