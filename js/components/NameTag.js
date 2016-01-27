import React from 'react'


var NameTag = React.createClass({
	render() {
		return(
			<div className = 'tag'>
				<h1>{ this.props.username }</h1>
			</div>
		);
	}
})

export default NameTag;
