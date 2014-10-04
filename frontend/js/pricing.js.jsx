/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    $('body').css({overflow:'hidden'})
    return (
      <div>
        <div className="background-image"></div>
        <nav className="thenavbar navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <a className="the-title tk-foco brand navbar-brand" style={{fontWeight:'100'}}
                href="#">
              Customero
              <span style={{fontSize:'22px',marginLeft:'30px'}}>Supercharge your sales! </span>
            </a>
          </div>
        </nav>
          <PricingTables />
        <div className="gradient"> </div>
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
    <div className="container" style={{marginTop:150}}>
        <div className="row flat">
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
                    <a href="#" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
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
            <li> <strong>Bulk Salesforce Integration</strong></li>
            <li> <strong>Mining Jobs</strong></li>
            <li className="" style={{paddingBottom:0}}> 
              <a href="#" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
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
              <a href="#" className="btn btn-primary btn-md cool-btn">Sign Up</a> 
            </li>
         </ul>
       </div>
            <div className="col-lg-3 col-md-3 col-xs-6">
                <ul className="signal-card plan plan1">
                    <li className="plan-name"> Enterprise </li>
                    <li className=""> </li>
                    <li> <strong></strong> </li>
                    <li> <strong></strong> </li>
                    <li style={{fontSize:22}}> <strong>Contact Us</strong> </li>
                    <li> <strong></strong> </li>
                    <li> <strong></strong>  </li>
                </ul>
            </div>

</div>

</div> 
      </div>
    );
  },
});
