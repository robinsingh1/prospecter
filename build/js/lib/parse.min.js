// Parse Stuff

var Parse = {
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
    var qry = this._currentUserify(qry);
    console.debug(qry)
    //console.debug('THE QUERY')
    //console.debug(qry)
    var _this = this;

    request = $.ajax({
      url: _this.url+className,
      headers: appConfig.parseHeaders,
      type:'GET',
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

  update: function(_object, qry) {
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

  put: function(_object, qry) {
    var qry = this._currentUserify(qry);
    var _this = this;
    request = $.ajax({
      url: _this.url+_object,
      headers: appConfig.parseHeaders,
      type:'PUT',
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


var KeyboardShortcuts = {
  initialize: function() {

  },
  _initialize: function() {
    /* Keyboard Shortcuts */
    Mousetrap.reset()
    //Mousetrap.unbind(['j','k','o'])
    thiss = this;

    /* Prospect Table Shortcuts */
    Mousetrap.bind('j', function() { 
      keyboard = thiss.state.keyboardActiveProspect
      if(keyboard != thiss.state.prospectsPerPage+1)
        thiss.adjustHeight('j')
        thiss.setState({keyboardActiveProspect: keyboard+1})
    });

    Mousetrap.bind('k', function() { 
      keyboard = thiss.state.keyboardActiveProspect
      if(keyboard != 1)
        thiss.adjustHeight('k')
        thiss.setState({keyboardActiveProspect: keyboard-1})
    });

    Mousetrap.bind('s', function() { 
      console.log('open current prospect')
      console.log($($('.keySelect').find('a.linkedin_link')[0]).attr('href'))
      link = $($('.keySelect').find('a.similar_link')[0]).attr('href')
      /*
      window.open(link, '_blank')
      console.log('new')
      */
      //popupWindow.blur();
      //window.focus();
      // keyboard = thiss.state.keyboardActiveProspect
      
      var a = document.createElement("a");
      a.href = link
      var evt = document.createEvent("MouseEvents");
      //the tenth parameter of initMouseEvent sets ctrl key
      // For Mac This Works Check For - Windows
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                  false, false, false, true, 0, null);
      a.dispatchEvent(evt);
    });

    Mousetrap.bind('o', function() { 
      console.log('open current prospect')
      console.log($($('.keySelect').find('a.linkedin_link')[0]).attr('href'))
      link = $($('.keySelect').find('a.linkedin_link')[0]).attr('href')
      /*
      window.open(link, '_blank')
      console.log('new')
      */
      //popupWindow.blur();
      //window.focus();
      // keyboard = thiss.state.keyboardActiveProspect
      
      var a = document.createElement("a");
      a.href = link
      var evt = document.createEvent("MouseEvents");
      //the tenth parameter of initMouseEvent sets ctrl key
      // For Mac This Works Check For - Windows
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                  false, false, false, true, 0, null);
      a.dispatchEvent(evt);
    });

    /* List Modification Shortcuts */
    Mousetrap.bind('tab+r', function(){
      //console.log('reload')
      $('#renameListBtn').click()
    })

    Mousetrap.bind('tab+d', function(){
      //console.log('reload')
      $('#deleteListModal').click()
    })

    Mousetrap.bind('tab+s', function(){
      //console.log('reload')
      //$('#downloadProspects').click()
      thiss.downloadFile()
    })

    Mousetrap.bind('shift+l', function(){
      //console.log('reload')
      //$('#downloadProspects').click()
      //thiss.downloadFile()
      $('.new-list-btn').click()
    })

    Mousetrap.bind('e', function(){
      console.log('reload')
      //$('#downloadProspects').click()
      thiss.removeSelectedProspects()
    })

    Mousetrap.bind('c', function() { 
      console.log('copy')
      $('#copyToList').click()
    });

    Mousetrap.bind('m', function() { 
      console.log('copy')
      $('#moveToList').click()
    });

    //Mousetrap.bind('e', function() { console.log('e'); });
    Mousetrap.bind('right', function() { console.log('right'); });
    Mousetrap.bind('left', function() { console.log('left'); });


  },
  adjustHeight: function(whichOne) {
    prospectWindowTop = $('#prospectDetailButtons').position().top
    prospectWindowTop = prospectWindowTop + $('#prospectDetailButtons').height()
    prospectWindowBottom = $('#autoscroll').position().top + $('#autoscroll').height()

    if(whichOne == 'j')
      activeProspect = this.state.keyboardActiveProspect +1 
    else
      activeProspect = this.state.keyboardActiveProspect -1 

    activeTop = $($('.prospects-tr')[activeProspect]).position().top
    selectedHeight = $($('.prospects-tr')[activeProspect]).height()
    activeBottom = $($('.prospects-tr')[activeProspect]).position().top+selectedHeight

    console.log(prospectWindowTop, prospectWindowBottom)
    console.log(activeTop, activeBottom)

    scrollTop = document.getElementById('autoscroll').scrollTop
    if(activeBottom > prospectWindowBottom)
      document.getElementById('autoscroll').scrollTop = scrollTop + activeBottom - prospectWindowBottom

    if(activeTop < 0)
      document.getElementById('autoscroll').scrollTop = scrollTop + activeTop - 37
    else if(activeTop == $($('.prospects-tr')[0]).position().top)
      document.getElementById('autoscroll').scrollTop = 0

  }
}

function particles() {
particlesJS('particles-js', {
    particles: {
      color: '#fff',
      shape: 'circle',
      opacity: 1,
      size: 2.5,
      size_random: true,
      nb: 100,
      line_linked: {
        enable_auto: true,
        distance: 250,
        color: '#fff',
        opacity: 0.5,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      },
      anim: {
        enable: true,
        speed: 2.5
      }
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 250
      },
      detect_on: 'canvas',
      mode: 'grab',
      line_linked: {
        opacity: 0.5
      },
      events: {
        onclick: {
          push_particles: {
            enable: true,
            nb: 4
          }
        }
      }
    },
    retina_detect: true
});

$('canvas').css({
  'width': '100%',
  'height': '376px',
  'background-color': 'rgba(0,0,0,0)',
  'top': '122px',
  'position': 'absolute',
})
}

function init_parse() {
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
      var qry = this._currentUserify(qry);
      console.debug(qry)
      //console.debug('THE QUERY')
      //console.debug(qry)
      var _this = this;

      request = $.ajax({
        url: _this.url+className,
        headers: appConfig.parseHeaders,
        type:'GET',
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
    put: function(className, _object, qry) {
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
      var qry = this._currentUserify(qry);
      var _this = this;
      request = $.ajax({
        url: _this.url+_object,
        headers: appConfig.parseHeaders,
        type:'PUT',
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
