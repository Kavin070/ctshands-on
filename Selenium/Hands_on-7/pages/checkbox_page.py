from selenium.webdriver.common.by import By

from pages.base_page import BasePage


class CheckboxPage(BasePage):

    def check_option(self, index):

        checkbox = self.driver.find_elements(

            By.XPATH,

            "//input[@type='checkbox']"

        )[index]

        if not checkbox.is_selected():

            checkbox.click()


    def uncheck_option(self, index):

        checkbox = self.driver.find_elements(

            By.XPATH,

            "//input[@type='checkbox']"

        )[index]

        if checkbox.is_selected():

            checkbox.click()


    def is_option_checked(self, index):

        checkbox = self.driver.find_elements(

            By.XPATH,

            "//input[@type='checkbox']"

        )[index]

        return checkbox.is_selected()