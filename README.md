node-point-to-city
==================

node-point-to-city is a simple module that will transform a point (latitude, longitude) to the name of the city which points to.

Yahoo! Place Fincer
-------------------

This module is based in the fantastic Yahoo! Place Finder API, which means you will need a _appid_ to use it. Please check http://developer.yahoo.com/geo/placefinder/ for more information

Usage
-----

	$ var ptc = require('./point_to_city');
	$ ptc.init('YOUR APPID');
	$ ptc.point_to_city(lat, lon, onSuccess, onError);

Build status
------------

[![Status](https://secure.travis-ci.org/arcturus/point-to-city.png?branch=master)](http://travis-ci.org/arcturus/point-to-city)
