var $url = window.location.protocol + '//' + window.location.hostname + ':' +
           window.location.port + '/fb_login_info.json';

$.ajax({
  url: $url,
  success: function(data) {
    PressNavigation.setHostname(data['hostname']);

    FB.init({
      'appId': data['app_id'],
      'cookie': true,
      'xfbml': true,
      'status': true,
      'version': 'v2.2',
    });

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        PressNavigation.switchToCurrentUri();
      } else {
        PressNavigation.renderUri('/login');
        FB.XFBML.parse();
      }
    });
  },
  error: function() {
    // TODO do something
  },
  dataType: 'json',
});
