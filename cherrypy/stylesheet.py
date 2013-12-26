import cherrypy
from os.path import abspath

import PressUI.cherrypy.static as static

def press_stylesheet(path):
    if not hasattr(cherrypy.request, "press_stylesheet"):
        cherrypy.request.press_stylesheet = []
    cherrypy.request.press_stylesheet.append(abspath(path))
    return ""

def press_get_stylesheet_file():
    if not hasattr(cherrypy.request, "press_stylesheet"):
        return ""

    paths = cherrypy.request.press_stylesheet
    dig = static.press_static_file(paths)
    return "<link rel='stylesheet' href='/all.css/?dig={}' " \
           "type='text/css'>".format(dig)

@cherrypy.tools.allow(methods = ["GET"])
@cherrypy.expose
def press_all_css(self, dig):
    content = static.press_get_static_file_by_dig(dig, "text/css")
    if content is None:
        raise cherrypy.HTTPError(404)
    return content
