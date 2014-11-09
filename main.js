/*jshint node: true */
'use strict';

var fn = require('./functions');
var _ = require('underscore');


(function main () {

	// Compile movies list with title and year
	fn.readTopGrossing( './top-grossing.txt', function ( movies ) {

		// Add running times to movies list
		fn.updateMoviesWithRunningTimes( movies, './running-times.txt', function ( movies ) {

			// Print movies without a running time
			var unmatchedMovies = _.filter(movies, function (movie) {
				return !movie.runningTime;
			});

			unmatchedMovies.forEach(function (movie) {
				console.log('Running time \'' + movie + '\' was not found.');
			});

			console.log(_.size(unmatchedMovies) + ' movies unmatched.')

			//fn.outputToCsv();

			// _.each(movies, function ( value, key, list ) {
			// 	console.log(value);
			// });
			// console.log('done');

		});

	});

}());