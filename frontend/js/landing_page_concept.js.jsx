/** @jsx React.DOM */

var MarketingFooter = require('./marketing_footer.js.min.js');

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
  componentDidMount: function() {
    particles()
  },

  render: function() {
    $('body').css({overflow:'auto'})

    return (
      <div className="particles-js" id="particles-js">
        <nav className="thenavbar navbar navbar-default" role="navigation" style={{padding:70}}>
          <div className="container-fluid" style={{fontFamily:'proxima-nova', fontSize:12}}>
            <a href="#">
            <img className="" src="build/img/full-logo-5.png" style={{width:220}}/>
          </a>
              <ul className="nav nav-pills landing-page-nav" role="tablist" style={{marginRight:0,fontSize:11,marginTop:-70}}>
                <li ><a className="landing-page-nav-tab" style={{display:'block'}} href="#login">LOGIN</a></li>
                <li><a className="landing-page-nav-tab" style={{display:'block'}} href="http://resources.customerohq.com/v1.0/blog">BLOG</a></li>
                <li><a className="landing-page-nav-tab" href="http://resources.customerohq.com">RESOURCES</a></li>
                <li><a className="landing-page-nav-tab" href="http://resources.customerohq.com/v1.0/discuss">KNOWLEDGE BASE</a></li>
                <li><a className="landing-page-nav-tab" href="#">+1905-616-7602 <i className="fa fa-phone"/></a></li>
              </ul>
          </div>
          <a href="#signup" className="btn-lg btn login-btn" style={{fontFamily:'proxima-nova'}}>TRY IT</a>
              <ul className="nav nav-pills landing-page-nav" role="tablist" style={{width:600,fontSize:13,marginRight:100,marginTop:-45}}>
                <li style={{width:'24%',textAlign:'center',display:'block'}}>&nbsp;</li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">PRODUCT</a></li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">DATA</a></li>
                <li style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#product/features">FEATURES</a></li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">INTEGRATIONS</a></li>
                <li style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}}href="#pricing">PRICING</a></li>
                <li  style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#services">SERVICES</a></li>
              </ul>
        </nav>

        <div className="row" style={{margin:0}}>
        <div className="gradient-2" ></div>
        <div className="the-background-image"></div>
        <div className="col-md-12 col-sm-12" style={{paddingTop:'80px'}} id="">
          <h1 style={{color:'#1ca3fd',fontWeight:'100',color:'white',textAlign:'center',fontSize:'38px',fontFamily:'Open Sans',fontSize:'40px'}}> 
            Generate High Quality Prospect Lists 
          </h1>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',textAlign:'center',color:'white',fontSize:'46px',fontFamily:'Open Sans', fontStyle:'italic'}}>  
            Find New Customers Faster
          </h1>
          <a href="#signup" className="btn-lg btn-success btn start-trial" style={{display:'none'}}>Start Your Free Trial Today</a>

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
        <div className="the-gradient-1"></div>
          </div>
        </div>
      </div>

        <div className="container product-header chrome-bar" 
             style={{height:100,paddingTop:45, marginTop:113}}>
             <div className="col-md-4" style={{textAlign:'center',fontFamily:'proxima-nova', fontSize:12}}><i className="fa fa-line-chart"/>&nbsp;GROW PIPELINE FAST</div>
          <div className="col-md-4" style={{textAlign:'center',fontFamily:'proxima-nova', fontSize:12}}><i className="fa fa-search"/>&nbsp;IDENTIFY HIGH-VALUE PROSPECTS</div>
          <div className="col-md-4" style={{textAlign:'center',fontFamily:'proxima-nova', fontSize:12}}><i className="fa fa-coffee"/>&nbsp;CONNECT WITH DECISION MAKERS  </div>
        </div>

      <div className="container" style={{fontFamily:'open-sans'}}>
        <div className="row" style={{height:300}}>
          <div className="col-md-offset-1 col-md-6"> 
            <h1 style={{color:'rgb(0, 132, 255)'}}> Grow Pipeline Fast</h1> <br/>
            <h5 style={{fontWeight:100,lineHeight:1.7, fontStyle:'italic'}}>
              Automate list building through the power of social networks and sync contact information directly to your CRM
            </h5>
            <h5 className="text-muted" style={{fontWeight:100,lineHeight:1.7}}>
              {" Customero searches through social profiles on the web to find you the exact prospects you're looking for. Add prospects to lists with one click. Once you have your list you can start qualifying leads and tracking down new leads."}
            </h5>

          </div>
        <div className="col-md-4"> <i className="fa fa-line-chart lp-icon" /> 
            <div className="col-md-1">&nbsp;</div>
        </div>
        </div>
      </div>

      <div style={{borderBottom: '1px solid #ecedee', borderTop: '1px solid #ecedee', backgroundColor:'#f5f7f9',fontFamily:'open-sans'}}>
        <div className="container">
          <div className="row" style={{height:300}}>
            <div className="col-md-4 col-md-offset-1"><i className="fa fa-search lp-icon" />  </div>
            <div className="col-md-6"> 
            <h1 style={{color:'rgb(0, 132, 255)'}}>
              {"Identify High-Value Prospects In Real Time"}
            </h1> 
            <h5 style={{fontWeight:100,lineHeight:1.7, fontStyle:'italic'}}> <br/>
              Customero tracks over 2 million US, Canadian and International companies and our database is growing daily. 
            </h5>
            <h5 className="text-muted" style={{fontWeight:100, lineHeight:1.7}}>
          Customero sits at the top of your sales funnel, proactively identifying and delivering high value prospects. This enables you to be first to call on a prospect with a high quality signal - such as funding, product launch, hiring, or job posting and many others.
            </h5>
            </div>
            <div className="col-md-1">&nbsp;</div>
          </div>
        </div>
      </div>

      <div style={{fontFamily:'open-sans'}}>
          <div className="container">
            <div className="row" style={{height:300}}>
              <div className="col-md-6 col-md-offset-1"> <h1 style={{color:'rgb(0, 132, 255)'}}>Connect With Decision Makers </h1> <br/>
                <h5 style={{fontWeight:100,lineHeight:1.7, fontStyle:'italic'}}> 
                  Create hyper-targeted email campaigns using our data-driven sales automation platform.
                </h5>
                <h5 style={{fontWeight:100,lineHeight:1.7}} className="text-muted">
                  {" With Customero Sales Tracking, Templates and Analytics, put the most powerful sales acceleration platform to work for you and your team."}
                </h5>

              </div>
              <div className="col-md-4"> <i className="fa fa-coffee lp-icon" /> </div>
            <div className="col-md-1">&nbsp;</div>
            </div>
          </div>
      </div>

      <div style={{borderBottom: '1px solid #edeeef', borderTop: '1px solid #edeeef', 
                   paddingTop:50, backgroundColor:'#f5f8fa'}}>
        <div className="container">
          <div className="row" style={{height:200, textAlign:'center'}}>
            <h2>Give Customero a try. Free 14-day trial available for all plans.</h2>
            <br/>
            <a href="#signup" className="btn btn-success btn-lg start-trial" style={{marginTop:10}}> 
              START A NO-RISK FREE TRIAL &nbsp;<i className="fa fa-chevron-right" style={{fontSize:18}}/>
            </a>
          </div>
        </div>
      </div>

      <div class="tmp-footer"></div>

      </div>
    );
  }
});

