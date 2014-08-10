class PressConfig():
    __DATA = {}

    @staticmethod
    def init(path):
        with open(path, 'rb') as f:
            # Always fun to exec random code.
            exec(f.read(), None, PressConfig.__DATA)

    @staticmethod
    def get(var_name):
        return PressConfig.__DATA[var_name]
