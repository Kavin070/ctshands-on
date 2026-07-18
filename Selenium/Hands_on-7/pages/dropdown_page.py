from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import Select

from pages.base_page import BasePage


class DropdownPage(BasePage):

    DROPDOWN = (

        By.ID,

        "select-demo"

    )

    def select_day(self, day):

        dropdown = Select(

            self.wait_for_element(self.DROPDOWN)

        )

        dropdown.select_by_visible_text(day)

        return dropdown.first_selected_option.text