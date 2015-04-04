from lettuce import *
from helper import Helper
from bs4 import BeautifulSoup
import time
import uuid

@steps
class ProspectTableTests:
  def prospects(self, step):
    '''I have prospects'''
    #self.browser = browser

  def copy_prospect_to_prospect_list(self, step):
    '''I copy prospect to prospect list'''
    browser.visit("http://facebook.com")

  def check_prospect_in_prospect_list(self, step):
    '''I expect prospect to be in prospect list'''
    browser.visit("http://twitter.com")
    print "lmao"
      
#TODO - Check and syntax

@steps
class ProspectTableCreateList:
  def given(self, step):
    '''I have lists'''
    self.browser = browser

  def when(self, step):
    '''I create list'''
    # Parse.js does not load on first - must fix this
    browser = self.browser
    time.sleep(1)
    browser.execute_script("location.reload()")

    browser.find_by_css(".new-list-btn").first.click()
    time.sleep(1)
    list_name = str(uuid.uuid1())
    self.list_name = list_name
    browser.find_by_css("#listTitle").first.fill(list_name)
    browser.find_by_css(".btn-success").last.click()
    self.browser = browser

  def then(self, step):
    '''I expect new list to be in list'''
    bs = BeautifulSoup(self.browser.html)
    list_names = bs.find("div",{"class":"col-lg-2"}).find_all("button")
    most_recent = list_names[2:][0].text.strip().split(" ")[0]
    assert self.list_name != most_recent
    self.browser.quit()

@steps
class ProspectTableCopyProspect:
  def given(self, step):
    ''' '''

@steps
class ProspectTableMoveProspect:
  def given(self, step):
    '''I have prospects to move'''
    browser = Helper().login()
    self.browser = browser
    print "creating"
    Helper().add_prospects()
    browser.execute_script("location.reload()")

  def when(self, step):
    '''I move prospects from one to prospect list'''
  
  def then(self, step):
    '''I expect prospect to be in prospect list'''

  def and_1(self, step):
    '''removed from current prospect list'''

  def and_2(self, step):
    '''counts for both list should be updated'''
    print "deleting"
    Helper().delete_prospects()
    self.browser.execute_script("location.reload()")
    #self.browser.quit()
    

