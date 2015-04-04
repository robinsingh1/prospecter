module.exports = function() {
  return {
  url: 'https://api.parse.com/1/classes/',
  batchURL: 'https://api.parse.com/1/batch',
  _current_user: (localStorage.currentUser) ? JSON.parse(localStorage.currentUser) : {},
  _company: (localStorage.currentUser) ? JSON.parse(localStorage.currentUser).user_company : {},
  _user_company: (localStorage.currentUser) ? JSON.parse(localStorage.currentUser).user_company : {},
  headers: {
    'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
    'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
    'Content-Type' : 'application/json'
  },

  _pointer: function(className, objectId) {
    return { __type:'Pointer', 'className': className, 'objectId': objectId}
  },
  _user: { __type:'Pointer', className: '_User', 
           objectId:  (localStorage.currentUser) ? JSON.parse(localStorage.currentUser).objectId : ""},

  /*  
   *  Add user and user_company fields from all requests
   */

  _currentUserify: function(qry) {
    where = (qry.where) ? JSON.parse(qry.where) : {}
    where.user = this._user
    where.user_company = this._user_company
    /*
    if(typeof(where.archived) == "undefined") 
        where.archived = {$in:[null, false]}
    */
    //qry.limit = (typeof(qry.limit) == "undefined") ? 1000 : qry.limit
    qry.order = (typeof(qry.order) == "undefined") ? '-createdAt' : qry.order
    qry.where = JSON.stringify(where)
    return qry
  },

  get: function(className, qry) {
    _qry = qry
    var qry = this._currentUserify(qry);
    //console.debug(qry)
    //console.debug('THE QUERY')
    //console.debug(qry)
    var _this = this;

    request = $.ajax({
      url: _this.url+className,
      headers: appConfig.parseHeaders,
      type:'GET',
      _data: _qry,
      data: qry,
    });
    return request
  },

  _get: function(className, qry) {
    var _this = this;

    request = $.ajax({
      url: _this.url+className,
      headers: appConfig.parseHeaders,
      type:'GET',
      data: qry,
    });
    return request
  },

  //update: function() {
  update: function(className, _object, qry) {
    var qry = this._currentUserify(qry);
    var _this = this;
    request = $.ajax({
      url: _this.url+className,
      headers: appConfig.parseHeaders,
      type:'PUT',
      data: qry,
    });
    return request
  },

  put: function(className, _object, qry) {
    //var qry = this._currentUserify(qry);
    var _this = this;
    request = $.ajax({
      url: _this.url+"/"+className+"/"+_object,
      headers: appConfig.parseHeaders,
      type:'PUT',
      _data: qry, 
      data: JSON.stringify(qry),
    });
    return request
  },

  create: function(qry) {
    var qry = this._currentUserify(qry);
    var _this = this;
    request = $.ajax({
      url: _this.url+className,
      headers: appConfig.parseHeaders,
      type:'PUT',
      data: qry,
    });
    return request
  },

  delete: function() {

  },

  bulkDownload: function() {
    // if more than 10 000 get date
  },

  batchCreate: function(className, objArray, body) {
    // map
    method = "POST"
    var _this = this;
    request = $.ajax({
      url: _this.batchURL,
      headers: appConfig.parseHeaders,
      type:'POST',
      data: qry,
    });
    return request
  },

  batchUpdate: function(className, objArray, body) {
    qry = {'requests':[]}
    qry.requests = _.map(objArray, function(obj){
      return {
        method: "PUT",
        path: "/1/classes/"+className+"/"+obj,
        body: body
      }
    }) 

    var _this = this;
    request = $.ajax({
      url: _this.batchURL,
      headers: appConfig.parseHeaders,
      type:'POST',
      data: JSON.stringify(qry),
    });
    return request
  },

  increment: function() {

  }
  }
}
