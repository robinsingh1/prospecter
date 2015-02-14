/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    //$('body').css({overflow:'hidden'})
    return (
      <div>
        <div className="pricing-background-image"></div>
          <Header/>
          <PricingTables />
        <div className="the-gradient-1" style={{height:'100%'}}> </div>
      </div>
    )
    /*
              <a href="#signup" className="btn btn-success btn-lg" style={{display:'block',backgroundColor:'#1ca3fd',float:'right',marginTop:'13px' }}>Log In</a>
    */
  }
});

var PricingTables = React.createClass({
  render: function() {
    return (
      <div>
        <div className="container" >
        <div className="row flat">
          <div className="col-lg-3 col-md-3 col-xs-6">
                <ul className="signal-card plan plan2">
                    <li className="plan-name"> Individual </li>
                    <li className="plan-price"> 
                      <h1 style={{fontWeight:'bold',color:'#0294f5'}}>$99&nbsp;<small>/ month</small></h1>
                    </li>

                  <li> <strong>Up to 200 Email Credits</strong> </li>
                  <li> <strong>Up to 1 Team Members</strong></li>
                  <li style={{padding:0}}> <strong></strong> Includes: </li>
                  <li> <strong>{'Emails & Phone Numbers'}</strong></li>
                  <li> </li>
                  <li> </li>
                  <li> </li>
                  <li> </li>
                  <li className="" style={{paddingBottom:0}}> 
                    <a href="#signup" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
                  </li>
             </ul>
         </div>

            <div className="col-lg-3 col-md-3 col-xs-6">
                <ul className="signal-card plan plan2">
                    <li className="plan-name"> Startup </li>
                    <li className="plan-price"> 
                      <h1 style={{fontWeight:'bold',color:'#0294f5'}}>$499&nbsp;<small>/ month</small></h1>
                    </li>

                  <li> <strong>Up to 1000 Email Credits</strong> </li>
                  <li> <strong>Up to 10 Team Members</strong></li>
                  <li style={{padding:0}}> <strong></strong> Includes: </li>
                  <li> <strong>{'Emails & Phone Numbers'}</strong></li>
                  <li> <strong>Quick Start Package</strong></li>
                  <li> <strong>Signals</strong></li>
                  <li className="" style={{paddingBottom:0}}> 
                    <a href="#signup" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
                  </li>
             </ul>
         </div>

         <div className="col-lg-3 col-md-3 col-xs-6">
            <ul className="signal-card plan plan3 featured">
                <li className="plan-name"> Growth </li>
                <li className="plan-price"> 
                  <h1 style={{fontWeight:'bold',color:'#0294f5'}}>$1299&nbsp;<small>/ month</small></h1>
                </li>

            <li> <strong>Up to 2500 Email Credits</strong> </li>
            <li> <strong>Up to 25 Team Members</strong></li>
            <li style={{padding:0}}> <strong></strong> Includes: </li>
            <li> <strong>All Startup Features </strong></li>
            <li style={{padding:0}}> <i className="fa fa-plus" /></li>
            <li> <strong>Bulk CRM Integration</strong></li>
            <li> <strong>Mining Jobs</strong></li>
            <li className="" style={{paddingBottom:0}}> 
              <a href="#signup" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
            </li>
         </ul>
     </div>

     <div className="col-lg-3 col-md-3 col-xs-6">
        <ul className="signal-card plan plan4">
            <li className="plan-name"> Premium </li>
            <li className="plan-price"> 
              <h1 style={{fontWeight:'bold',color:'#0294f5'}}>$2999&nbsp;<small>/ month</small></h1>
            </li>
            <li> <strong>Up to 7500 Email Credits</strong> </li>
            <li> <strong>Up to 50 Team Members</strong></li>
            <li style={{padding:0}}> <strong></strong> Includes: </li>
            <li> <strong>All Growth Features </strong></li>
            <li style={{padding:0}}> <i className="fa fa-plus" /></li>
            <li> <strong>Dedicated Happiness Officer</strong></li>
            <li> <strong>Improved territory planning</strong></li>
            <li className="" style={{paddingBottom:0}}> 
              <a href="#signup" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
            </li>
         </ul>
       </div>

</div>

</div> 
      </div>
    );
  },
});

var Header = React.createClass({
  render: function() {
    return (
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
    )
  }
})
