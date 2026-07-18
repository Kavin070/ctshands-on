from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.maximize_window()

driver.get("https://www.lambdatest.com/selenium-playground/simple-form-demo")

print("="*50)
print("TASK 32 - LOCATOR STRATEGIES")
print("="*50)

# -------------------------------
# By ID
# -------------------------------
element = driver.find_element(By.ID, "user-message")
print("By.ID :", element.get_attribute("id"))

# -------------------------------
# By CLASS NAME
# -------------------------------
element = driver.find_element(By.CLASS_NAME, "border")
print("By.CLASS_NAME :", element.get_attribute("id"))

# -------------------------------
# By TAG NAME
# -------------------------------
element = driver.find_element(By.TAG_NAME, "input")
print("By.TAG_NAME :", element.get_attribute("id"))

# -------------------------------
# Relative XPath
# -------------------------------
element = driver.find_element(
    By.XPATH,
    "//input[@id='user-message']"
)
print("Relative XPath :", element.get_attribute("id"))

# -------------------------------
# Absolute XPath
# (Example only - may change if page HTML changes)
# -------------------------------
try:
    element = driver.find_element(
        By.XPATH,
        "/html/body/div/section[2]//input[@id='user-message']"
    )
    print("Absolute XPath :", element.get_attribute("id"))
except:
    print("Absolute XPath : Not stable (expected for modern websites)")

print("\n")

print("="*50)
print("TASK 33 - CSS SELECTORS")
print("="*50)

# --------------------------------
# CSS Selector by ID
# --------------------------------
element = driver.find_element(
    By.CSS_SELECTOR,
    "#user-message"
)
print("CSS #id :", element.get_attribute("id"))

# --------------------------------
# CSS Selector by Attribute
# --------------------------------
element = driver.find_element(
    By.CSS_SELECTOR,
    "input[placeholder='Please enter your Message']"
)
print("CSS Attribute :", element.get_attribute("placeholder"))

# --------------------------------
# CSS Selector by Parent > Child
# --------------------------------
try:
    element = driver.find_element(
        By.CSS_SELECTOR,
        "form input"
    )
    print("CSS Parent > Child :", element.get_attribute("id"))
except:
    print("Parent > Child selector not available on current page")

print("\n")

print("="*50)
print("TASK 34 - XPATH TEXT() & CONTAINS()")
print("="*50)

driver.get("https://www.lambdatest.com/selenium-playground/checkbox-demo")

# Label using text()

try:
    label = driver.find_element(
        By.XPATH,
        "//label[text()='Option 1']"
    )
    print("text() :", label.text)
except:
    print("Option 1 label not found")

# Labels using contains()

labels = driver.find_elements(
    By.XPATH,
    "//label[contains(text(),'Option')]"
)

print("contains() found", len(labels), "labels")

for lbl in labels:
    print(lbl.text)

print("\n")

print("="*50)
print("TASK 35")
print("="*50)

print("""
Preferred Locator Ranking

1. ID
2. CSS Selector
3. Name
4. Relative XPath
5. Class Name
6. Tag Name
7. Absolute XPath

Reason:
ID is unique and fastest.
Absolute XPath is least preferred because any HTML change breaks it.
""")

driver.quit()