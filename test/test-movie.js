/*jshint node: true */
'use strict';

var Movie = require('../movie').Movie;


exports.hashMap = function ( test ) {

	// Add some movies to the `movies` hash map.
	var movie1 = new Movie( 'The Lion King', 1994 );
	var movie2 = new Movie( 'Gone with the Wind', 1939 );
	var movies = {};
	movies[movie1] = movie1;
	movies[movie2] = movie2;

	// Test that the movies exist on the hash map.
	test.equal( movies[movie1].title, 'The Lion King' );
	test.equal( movies[movie1].year, 1994 );
	test.equal( movies[movie2].title, 'Gone with the Wind' );
	test.equal( movies[movie2].year, 1939 );

	// Add a running time to the first movie.
	movies[movie1].runningTime = 89;

	// Test that the hash map lookup still works.
	test.equal( movies[movie1].title, 'The Lion King' );
	test.equal( movies[movie1].year, 1994 );
	test.equal( movies[movie1].runningTime, 89 );

	test.done();

};


exports.hash = function ( test ) {

	var movie1 = new Movie( 'Harry Potter and the Half-Blood Prince', 2009 );

	test.equal( movie1.hash(), 'harrypotterhalfbloodprince2009' );
	test.done();

};