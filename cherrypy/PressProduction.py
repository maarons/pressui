__is_prod = False

def set_production(is_prod):
    global __is_prod
    __is_prod = is_prod

def is_production():
    return __is_prod
