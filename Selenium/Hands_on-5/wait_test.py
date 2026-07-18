import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install())
)

driver.maximize_window()

driver.get(
    "https://testmuai.com/selenium-playground/bootstrap-alert-messages-demo/"
)

print("=" * 50)
print("TASK 36")
print("=" * 50)

# Click Success Button
driver.find_element(
    By.CSS_SELECTOR,
    ".btn-success-auto"
).click()

# Wait for Success Alert
alert = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located(
        (
            By.CSS_SELECTOR,
            ".alert-success"
        )
    )
)

print("Alert Text:")
print(alert.text)

assert "success" in alert.text.lower()

print("Alert Found Successfully")

print()

print("=" * 50)
print("TASK 37")
print("=" * 50)

driver.refresh()

# Sleep Version

start = time.time()

driver.find_element(
    By.CSS_SELECTOR,
    ".btn-success-auto"
).click()

time.sleep(3)

sleep_time = time.time() - start

print("Sleep Version :", round(sleep_time, 2), "seconds")

driver.refresh()

# Explicit Wait Version

start = time.time()

driver.find_element(
    By.CSS_SELECTOR,
    ".btn-success-auto"
).click()

WebDriverWait(driver, 10).until(

    EC.visibility_of_element_located(

        (
            By.CSS_SELECTOR,
            ".alert-success"
        )

    )

)

wait_time = time.time() - start

print("Explicit Wait :", round(wait_time, 2), "seconds")

print()

print("=" * 50)
print("TASK 38")
print("=" * 50)

driver.refresh()

button = WebDriverWait(driver, 10).until(

    EC.element_to_be_clickable(

        (
            By.CSS_SELECTOR,
            ".btn-success-auto"
        )

    )

)

button.click()

print("Button is Clickable")

print("""
visibility_of_element_located()

→ waits until element becomes visible.

element_to_be_clickable()

→ waits until element is visible
AND enabled.
""")

driver.quit()