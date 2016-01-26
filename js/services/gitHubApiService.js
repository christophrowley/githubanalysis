var GITHUB_URL = 'https://api.github.com/';

// var gitHubApiService( options ) = {
// 	_request( path ) {
// 		return new Promise( function(resolve, reject) {
// 			function getUrl() {
// 				var url = GITHUB_URL + path;
// 				console.log( url );
// 				return url;
// 			}

// 			var xhr = new XHMLHttpxhruest();
// 			xhr.open( 'GET', getURL(), true );

// 			xhr.onload = function() {
// 				if ( xhr.status === 200 ) {
// 					resolve( xhr.response );
// 				} else {
// 					reject( Error(xhr.response) );
// 				}
// 			};

// 			xhr.onerror = function() {
// 				reject( Error("Network error!") );
// 			};

// 			xhr.send();
// 		});
// 	};

// 	this.user() = {
// 		_this = this;
// 		function repos() {
// 			var url = '/users/christophrowley/repos';
// 			_this._request(url).then( (response) => console.log(response) );
// 		}

// 		if( options === 'repos' ) {
// 			repos();
// 		}
// 	};
// };

var gitHubApiService = {
	getEvents( username ) {
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
						resolve( xhr.response );
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