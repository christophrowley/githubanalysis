import 'datejs';


var GITHUB_URL = 'https://api.github.com/';

var gitHubApiService = {
	/**
	 * @param {string} 	username
	 * @param {int} 		event data for the past x days
	 * @return {array}	array of objects containing a date and commit	
	**/
	getEvents( username, duration ) {
		if ( username ) {
			return new Promise( function( resolve, reject ) {
				function getUrl() {
					var url = GITHUB_URL + 'users/' + username + '/events';
					return url;
				};

				var xhr = new XMLHttpRequest();
				xhr.open('GET', getUrl(), true);

				xhr.onload = function() {
					if ( xhr.status === 200 ) {
						var dataset = [];
						for ( var i = 0; i < duration; i++ ) {
							dataset.push({
								date: Date.today().add({ days: -i }),
								commitCount: 0
							});
						}

						JSON.parse( xhr.response ).map( function(event) {
							if ( event.type === 'PushEvent' ) {
								for( var i = 0; i < dataset.length; i++ ) {
									if ( Date.equals( Date.parse( event.created_at ).set({ millisecond: 0, second: 0, minute: 0, hour: 0 }), dataset[i].date ) === true ) {
										dataset[i].commitCount += event.payload.distinct_size;
									}
								}
							}
						});

						resolve( dataset );
					} else {
						reject( Error( xhr.response ) );
					}
				};

				xhr.onerror = function() {
					reject( Error('Network error!') );
				};

				xhr.send();
			});
		} else {
			console.log( 'User not defined!' );
		}
	}
}

export default gitHubApiService;
