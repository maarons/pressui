from jinja2 import Environment

from PressUI.cherrypy.javascript import \
    press_javascript, \
    press_get_javascript_file
from PressUI.cherrypy.stylesheet import \
    press_stylesheet, \
    press_get_stylesheet_file

def press_get_env(loader):
    env = Environment(loader = loader)
    env.autoescape = True
    env.globals["press_javascript"] = press_javascript
    env.globals["press_get_javascript_file"] = press_get_javascript_file
    env.globals["press_stylesheet"] = press_stylesheet
    env.globals["press_get_stylesheet_file"] = press_get_stylesheet_file
    return env
