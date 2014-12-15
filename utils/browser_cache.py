import cherrypy

def add_cache_control_header():
    # 1yr
    seconds = 31536000
    cherrypy.response.headers['cache-control'] = \
            'public, max-age={}'.format(seconds)
