import React from 'react'
import gitHubActions from '../actions/gitHubActions.js'


var NameTag = React.createClass({
	removeUser() {
		gitHubActions.removeEvents( this.props.username );
	},

	render() {
		return(
			<div className = 'tag' style = {{background: this.props.col}} >
				<h2>{ this.props.username }</h2>
				<div
					className = {'remove'}
					onClick = {( this.removeUser )}
				></div>
			</div>
		);
	}
})

export default NameTag;
