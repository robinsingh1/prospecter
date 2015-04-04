/** @jsx React.DOM */

var _Parse = require("../lib/parse-require.min.js")
theData = require('../lib/data.min.js') 

module.exports = React.createClass({
  // SignUp
  componentDidMount: function() {
    //$('body').css({overflow:'hidden'})
    var thiss = this;
    $("input").keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          thiss.login()
        }
    });
  },

  login: function() {
    console.log('login')
    $.ajax({
      url:'https://api.parse.com/1/login',
      headers: appConfig.headers,
      type:'GET',
      data: {
        'username':$('#email').val(),
        'password':$('#password').val()
      },
      beforeSend: function() { },
      success:function(res) {
        //alertify.success('Logging in...')
        localStorage.setItem('currentUser', JSON.stringify(res))
        location.href = "#"
        Parse = _Parse()
      },
      error: function(res) {
        alertify.error('There was an error with your login request. Please try again')
      }
    });
  },

  render: function() { 
    data = theData()
    imgs_1 = []
    imgs_2 = []
    for(i=0;i < 120; i++) {
      imgs_1.push(<img src={data[i]} className="prospect-img" />)
    }
    for(i=15;i < 30; i++) {
      imgs_2.push(<img src={data[i]} className="prospect-img" />)
    }

  console.log(data)
    return (
      <div style={{height:'100%'}}>
      <div id="signup" style={{paddingTop:50}}>
        <h1 className="title">Customero.</h1>
        <h5 className="tagline">Generate high quality prospect lists. Accelerate Sales.</h5>
          <div className="panel panel-default login-info" style={{display:'block'}}>
            <div className="panel-body" style={{fontFamily:'proxima-nova',fontWeight:'bold'}}>
              <form onSubmit={this.login}>
              <input placeholder="Email" id="email" type="text" className="form-control input-lg" />
              <br/>
              <input placeholder="Password" type="password" id="password" className="form-control input-lg" />
              <br/>

              <a href="javascript:" onClick={this.login} className="btn btn-gradient btn-lg btn-primary" style={{borderRadius:3, display:'block',backgroundColor:'#1ca3fd',fontFamily:'proxima-nova',fontWeight:'bold'}}>LOG IN</a>

              </form>
            </div>
          </div>
      </div>

        <div id="" style={{position:'absolute',zIndex:'-2',top:0,left:0}}>
          <div className="" style={{marginLeft:34, display:'none'}}>
          {imgs_1}
          {imgs_2}
          </div>
        </div>
      </div>
    )
  }
});
