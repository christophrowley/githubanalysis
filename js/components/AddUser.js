import React from 'react';
import gitHubActions from '../actions/gitHubActions.js'
import retrieveLength from '../constants/retrieveLength.js'

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
					gitHubActions.retrieveEvents( text, retrieveLength );
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
				placeholder = {'username'}
			/>
		);
	}
});

export default AddUser;
