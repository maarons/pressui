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
        uri += sep + key + '=' + escapeURI(value);
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
    var toolbar = null;
    var content = <div></div>;
    if (view === undefined) {
      return;
    } else if (view.toolbar === undefined ||
               view.content === undefined) {
      content = view;
    } else {
      toolbar = view.toolbar;
      content = view.content;
    }
    renderToolbar(toolbar);
    renderContent(content);
  }

  var renderToolbar = function(view) {
    if (view === null) {
      view = <div></div>;
    } else {
      view = <div className='press-toolbar'>{view}</div>;
    }
    var node = $('#press-toolbar').get(0);
    React.unmountComponentAtNode(node);
    React.render(view, node);
  }

  var renderContent = function(view) {
    var node = $('#press-content').get(0);
    React.unmountComponentAtNode(node);
    React.render(view, node);
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
          params[splitParamStr[0]] = unescapeURI(splitParamStr[1]);
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

  var escapeURI = function(uri) {
    return encodeURIComponent(uri).replace(/%20/g, '+');
  }

  var unescapeURI = function(uri) {
    return decodeURIComponent(uri.replace(/\+/g, ' '));
  }

  return {
    setUriMap: setUriMap,
    renderUri: renderUri,
    renderToolbar: renderToolbar,
    renderContent: renderContent,
    switchToUri: switchToUri,
    switchToCurrentUri: switchToCurrentUri,
    setHostname: setHostname,
    getHostname: getHostname,
    paramsToQueryStr: paramsToQueryStr,
    escapeURI: escapeURI,
    unescapeURI: unescapeURI,
  };
}();

window.onpopstate = function(event) {
  PressNavigation.switchToCurrentUri(false);
};
