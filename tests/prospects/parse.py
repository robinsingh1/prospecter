import requests
import json
import pandas as pd
import time
import math

class Parse:
  def __init__(self):
    self._url = 'https://api.parse.com/1/classes/{0}'
    self._batch_url = 'https://api.parse.com/1/batch'
    self._headers = {
      "X-Parse-Application-Id": "N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ",
      "X-Parse-REST-API-Key": "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb",
      "Content-Type": "application/json"
    }
    self._master_headers = {
      "X-Parse-Application-Id": "N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ",
      "X-Parse-Master-Key": "RQgSIyw9rxC4xn4KlsIEYzDIpkxNIUlLz70akJcT",
      "Content-Type": "application/json"
    }

  def _incr(self, className, objectId, field, amount):
    data = {field:{"__op":"Increment","amount": amount}}
    _object = "{0}/{1}".format(className, objectId)
    r = requests.put(self._url.format(_object),
                      data=json.dumps(data),
                      headers=self._headers)
    return r

  def _increment(self, className, objectId, field, amount):
    data = {field:{"__op":"Increment","amount": amount}}
    _object = "{0}/{1}".format(className, objectId)
    r = requests.put(self._url.format(_object),
                      data=json.dumps(data),
                      headers=self._headers)
    return r

  def _remove_special_keys(self, _obj):
        # accepts dict or df
        if "__type" in _obj.keys(): del _obj['__type']
        if "createdAt" in _obj.keys(): del _obj['createdAt']
        if "updatedAt" in _obj.keys(): del _obj['updatedAt']
        if "objectId" in _obj.keys(): del _obj['objectId']
        return _obj

  def _batch_df(self, className, df, body, method="PUT"):
      responses = []
      df = df.reset_index().drop('index', 1)
      for i in range(int(math.ceil(df.shape[0]/50.0))):
          #TODO - fill nan with something
          #TODO - remove keyword columns
          error = True
          while error:
              a, b, data = i*50, (i+1)*50-1, pd.DataFrame() 
              tmp = df.ix[a:b]
              data['path']    = ["/1/classes/"+className+"/"+_id for _id in tmp.objectId]
              data['body']    = [body for i in tmp.index]
              data['method']  = method
              data            = {"requests" : data.to_dict('r')}
              r = requests.post(self._batch_url,
                                data=json.dumps(data),
                                headers=self._headers)
              print r.json()
              error = type(r.json()) is dict
              if error: 
                  print "batch df update error occurred. retrying" 
                  time.sleep(10)
          responses = responses+r.json()
      return responses

  def _batch_df_create(self, className, df):
      responses = []
      df = df.reset_index().drop('index', 1)
      for i in range(int(math.ceil(df.shape[0]/50.0))):
          #TODO - fill nan with something
          #TODO - remove keyword columns
          error = True
          while error:
              a, b, data = i*50, (i+1)*50-1, pd.DataFrame()
              tmp = df.ix[a:b]
              data['body']    = tmp.to_dict('r')
              data['method']  = ["POST" for i in tmp.index]
              data['path']    = ["/1/classes/"+className for i in tmp.index]
              data            = {"requests" : data.to_dict('r')}
              r = requests.post(self._batch_url,
                                data=json.dumps(data),
                                headers=self._headers)
              error = type(r.json()) is dict
              print "IS ERROR??? --> ", r.json(), error
              if error:
                  time.sleep(10)
                  print "batch df error occurred. retrying"
          responses = r.json()+responses
      return responses

  def _domain(website):
    domain = tldextract.extract(website).domain 
    tld = tldextract.extract(website).tld
    return "{}.{}".format(domain, tld)

  def _pointer(self, className, objectId):
    return {
        '__type' : 'Pointer',
        'className':className,
        'objectId':objectId
    }

  def create(self, className, data):
    r = requests.post(self._url.format(className),
                      data=json.dumps(data),
                      headers=self._headers)
    return r

  def _bulk_get(self, className, qry):
    ''' Bulk All '''

  def get(self, className, qry={}):
      r = requests.get(self._url.format(className),
                       params=qry,
                       headers=self._headers)
      return r

  def update(self, className, data):
      r = requests.put(self._url.format(className),
                       data=json.dumps(data),
                       headers=self._master_headers)
      return r
