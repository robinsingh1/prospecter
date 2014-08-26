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
                <ul className="plan plan1">
                    <li className="plan-name"> Basic </li>
                    <li className="plan-price"> <strong>$29</strong> / month </li>
                    <li> <strong>5GB</strong> Storage </li>
                    <li> <strong>1GB</strong> RAM </li>
                    <li> <strong>400GB</strong> Bandwidth </li>
                    <li> <strong>10</strong> Email Address </li>
                    <li> <strong>Forum</strong> Support </li>
                    <li className=""> <a href="#" className="btn btn-danger btn-lg">Signup</a> </li>
                </ul>
            </div>

            <div className="col-lg-3 col-md-3 col-xs-6">
                <ul className="plan plan2 featured">
                    <li className="plan-name"> Standard </li>
                    <li className="plan-price"> <strong>$39</strong> / month </li>
                    <li> <strong>5GB</strong> Storage </li>
                    <li> <strong>1GB</strong> RAM </li>
                    <li> <strong>400GB</strong> Bandwidth </li>
                    <li> <strong>10</strong> Email Address </li>
                    <li> <strong>Forum</strong> Support </li>
                    <li className="">
                 </li>
             </ul>
         </div>

         <div className="col-lg-3 col-md-3 col-xs-6">
            <ul className="plan plan3">
                <li className="plan-name"> Advanced </li>
                <li className="plan-price"> <strong>$199</strong> / month </li>
                <li> <strong>50GB</strong> Storage </li>
                <li> <strong>8GB</strong> RAM </li>
                <li> <strong>1024GB</strong> Bandwidth </li>
                <li> <strong>Unlimited</strong> Email Address </li>
                <li> <strong>Forum</strong> Support </li>
                <li className="plan-action">  </li>
         </ul>
     </div>

     <div className="col-lg-3 col-md-3 col-xs-6">
        <ul className="plan plan4">
            <li className="plan-name"> Mighty </li>
            <li className="plan-price"> <strong>$999</strong> / month </li>
            <li> <strong>50GB</strong> Storage </li>
            <li> <strong>8GB</strong> RAM </li>
            <li> <strong>1024GB</strong> Bandwidth </li>
            <li> <strong>Unlimited</strong> Email Address </li>
            <li> <strong>Forum</strong> Support </li>
            <li className="plan-action"> <a href="#" className="btn btn-danger btn-lg">Signup</a> </li>
     </ul>
 </div>
</div>

</div> 
      </div>
    );
  },
});
