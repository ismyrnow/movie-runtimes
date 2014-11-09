/*jshint node: true */
'use strict';


exports.Movie = function ( title, year ) {
	this.title = title;
	this.year = year;
	this.runningTime = null;
};


exports.Movie.prototype.hash = function() {
	return cleanTitle(this.title) + this.year.toString();
}


exports.Movie.prototype.toString = function() {
	return this.title + ' (' + this.year + ')';
};


function cleanTitle( title ) {

	var result = title
		.trim()
		.toLowerCase()
		.remove(/[':\-& ]|the|and/gi);

	return result;

}


String.prototype.remove = function (substr) {
	return this.replace(substr, '');
};