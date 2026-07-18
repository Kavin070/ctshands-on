import pytest

from pages.simple_form_page import SimpleFormPage

from pages.checkbox_page import CheckboxPage

from pages.dropdown_page import DropdownPage


@pytest.mark.parametrize(

    "message",

    [

        "Hello",

        "Selenium Automation",

        "12345"

    ]

)

def test_simple_form_submission(driver, base_url, message):

    page = SimpleFormPage(driver)

    page.navigate_to(base_url + "simple-form-demo")

    page.enter_message(message)

    page.click_submit()

    assert page.get_displayed_message() == message


def test_checkbox_demo(driver, base_url):

    page = CheckboxPage(driver)

    page.navigate_to(base_url + "checkbox-demo")

    page.check_option(0)

    assert page.is_option_checked(0)

    page.uncheck_option(0)

    assert not page.is_option_checked(0)


def test_dropdown_selection(driver, base_url):

    page = DropdownPage(driver)

    page.navigate_to(base_url + "select-dropdown-demo")

    assert page.select_day("Wednesday") == "Wednesday"