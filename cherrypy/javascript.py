import cherrypy
from os.path import abspath

import PressUI.cherrypy.static as static

def press_javascript(path):
    if not hasattr(cherrypy.request, "press_javascript"):
        cherrypy.request.press_javascript = []
    cherrypy.request.press_javascript.append(abspath(path))
    return ""

def press_get_javascript_file():
    if not hasattr(cherrypy.request, "press_javascript"):
        return ""

    paths = cherrypy.request.press_javascript
    dig = static.press_static_file(paths)
    return "<script src='/all.js/?dig={}'></script>".format(dig)

@cherrypy.tools.allow(methods = ["GET"])
@cherrypy.expose
def press_all_js(self, dig):
    content = static.press_get_static_file_by_dig(dig, "application/javascript")
    if content is None:
        raise cherrypy.HTTPError(404)
    return content
