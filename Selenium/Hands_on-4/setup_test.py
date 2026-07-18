"""
Hands-On 4

24. Selenium Components

1. WebDriver
WebDriver automates browser actions and communicates with the browser through browser drivers.

2. Selenium Grid
Selenium Grid allows parallel execution of tests on different browsers and machines.

3. Selenium IDE
Selenium IDE is a browser extension used for recording and replaying test cases.
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Chrome Options
options = webdriver.ChromeOptions()

# Run in headless mode
options.add_argument("--headless")

# Start Chrome
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

# Implicit Wait
driver.implicitly_wait(10)

# Implicit waits apply to every element lookup.
# Explicit waits are preferred because they wait
# only for specific conditions.

driver.get("https://www.lambdatest.com/selenium-playground/")

print(driver.title)

driver.quit()