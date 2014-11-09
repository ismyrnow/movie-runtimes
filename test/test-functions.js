/*jshint node: true */
'use strict';

var fn = require('../functions');
var Movie = require('../movie').Movie;
var _ = require('underscore');


exports.parseLineTopGrossing = function ( test ) {
	var movie = fn.parseLineTopGrossing( 'The Lion King (1998)' );

	test.equal( movie.title, 'The Lion King' );
	test.equal( movie.year, 1998 );
	test.done();
};


exports.readTopGrossing = function ( test ) {
	test.expect(4);

	fn.readTopGrossing( 'test/top-grossing.txt', function ( movies ) {

		_.each( movies, function ( movie ) {
			test.notEqual( movie, undefined );
			test.notEqual( movie.title, undefined );
		});

		test.done();

	});
};


exports.parseLineRunningTimes = function ( test ) {
	var movie = fn.parseLineRunningTimes( 'The Lion King (1994)					89' );

	test.equal( movie.title, 'The Lion King' );
	test.equal( movie.year, 1994 );
	test.equal( movie.runningTime, 89 );
	test.done();
};


exports.updateMovieList = function ( test ) {
	// Add some movies to the `movies` hash map.
	var movie1 = new Movie( 'The Lion King', 1994 );
	var movie2 = new Movie( 'Gone with the Wind', 1939 );
	var existingMovies = {};
	existingMovies[movie1.hash()] = movie1;
	existingMovies[movie2.hash()] = movie2;

	// Create a brand new movie with a matching title and year.
	var movie = new Movie( 'The Lion King', 1994 );
	movie.runningTime = 89;

	// Check that our existing movie list doesn't already have a running time.
	test.equal( existingMovies[movie1.hash()].runningTime, null );

	var updatedMovies = fn.updateMovieList( existingMovies, movie );

	// Check that the updated movie list has the running time added.
	test.equal( updatedMovies[movie1.hash()].runningTime, 89 );
	test.done();
};


exports.updateMoviesWithRunningTimes = function ( test ) {
	// Add some movies to the `movies` hash map.
	var movie1 = new Movie( 'The Lion King', 1994 );
	var movie2 = new Movie( 'Gone with the Wind', 1939 );
	var existingMovies = {};
	existingMovies[movie1.hash()] = movie1;
	existingMovies[movie2.hash()] = movie2;

	fn.updateMoviesWithRunningTimes( existingMovies, 'test/running-times.txt', function ( movies ) {

		test.equal( typeof movies, 'object' );
		test.equal( movies[movie1.hash()].title, 'The Lion King' );
		test.equal( movies[movie1.hash()].runningTime, 89 );
		test.equal( movies[movie2.hash()].runningTime, 238 );
		test.done();

	});
};