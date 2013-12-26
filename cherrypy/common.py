__is_prod = False

def press_set_production(is_prod):
    global __is_prod
    __is_prod = is_prod

def press_is_production():
    return __is_prod
