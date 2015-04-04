from splinter import Browser
from parse import Parse
import random
import pandas as pd
import json

class Helper:
  def login(self):
    browser = Browser("chrome")
    browser.visit("http://localhost:8000/#login")
    browser.find_by_css("#email").first.fill("robin@lol.com")
    browser.find_by_css("#password").first.fill("lollol")
    browser.find_by_css(".btn-gradient").first.click()
    return browser

  def __init__(self):
    self._user = Parse()._pointer("_User", "zLSHxMD9P9")
    self._user_company = Parse()._pointer("UserCompany", "YX2paTGUFZ")

  def start_research(self):
    ''' '''

  def add_prospects(self):
    prospects = Parse().get("Prospect", {"limit":1000}).json()["results"]
    random.shuffle(prospects)
    prospects = pd.DataFrame(prospects[:4])[["name","description","company_name","title"]]
    prospects["user"] = [self._user]*4
    prospects["user_company"] = [self._user_company]*4
    prospects["test_data"] = True
    print Parse()._batch_df_create("Prospect", prospects)

  def add_chrome_extension(self):
    ''' '''

  def delete_prospects(self):
    qry = {"where":json.dumps({"test_data" : True})}
    prospects = Parse().get("Prospect", qry).json()["results"]
    prospects = pd.DataFrame(prospects)
    print prospects.shape
    Parse()._batch_df("Prospect", prospects, {}, "DELETE")
