import cherrypy

def add_cache_control_header(minutes = 0, hours = 0, days = 0, years = 0):
    seconds = (((years * 365 + days) * 24 + hours) * 60 + minutes) * 60;
    if seconds == 0:
        cherrypy.response.headers['cache-control'] = 'no-cache'
    else:
        cherrypy.response.headers['cache-control'] = \
                'public, max-age={}'.format(seconds)
