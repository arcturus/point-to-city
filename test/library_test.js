var assert = require("assert");
var point_to_city = require("../lib/index.js");

suite('point_to_map', function() {
  var subject;
  var APPID = '[yourappidhere]';

  var KNOW_CITY = {
    lat: 51.50708638980144,
    lon: -0.12007713317871094,
    name: 'London'
  };

  var UNKNOWN_POINT = {
    lat: 0,
    lon: 0,
    name: null
  }

  setup(function() {
    subject = point_to_city.init(APPID);
  });

  test('get know city', function(done) {
    subject.point_to_city(KNOW_CITY.lat, KNOW_CITY.lon, function success(response) {
      assert.equal(response.city, KNOW_CITY.name);
      done();
    }, function error(error) {
      assert.fail(error, KNOW_CITY.name, 'Got an error', '==');
      done();
    });
  });

  test('get know city different locale', function(done) {
    subject = point_to_city.init(APPID, 'es_es');
    subject.point_to_city(KNOW_CITY.lat, KNOW_CITY.lon, function success(response) {
      assert.equal(response.city, 'Londres');
      done();
    }, function error(error) {
      assert.fail(error, KNOW_CITY.name, 'Got an error', '==');
      done();
    });
  });

  test('get unknown point', function(done) {
    subject.point_to_city(UNKNOWN_POINT.lat, UNKNOWN_POINT.lon, function success(response) {
      assert.equal(response.city, UNKNOWN_POINT.name);
      done();
    }, function error(error) {
      assert.fail(error, UNKOWN.name, 'Got an error', '==');
      done();
    });
  });

  test('get know city', function(done) {
    subject.yahoo_where(KNOW_CITY.lat, KNOW_CITY.lon, function success(response) {
      assert.ok(response.hasOwnProperty('ResultSet'));      
      assert.equal(response.ResultSet.Error, 0);
      assert.equal(response.ResultSet.Results[0].city, KNOW_CITY.name);
      done();
    }, function error(error) {
      assert.fail(error, KNOW_CITY.name, 'Got an error', '==');
      done();
    });
  });
});