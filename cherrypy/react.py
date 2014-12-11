import subprocess
import tempfile
import json

_jsx_transformer = {}

def _fetch_react(react_version):
    if react_version not in _jsx_transformer:
        url = ('http://cdnjs.cloudflare.com/ajax/libs/react/{}/'
               'JSXTransformer.js'.format(react_version))
        _jsx_transformer[react_version] = \
                subprocess.check_output(['curl', url]).decode('utf-8')
    return _jsx_transformer[react_version]

def compile_react(react_version, code):
    contents = _fetch_react(react_version)
    code = code.decode('utf-8')
    contents += 'console.log(module.exports.transform({}).code);'.format(
        json.dumps(code)
    )
    tmp = tempfile.NamedTemporaryFile(mode = 'w')
    with tmp.file as f:
        f.write(contents)
        f.flush()
    out = subprocess.check_output(['/usr/bin/node', tmp.name])
    tmp.close()
    return out
