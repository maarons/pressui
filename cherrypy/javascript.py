import cherrypy
from os.path import abspath

import PressUI.cherrypy.static as static

def press_javascript(path):
    if not hasattr(cherrypy.request, "press_javascript"):
        cherrypy.request.press_javascript = []
    cherrypy.request.press_javascript.append(abspath(path))
    return ""

def press_jsx(path):
    cherrypy.request.press_javascript_is_jsx = True
    return press_javascript(path)

def press_get_javascript_file():
    if not hasattr(cherrypy.request, "press_javascript"):
        return ""

    script_type = "text/javascript"
    paths = []
    if getattr(cherrypy.request, "press_javascript_is_jsx", False):
        script_type = "text/jsx"
        paths.append(abspath("PressUI/templates/jsx.js"))

    paths.extend(cherrypy.request.press_javascript)
    dig = static.press_static_file(paths)
    return "<script type='{}' src='/all.js/?dig={}'></script>".format(
        script_type,
        dig,
    )

@cherrypy.tools.allow(methods = ["GET"])
@cherrypy.expose
def press_all_js(self, dig):
    content = static.press_get_static_file_by_dig(dig, "application/javascript")
    if content is None:
        raise cherrypy.HTTPError(404)
    return content
