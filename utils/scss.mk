PRESS_SCSS=$(shell find -L . -type f -name \*.scss)

%.css : %.scss
	sass $(@:.css=.scss) $@

# Usage:
#
# path/to/file.css: $(PRESS_SCSS)
