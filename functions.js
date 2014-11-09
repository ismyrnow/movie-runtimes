/*jshint node: true */
'use strict';

var fs = require('fs');
var Lazy = require('lazy');
var printf = require('util').format;
var _ = require('underscore');
var Movie = require('./movie').Movie;


var tgRegex = /^(.+) \(([0-9]{4})\)/;
var rtRegex = /^([^""].+) \(([0-9]{4}).*(?:\s|:)([0-9]+)/;


exports.readTopGrossing = function( path, callback ) {
	var stream = fs.createReadStream( path );
	var self = this;
	var movies = {};

	new Lazy( stream )
		.lines
		.forEach( function ( line ) {
			var movie = self.parseLineTopGrossing( line );
			movies[movie.hash()] = movie;
		});

	stream.resume();
	stream.on( 'end', function () {
		callback ( movies );
	});
};


// movies: existing hash map of movies.
exports.updateMoviesWithRunningTimes = function( movies, path, callback ) {
	var stream = fs.createReadStream( path );
	var self = this;

	new Lazy( stream )
		.lines
		.forEach( function( line ) {
			var movie = self.parseLineRunningTimes( line );
			movies = self.updateMovieList( movies, movie );
		});

	stream.resume();
	stream.on( 'end', function () {
		callback( movies );
	});
};


exports.outputToCsv = function ( movies, callback ) {
	var stream = fs.createWriteStream('./output.csv', {flags: 'w'});

	stream.on('open', function () {

		_.each(movies, function (movie) {
			var line = printf('%s,%s\r\n', movie.title, movie.year);
			stream.write(line);
		});

		stream.end();

		stream.on('finish', function () {
			callback();
		});
	});
};


exports.parseLineTopGrossing = function ( line ) {
	var parsed = tgRegex.exec(line.toString());

	if (!parsed || parsed.length !== 3) {
		throw 'Problem parsing line in top grossing movie list: \'' + line.toString() + '\'';
	}

	var movie = new Movie( parsed[1], parsed[2] );

	return movie;
};


// movies: hash map of existing movies.
exports.parseLineRunningTimes = function ( line ) {

	var parsed = rtRegex.exec(line.toString());

	if (!parsed || parsed.length < 3) {
		return;
	}

	var title = parsed[1];
	var year = parsed[2];
	var runningTime = parsed[3];

	var movie = new Movie(title, year);
	movie.runningTime = runningTime;

	return movie;

};


// Check for the movie in our list of top grossing movies,
// and update it if it exists.
exports.updateMovieList = function ( movies, movie ) {

	if ( movie && movies[ movie.hash() ] ) {
		movies[ movie.hash() ].runningTime = movie.runningTime;
	}

	return movies;

};


exports.log = function () {
	console.log(printf.apply(this, arguments));
};