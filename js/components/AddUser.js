import React from 'react';
import gitHubActions from '../actions/gitHubActions.js'


var AddUser = React.createClass({
	getInitialState() {
		return {
			newUser: ''
		};
	},

	_onChange( event, value ) {
		this.setState({ newUser: event.target.value });
	},

	/**
	 * @param {object}
	**/
	_onKeyDown( event ) {
		switch ( event.keyCode ) {
			case 13: // Return key
				event.preventDefault();
				var text = this.state.newUser.trim();
				if ( text ) {
					gitHubActions.retrieveEvents( text, 15 );
				}
				this.setState({ newUser: "" });
				break;
			case 27: // Esc key
				event.preventDefault();
				this.setState({
					active: false,
					post_text: ''
				});
				break;
		}
	},

	render() {
		return(
			<textarea 
				rows = {1}
				ref = 'addUser'
				value = {this.state.newUser}
				onChange = {this._onChange}
				onKeyDown = {this._onKeyDown}
			/>
		);
	}
});

export default AddUser;
