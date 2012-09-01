var request = require('request');

exports.init = function PoinToCity(APPID) {
  var END_POINT = 'http://where.yahooapis.com/geocode?' +
                  'q=%lat%,%lon%&flags=J&gflags=R&appid=%appid%';

  var query = function query(lat, lon, onSuccess, onError, fullResponse) {
    var end_point = END_POINT.replace('%lat%', lat).
                              replace('%lon%', lon).
                              replace('%appid%', APPID);

    request(end_point, function requestResult(error, response, body) {
      if (error || response.statusCode != 200) {
        if (onError) {
          onError(error);
        } else {
          onError({'status': response.statusCode});
        }
        return;
      }

      var where = JSON.parse(body);
      if (where.ResultSet && where.ResultSet.Error) {
        onError(where);
        return;
      }

      if (fullResponse) {
        onSuccess(where);
        return;
      }

      var result = {'city': null};
      if (where.ResultSet && where.ResultSet.Found >=1 && 
		where.ResultSet.Results[0].city != "") {
        result.city = where.ResultSet.Results[0].city;
      }
      onSuccess(result);
    });
  };

  var point_to_city = function point_to_city(lat, lon, onSuccess, onError) {
    query(lat, lon, onSuccess, onError, false);
  };

  var yahoo_where = function yahoo_where(lat, lon, onSuccess, onError) {
    query(lat, lon, onSuccess, onError, true);
  }

  return {
    'point_to_city': point_to_city,
    'yahoo_where': yahoo_where 
  }
};

