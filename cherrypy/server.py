from cherrypy.process.plugins import PIDFile
import argparse
import cherrypy

from PressUI.cherrypy.PressConfig import PressConfig
import PressUI.cherrypy.PressProduction as PressProduction

parser = argparse.ArgumentParser()
parser.add_argument(
    '--production',
    help = 'Run app in production mode',
    action = 'store_true',
)
parser.add_argument(
    '--port',
    help = 'Run app on this port (defaults to %(default)d)',
    default = 8080,
)
parser.add_argument(
    'config',
    help = 'Path to config file for this app',
)

def quickstart(app, app_name, fun_callback = None):
    args = parser.parse_args()

    PressConfig.init(args.config)

    if fun_callback is not None:
        fun_callback()

    cherrypy.config.update({
        'server.socket_port': args.port,
        'server.socket_host': '127.0.0.1',
        'tools.gzip.on': True,
    })

    if args.production:
        cherrypy.config.update({
            'environment': 'production',
            'tools.proxy.on': True,
            'log.access_file': '/tmp/{}.access.log'.format(app_name),
            'log.error_file': '/tmp/{}.error.log'.format(app_name),
        })
        PIDFile(
            cherrypy.engine,
            '/tmp/{}.pid'.format(app_name),
        ).subscribe()
        PressProduction.set_production(True)

    cherrypy.quickstart(app())
