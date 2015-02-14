
module.exports = React.createClass({
  render: function() {
    return (
      <div className="container footer" style={{marginTop:50}}>
      <div className="row" style={{fontFamily:"proxima-nova"}}>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <h5>PRODUCT</h5>
          <ul className="list-unstyled">
            <li><a href="javascript:">Overview</a></li>
            <li><a href="javascript:">Customers</a></li>
            <li><a href="javascript:">Pricing</a></li>
            <li><a href="javascript:">Security</a></li>
          </ul>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <h5>FEATURES</h5>
          <ul className="list-unstyled">
          <li><a href="javascript:">Signals</a></li>
          <li><a href="javascript:">Mining Jobs</a></li>
          <li><a href="javascript:">Territory Management</a></li>
          <li><a href="javascript:">Social Prospect Data</a></li>
          <li><a href="javascript:">Campaigns</a></li>
          <li><a href="javascript:">CRM Integration</a></li>
          </ul>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <h5>ROLES</h5>
          <ul className="list-unstyled">
            <li><a href="javascript:">Sales Leaders</a></li>
            <li><a href="javascript:">Sales Professionals</a></li>
            <li><a href="javascript:">CIO and IT</a></li>
            <li><a href="javascript:">Sales Ops</a></li>
          </ul>
          <br />
          <h5>SOLUTIONS</h5>
          <ul className="list-unstyled">
            <li><a href="javascript:">Small Business</a></li>
            <li><a href="javascript:">Mid-Market</a></li>
            <li><a href="javascript:">Enterprise</a></li>
          </ul>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <h5>COMPANY</h5>
          <ul className="list-unstyled">
            <li><a href="javascript:">About</a></li>
            <li><a href="javascript:">Careers</a></li>
            <li><a href="javascript:">Partner Program</a></li>
            <li><a href="javascript:">Press</a></li>
            <li><a href="javascript:">Blog</a></li>
          </ul>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <h5>COMMUNITY</h5>
          <ul className="list-unstyled">
            <li><a href="javascript:">Facebook</a></li>
            <li><a href="javascript:">Twitter</a></li>
            <li><a href="javascript:">Linkedin</a></li>
            <li><a href="javascript:">Free Resources</a></li>
            <li><a href="javascript:">Sales Blog</a></li>
          </ul>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <h5>HELP AND SUPPORT</h5>
          <ul className="list-unstyled">
            <li><a href="javascript:">Support Center</a></li>
            <li><a href="javascript:">Developer Tools</a></li>
            <li><a href="javascript:">Contact Us</a></li>
          </ul>
          <br />
          <h5 style={{color:'#0084ff',fontWeight:'bold',fontSize:12}}>ACCOUNT</h5>
          <ul className="list-unstyled text-muted">
            <li><a href="javascript:" className="text-muted">Sign Up</a></li>
            <li><a href="javascript:" className="text-muted">Login</a></li>
            <li><a href="javascript:" className="text-muted">Forgot Password</a></li>
          </ul>
        </div>
      </div>
      <hr/>
      <h6 className="text-muted" style={{marginTop:-10}}>
        <i className="fa fa-copyright" />&nbsp;
        Customero 2014
      </h6>
      <div className="text-muted" style={{float:'right',marginTop:-35}}>
        <h6>
        <a href="javascript:" className="text-muted">Facebook</a>&nbsp;&nbsp;&nbsp;
        <a href="javascript:" className="text-muted">Twitter</a>&nbsp;&nbsp;&nbsp;
        <a href="javascript:" className="text-muted">Linkedin</a>&nbsp;&nbsp;&nbsp;
      </h6>
      </div>
    </div>
    )
  },

  componentDidMount: function() {
    $('.footer a').addClass('text-muted')
    $('.footer h5').css({color:'#0084ff',fontWeight:'bold',fontSize:12})
  }
})
