var PressNavigation = function() {
  var uriMap = {};
  var hostname = undefined;

  var setUriMap = function(newUriMap) {
    uriMap = newUriMap;
  }

  var paramsToQueryStr = function(params) {
    var uri = '?'
    var sep = '';
    $.each(
      params,
      function(key, value) {
        uri += sep + key + '=' + encodeURIComponent(value);
        sep = '&';
      }
    );
    return uri;
  }

  var switchToUri = function(uri, params) {
    var historyUri = uri;
    if (params !== undefined) {
      historyUri += paramsToQueryStr(params);
    }
    window.history.pushState(null, '', historyUri)
    renderUri(uri, params);
  }

  var renderUri = function(uri, params) {
    var controller = uriMap[uri];
    var view = controller(params);
    if (view !== undefined) {
      var node = $('#press-root').get(0);
      React.unmountComponentAtNode(node);
      React.render(view, node);
    }
  }

  var switchToCurrentUri = function(pushHistoryState) {
    if (pushHistoryState === undefined) {
      pushHistoryState = true;
    }
    var search = window.location.search;
    var params = undefined;
    if (search !== '') {
      params = {};
      var paramStrings = search.substr(1).split('&');
      $.each(
        paramStrings,
        function(_, paramStr) {
          var splitParamStr = paramStr.split('=');
          params[splitParamStr[0]] = decodeURIComponent(splitParamStr[1]);
        }
      );
    }
    if (pushHistoryState) {
      switchToUri(window.location.pathname, params);
    } else {
      renderUri(window.location.pathname, params);
    }
  }

  var setHostname = function(newHostname) {
    hostname = newHostname;
  }

  var getHostname = function() {
    return hostname;
  }

  return {
    setUriMap: setUriMap,
    renderUri: renderUri,
    switchToUri: switchToUri,
    switchToCurrentUri: switchToCurrentUri,
    setHostname: setHostname,
    getHostname: getHostname,
    paramsToQueryStr: paramsToQueryStr
  };
}();

window.onpopstate = function(event) {
  PressNavigation.switchToCurrentUri(false);
};
