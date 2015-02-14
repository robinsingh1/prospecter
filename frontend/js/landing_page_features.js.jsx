var MarketingFooter = require('./marketing_footer.js.min.js');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="particles-js" id="particles-js">
        <nav className="thenavbar navbar navbar-default" role="navigation" style={{padding:70}}>
          <div className="container-fluid" style={{fontFamily:'proxima-nova', fontSize:12}}>
            <a href="#">
            <img className="" src="build/img/full-logo-5.png" style={{width:220}}/>
          </a>
              <ul className="nav nav-pills landing-page-nav" role="tablist" style={{marginRight:0,fontSize:11,marginTop:-70}}>
                <li ><a className="landing-page-nav-tab" style={{display:'block'}} href="#">LOGIN</a></li>
                <li><a className="landing-page-nav-tab" style={{display:'block'}} href="#">BLOG</a></li>
                <li><a className="landing-page-nav-tab" href="#pricing">RESOURCES</a></li>
                <li><a className="landing-page-nav-tab" href="#pricing">KNOWLEDGE BASE</a></li>
                <li><a className="landing-page-nav-tab" href="#pricing">+1905-616-7602 <i className="fa fa-phone"/></a></li>
              </ul>
          </div>
          <a href="#signup" className="btn-lg btn login-btn" style={{fontFamily:'proxima-nova'}}>TRY IT</a>
              <ul className="nav nav-pills landing-page-nav" role="tablist" style={{width:600,fontSize:13,marginRight:100,marginTop:-45}}>
                <li style={{width:'24%',textAlign:'center',display:'block'}}>&nbsp;</li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">PRODUCT</a></li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">DATA</a></li>
                <li style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav active" style={{display:'block'}} href="#product/features">FEATURES</a></li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">INTEGRATIONS</a></li>
                <li style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}}href="#pricing">PRICING</a></li>
                <li  style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#services">SERVICES</a></li>
              </ul>
        </nav>
        <div className="row" style={{margin:0}}>
        <div className="gradient-2" ></div>
        <div className="features-background-image"></div>
        <div className="col-md-12 col-sm-12" style={{paddingTop:'80px'}}>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',color:'white',textAlign:'center',fontSize:'38px',fontFamily:'Open Sans',fontSize:'40px'}}> 
            Close more deals with powerful prospecting features.
          </h1>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',textAlign:'center',color:'white',fontSize:'46px',fontFamily:'Open Sans', fontStyle:'italic',display:'none'}}> Accelerate Sales </h1>
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
        <div className="the-gradient-1"></div> </div>
        </div>
      </div>
      <MarketingBody />
    </div>
    )
  },
  componentDidMount: function() {
    console.log('features')
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
    
    /*
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        var top = $('.product-header').offset().top
        if(scroll > top){
          pos = $('.product-header').css('position')
          console.log(pos)
          if(pos != "static" || pos != "fixed"){
              $('.product-header').css({
                position: "fixed",
                top: 0,
                "z-index": 100000000,
              })
          }
        }else {
          $('.product-header').removeAttr( 'style' );
        }
    })
    */
  }
})

var MarketingBody = React.createClass({
  render: function() {
    return (
      <div style={{marginTop:180, fontFamily:'open-sans'}}>
        <div className="container product-header chrome-bar" 
             style={{height:100,paddingTop:45, fontFamily:'proxima-nova', fontSize:12,textAlign:'center'}}>
             <div className="col-md-2"><i className="fa fa-wifi"/>&nbsp;SIGNALS</div>
          <div className="col-md-2"><i className="fa fa-cloud-download"/>&nbsp;MINING JOBS</div>
          <div className="col-md-2"><i className="fa fa-globe"/>&nbsp;TERRITORY MANAGEMENT</div>
          <div className="col-md-2"><i className="fa fa-users"/>&nbsp;SOCIAL PROSPECT DATA</div>
          <div className="col-md-2"><i className="fa fa-envelope"/>&nbsp;CAMPAIGNS</div>
          <div className="col-md-2"><i className="fa fa-database"/>&nbsp;CRM INTEGRATION</div>
        </div>

      <div className="container">
        <div className="row" style={{height:300}} id="signals">
          <div className="col-md-6 col-md-offset-1"><br/><br/> <h1> Signals </h1> 
            <br/>
            <h5 style={{fontWeight:100,lineHeight:1.7}} >
            Your personal radar system for sales prospecting. The more companies you follow, the more trigger events you’ll find, and the more prospects you’ll have in your sales funnel. Start using signal-based selling to increase sales!
          </h5>
          </div>
        <div className="col-md-4" style={{textAlign:'center',paddingTop:80}}> <i className="fa fa-wifi lp-icon" /> </div>
        <div className="col-md-1"></div>
        </div>
      </div>

      <div style={{borderBottom: '1px solid #ecedee', borderTop: '1px solid #ecedee', backgroundColor:'#f5f7f9'}}>
        <div className="container">
          <div className="row" style={{height:300}}>
            <div className="col-md-4 col-md-offset-1" style={{paddingTop:80,textAlign:'center'}}> 
              <i className="fa fa-cloud-download lp-icon" /> </div>
            <div className="col-md-6"> <br/><br/><h1> Mining Jobs </h1> 
              <br/>
              <h5 style={{fontWeight:100,lineHeight:1.7}} >
              Generate highly specific prospect lists in minutes instead of days with on demand scraping jobs.
              Automate search queries to find companies and titles prospects.
            </h5>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>

      <div>
          <div className="container">
            <div className="row" style={{height:300}}>
              <div className="col-md-6 col-md-offset-1"><br/><br/> <h1>Territory Management </h1> 
                <br/>
              <h5 style={{fontWeight:100,lineHeight:1.7}} >
                Organize companies that match your ideal customer profile by territory and 
                be confident that your sales reps are not missing a single opportunity.
              </h5>
              </div>
            <div className="col-md-4" style={{textAlign:'center',paddingTop:80}}> <i className="fa fa-globe lp-icon" /> </div>
            <div className="col-md-1"></div>
            </div>
          </div>
      </div>

      <div style={{borderBottom: '1px solid #ecedee', borderTop: '1px solid #ecedee', backgroundColor:'#f5f7f9'}}>
        <div className="container">
          <div className="row" style={{height:300}}>
            <div className="col-md-4 col-md-offset-1" style={{paddingTop:80,textAlign:'center'}}> 
              <i className="fa fa-users lp-icon"/> </div>
            <div className="col-md-6"> <br/><br/><h1>Social Prospect Data </h1> 
              <br/>
              <h5 style={{fontWeight:100,lineHeight:1.7}} >
              You can run your search from anywhere on the web using our Chrome browser extension. Search for titles, industry, location, social network groups, and more. Build highly specific and targeted searches.
            </h5>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>

      <div>
          <div className="container">
            <div className="row" style={{height:300}}>
              <div className="col-md-6 col-md-offset-1"> <br/><br/><h1> Campaigns </h1> 
                <br/>
              <h5 style={{fontWeight:100,lineHeight:1.7}} >
                Build your own unique process for sales development emails, phone calls, and other activity. Customize each email with references to social profiles, blogs, or specific interests.
              </h5>
              </div>
            <div className="col-md-4" style={{textAlign:'center',paddingTop:80}}> <i className="fa fa-envelope lp-icon" /> </div>
            <div className="col-md-1"></div>
            </div>
          </div>
      </div>

      <div style={{borderBottom: '1px solid #ecedee', borderTop: '1px solid #ecedee', backgroundColor:'#f5f7f9'}}>
        <div className="container">
          <div className="row" style={{height:300}}>
            <div className="col-md-4 col-md-offset-1" style={{paddingTop:80,textAlign:'center'}}> 
              <i className="fa fa-database lp-icon" /> </div>
            <div className="col-md-6"> <br/><br/><h1> CRM Integration </h1> 
              <br/>
              <h5 style={{fontWeight:100,lineHeight:1.7}} >
              Enjoy Native Integration with all Major CRMs
            </h5>
            </div>
            <div className="col-md-1"></div>
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
    </div>

    )
  }
})
