import os
import pytest

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


# -----------------------------
# Browser Fixture
# -----------------------------

@pytest.fixture(scope="function")
def driver(request):

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install())
    )

    driver.maximize_window()

    request.node.driver = driver

    yield driver

    driver.quit()


# -----------------------------
# Base URL
# -----------------------------

@pytest.fixture(scope="session")
def base_url():

    return "https://testmuai.com/selenium-playground/"


# -----------------------------
# Screenshot on Failure
# -----------------------------

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):

    outcome = yield

    report = outcome.get_result()

    if report.when == "call" and report.failed:

        driver = getattr(item, "driver", None)

        if driver:

            os.makedirs("Screenshots", exist_ok=True)

            filename = f"Screenshots/{item.name}_failure.png"

            driver.save_screenshot(filename)

            print(f"\nScreenshot saved : {filename}")