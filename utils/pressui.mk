.PHONY: pressui
pressui:
	git clone https://github.com/maarons/pressui.git PressUI

.PHONY: press_clean
press_clean:
	-rm -rf PressUI
