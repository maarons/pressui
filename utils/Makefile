PRESS_SCSS=$(shell find -L . -type f -name \*.scss)

%.css : %.scss
	sass --style compressed --load-path . $(@:.css=.scss) $@

style/all.css: $(PRESS_SCSS)

.PHONY: clean
clean:
	-rm -rf $(shell find -L . -type d -name __pycache__)
	-rm -f $(shell find -L . -type f -name \*.css)
	-rm -rf $(shell find -L . -type d -name .sass-cache)
