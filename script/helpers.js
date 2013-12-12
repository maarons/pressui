function press_prefetch(url) {
  $("head").append($('<link rel="prefetch" href="' + url + '">'));
  $("head").append($('<link rel="prerender" href="' + url + '">'));
}
