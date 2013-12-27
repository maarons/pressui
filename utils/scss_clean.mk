.PHONY: press_clean_css
press_clean_css:
	-rm -f $(shell find -L . -type f -name \*.css)
	-rm -rf $(shell find -L . -type d -name .sass-cache)
