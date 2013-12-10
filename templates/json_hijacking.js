$.ajaxSetup({
  dataFilter: function(data, type) {
    if (type !== 'json' && type !== 'jsonp') {
      return data;
    }
    var prefix = 'for(;;);';
    if (data.substring(0, prefix.length) === prefix) {
      return data.substring(prefix.length);
    }
    return data;
  },
});
