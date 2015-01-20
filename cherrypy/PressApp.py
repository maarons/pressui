from os import listdir
from os.path import abspath
from os.path import dirname
from os.path import isfile
from os.path import realpath
import cherrypy
import json
import os.path
import re

from PressUI.cherrypy.react import compile_react
from PressUI.cherrypy.static import press_get_static_file_by_dig
from PressUI.cherrypy.static import press_static_file
from PressUI.utils.browser_cache import add_cache_control_header
import PressUI.cherrypy.PressProduction as PressProduction

class PressApp():
    __JQUERY_VERSION = '2.1.1'
    __REACT_VERSION = '0.12.0'

    def __init__(self):
        with open('PressUI/reactive/index.html', 'r') as f:
            self.__index_html = f.read()
        if PressProduction.is_production():
            to_remove = 'development'
        else:
            to_remove = 'production'
        self.__index_html = re.sub(
            '<!-- {to_remove} -->.*<!-- end_{to_remove} -->'.format(
                to_remove = to_remove,
            ),
            '',
            self.__index_html,
            flags = re.DOTALL,
        )

    def _js_sources(self):
        return []

    def _json(self, output):
        cherrypy.response.headers['content-type'] = 'application/json'
        add_cache_control_header()
        return json.dumps(output).encode('utf-8')

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def favicon_png(self):
        cherrypy.response.headers['content-type'] = 'image/png'
        add_cache_control_header(years = 1)
        path = os.path.join(dirname(dirname(__file__)), 'FirefoxOS/icon.png')
        with open(path, 'rb') as f:
            return f.read()

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def channel_html(self):
        add_cache_control_header(years = 1)
        return '<script src="//connect.facebook.net/en_US/all.js"></script>'

    # Same as `all_js` but for development.  Diffrerent path to avoid cache
    # problems.
    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def all_jsx_js(self, dig):
        return press_get_static_file_by_dig(dig, 'text/jsx')

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def all_js(self, dig):
        return press_get_static_file_by_dig(dig, 'application/javascript')

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def all_css(self, dig):
        return press_get_static_file_by_dig(dig, 'text/css')

    @cherrypy.tools.allow(methods = ['GET'])
    @cherrypy.expose
    def default(self, *args, **kwargs):
        add_cache_control_header(hours = 1)

        # Will be added twice but why not.
        js_sources = ['PressUI/reactive/jsx_header.js']
        for path in listdir('PressUI/reactive'):
            path = realpath('PressUI/reactive/' + path)
            if isfile(path) and path.endswith('.js'):
                js_sources.append(path)
        js_sources.extend(self._js_sources())

        compile_fun = None
        if PressProduction.is_production():
            compile_fun = lambda x: compile_react(self.__REACT_VERSION, x)
        js_dig = press_static_file(list(map(abspath, js_sources)), compile_fun)
        css_dig = press_static_file([abspath('style/all.css')])

        return self.__index_html.format(
            js_dig = js_dig,
            css_dig = css_dig,
            jquery_version = self.__JQUERY_VERSION,
            react_version = self.__REACT_VERSION,
        ).encode('utf-8')
