/** @jsx React.DOM */

module.exports = React.createClass({
  // Landing Page
  login: function() {
    console.log('login')
    email = $('#email').val()
    password = $('#password').val()
    p = {"X-Parse-Application-Id": "N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ",
         "X-Parse-REST-API-Key": "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb"}
    $.ajax({
      url:'https://api.parse.com/1/login',
      headers: p,
      type:'GET',
      data: {
        'username':email,
        'password':password
      },
      success:function(res) {
        localStorage.setItem('currentUser', JSON.stringify(res))
        location.href = "#"
      },
      error: function(res) {
        console.log(res)
      }
    });
  },

  render: function() {
    $('body').css({overflow:'auto'})

    return (
      <div className="">
        <div className="background-image"></div>
        <nav className="thenavbar navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <a className="the-title tk-foco brand navbar-brand" style={{fontWeight:'100'}}
                href="#">
              Customero
              <span style={{fontSize:'22px',marginLeft:'30px'}}>Supercharge your sales! </span>
            </a>
          </div>
          <a href="#login" className="btn-lg btn login-btn">Log In</a>
        </nav>
        <div className="col-md-12" style={{marginTop:'100px',paddingTop:'100px'}}>
          <h1 style={{color:'#1ca3fd',fontWeight:'bold',textAlign:'center',fontSize:'56px'}}> Generate High Quality Prospect Lists </h1>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',textAlign:'center',fontSize:'56px'}}> Accelerate Sales </h1>
          <a href="#signup" className="btn-lg btn-success btn start-trial">Start Your Free Trial Today</a>

          <div className="panel panel-default" style={{display:'none'}}>
          <div className="panel-heading">&nbsp;</div>
            <div className="panel-body">
              <form onSubmit={this.login}>
              <input placeholder="Email" id="email" type="text" className="form-control input-lg" style={{fontWeight:'100',fontSize:'22px'}}/>
              <br/>
              <input placeholder="Password" type="password" id="password" className="form-control input-lg" style={{fontWeight:'100',fontSize:'22px'}} />
              <br/>
              <a href="javascript:" onClick={this.login} className="btn btn-success btn-lg" style={{display:'block',backgroundColor:'#1ca3fd'}}>Log In</a>
              </form>
            </div>
          <div className="panel-footer">&nbsp;</div>
          </div>
        </div>
        <div className="gradient"> </div>
      </div>
    );
  }
});
