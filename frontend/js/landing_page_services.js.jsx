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
        <div className="services-background-image"></div>
        <div className="col-md-12 col-sm-12" style={{paddingTop:'80px'}}>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',color:'white',textAlign:'center',fontSize:'38px',fontFamily:'Open Sans',fontSize:'40px'}}> 
            Your On-Demand Sales Development Team
          </h1>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',textAlign:'center',color:'white',fontSize:'46px',fontFamily:'Open Sans', fontStyle:'italic'}}> &nbsp; </h1>

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
      <br/>
      <br/>
      <MarketingBody />
    </div>
    )
  }
})

var MarketingBody = React.createClass({
  render: function() {
    return (
      <div style={{marginTop:70,fontFamily:'open-sans'}}>
        <div className="container">
          <div className="row" style={{height:300, textAlign:'center'}}>
            <br/> <br/>
            <div className="col-md-12"> <h1> 
                Building a Cold Calling 2.0 team can take 3 to 6 months and $100k+.
            </h1> 
            <h2 style={{fontStyle:'italic'}}>
            Start a Predictable Revenue outbound sales program in 48 hours.
            </h2>
          
            </div>
          </div>
        </div>

      <div style={{borderBottom: '1px solid #ecedee', borderTop: '1px solid #ecedee', backgroundColor:'#f5f7f9', textAlign:'center'}}>
        <div className="container" style={{display:"none"}}>
          <div className="row" style={{height:300, display:"none"}}>
              <h1>LHow It Works</h1>
            <div className="col-md-3"> 
              We have a dedicated fully-trained inside sales team .
            </div>
            <div className="col-md-3"> 
              We use Customero and other proprietary databases to find
              the best prospects for your business
            </div>
            <div className="col-md-3"> 
              We reach out to potential customers with tailored messages
            </div>
            <div className="col-md-3"> 
              View your leads in your CRM or as a .csv
            </div>
          </div>
        </div>
      </div>

      <div> <div className="container" style={{display:"none"}}>
            <div className="row" style={{height:300, textAlign:'center'}}>

              <h1>{"Why we're different"}</h1>
            <div className="col-md-3"> 
              <h4>Research customized to you.</h4>
            </div>
            <div className="col-md-3"> 
              <h4>Effective, targeted campaigns.</h4>
            </div>
            <div className="col-md-3"> 
              <h4>Best in class technology.</h4>
            </div>
            <div className="col-md-3"> 
              <h4>A scalable, on-demand team.</h4>
            </div>
            </div>
          </div> </div>

      <div style={{borderBottom: '1px solid #edeeef', borderTop: '1px solid #edeeef', 
                   paddingTop:50, backgroundColor:'#f5f8fa', textAlign:'center'}}>
        <div className="container">
          <div className="row" style={{height:200, textAlign:'center'}}>
            <h2>
              Plans that grow with you, adjust at any time.
            </h2>
            <br/>
            <a href="#signup" className="btn btn-success btn-lg start-trial" style={{marginTop:10}}> 
              SCHEDULE A FREE DEMO &nbsp;<i className="fa fa-chevron-right" style={{fontSize:18}}/>
            </a>
          </div>
        </div>
      </div>
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
