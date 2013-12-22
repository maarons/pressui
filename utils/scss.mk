PRESS_SCSS=$(shell find -L . -type f -name \*.scss)

%.css : %.scss
	sass --style compressed $(@:.css=.scss) $@

# Usage:
#
# path/to/file.css: $(PRESS_SCSS)
