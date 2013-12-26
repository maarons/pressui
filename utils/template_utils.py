import cherrypy
import hashlib
from os.path import getmtime, abspath
from time import time
from threading import Lock
from jinja2 import Environment

__lock = Lock()
__is_prod = False
# { paths hash => { "timestamp" => created timestamp, "dig" => js hash }
__stamps = {}
# js hash => contents
__all_js = {}

def press_set_production(is_prod):
    global __is_prod
    __is_prod = is_prod

def press_get_env(loader):
    env = Environment(loader = loader)
    env.autoescape = True
    env.globals["press_javascript"] = press_javascript
    env.globals["press_get_javascript_file"] = press_get_javascript_file
    return env

def press_javascript(path):
    if not hasattr(cherrypy.request, "press_javascript"):
        cherrypy.request.press_javascript = []
    cherrypy.request.press_javascript.append(abspath(path))
    return ""

def press_get_javascript_file():
    global __stamps, __all_js

    if not hasattr(cherrypy.request, "press_javascript"):
        return ""

    paths = cherrypy.request.press_javascript
    pdig = hashlib.sha1("\n".join(paths).encode("utf-8")).hexdigest()
    with __lock:
        if __should_rebuild_all_js(pdig, paths):
            contents = []
            for path in paths:
                with open(path, "r") as f:
                    contents.append(f.read())
            contents = "\n".join(contents).encode("utf-8")
            dig = hashlib.sha1(contents).hexdigest()
            __all_js[dig] = contents
            __stamps[pdig] = {
                "timestamp": time(),
                "dig": dig,
            }
    dig = __stamps[pdig]["dig"]
    return "<script src='/all_js/?dig={}'></script>".format(dig)

def __should_rebuild_all_js(pdig, paths):
    if pdig in __stamps:
        if __is_prod:
            return False
        max_m_time = max([getmtime(path) for path in paths])
        return max_m_time > __stamps[pdig]["timestamp"]
    return True

@cherrypy.tools.allow(methods = ["GET"])
@cherrypy.expose
def press_all_js(self, dig):
    cherrypy.response.headers['Content-Type'] = "application/javascript"
    if dig in __all_js:
        return __all_js[dig]
    else:
        raise cherrypy.HTTPError(404)
