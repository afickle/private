/*
 * @Author: lcj
 * @Date:   2017-10-17 16:39:56
 * @Last Modified by:   lcj
 * @Last Modified time: 2017-10-17 16:52:07
 * @Descriptions: 
 */

import React from 'react'

export default class AddToDo extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			value: ""
		}
	}

	addToDo() {
		this.props.addToDo(this.state.value, 0);
		this.setState({
			value: ""
		})
	}

	render() {
		return (
			<div>
				<input
					type="text"
					value={this.state.value}
					onChange={(e)=>this.setState({value:e.target.value})}/>
				<button onClick={()=>this.addToDo.call(this)}>+</button>
			</div>
		)
	}
}