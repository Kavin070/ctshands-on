from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.support.ui import WebDriverWait

from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.maximize_window()

driver.get(
"https://www.lambdatest.com/selenium-playground/table-sort-search-demo"
)

print("="*50)
print("TASK 39")
print("="*50)

wait = WebDriverWait(

driver,

10,

poll_frequency=0.5,

ignored_exceptions=[NoSuchElementException]

)

table = wait.until(

lambda d: d.find_element(By.TAG_NAME,"table")

)

print("Table Loaded Successfully")

print("Fluent Wait:")

print("Maximum Wait : 10 seconds")

print("Polling : Every 500 ms")

print("Ignoring : NoSuchElementException")

driver.quit()