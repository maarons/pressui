from os import listdir
from os.path import abspath
from os.path import isfile
from os.path import realpath
import cherrypy
import json

from PressUI.cherrypy.static import press_get_static_file_by_dig
from PressUI.cherrypy.static import press_static_file

class PressApp():
    def __init__(self):
        with open('PressUI/reactive/index.html', 'r') as f:
            self.__index_html = f.read()

    def _js_sources(self):
        return []

    def _json(self, output):
        cherrypy.response.headers['Content-Type'] = 'application/json'
        return json.dumps(output).encode('utf-8')

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def all_js(self, dig):
        return press_get_static_file_by_dig(dig, "text/jsx")

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def all_css(self, dig):
        return press_get_static_file_by_dig(dig, "text/css")

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def default(self, *args, **kwargs):
        # Will be added twice but why not.
        js_sources = ['PressUI/reactive/jsx_header.js']
        for path in listdir('PressUI/reactive'):
            path = realpath('PressUI/reactive/' + path)
            if isfile(path) and path.endswith('.js'):
                js_sources.append(path)
        js_sources.extend(self._js_sources())

        js_dig = press_static_file(list(map(abspath, js_sources)))
        css_dig = press_static_file([abspath('style/all.css')])

        return self.__index_html.format(
            js_dig = js_dig,
            css_dig = css_dig,
        ).encode('utf-8')
