from lettuce import *

@steps
class SignalTestCreateSignal:
  def signals(self, step):
    '''I have signals'''
    browser = Helper().login()
    browser.visit("http://localhost:8000/#strategies")

  def create_signal(step):
    '''I create signals'''
    print "lol"

  def create_signal_expect(step):
    '''I expect new loading signal'''
    print "lol"

class SignalTestDeleteSignal:
  def given(self, step):
    ''' '''

  def when(self, step):
    ''' '''

  def then(self, step):
    ''' '''

class SignalTestProspectSignal:
  def given(self, step):
    ''' '''

  def when(self, step):
    ''' '''

  def then(self, step):
    ''' '''
