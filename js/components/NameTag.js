import React from 'react'
import gitHubActions from '../actions/gitHubActions.js'


var NameTag = React.createClass({
	removeUser() {
		gitHubActions.removeEvents( this.props.username );
	},

	render() {
		console.log( 'tag called' );
		return(
			<div className = 'tag'>
				<h1>{ this.props.username }</h1>
				<div
					className = {'remove'}
					onClick = {( this.removeUser )}
				>X</div>
			</div>
		);
	}
})

export default NameTag;
