from splinter import Browser

class Helper:
  def login(self):
    browser = Browser("chrome")
    browser.visit("http://localhost:8000/#login")
    browser.find_by_css("#email").first.fill("robin@lol.com")
    browser.find_by_css("#password").first.fill("lollol")
    browser.find_by_css(".btn-gradient").first.click()
    return browser
  
