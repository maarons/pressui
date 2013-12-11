.PHONY: press_clean_css
press_clean_css:
	-rm -f $(shell find . -type f -name \*.css)
	-rm -rf $(shell find . -type d -name .sass-cache)
