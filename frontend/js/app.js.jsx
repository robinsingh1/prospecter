/** @jsx React.DOM */

/* TODO
 * 
 * - All count change, when prospect is archived
 * - When is list is chaanged from all and then returned to All prospects take a long     time to load
 * - Fix pagination issues
 *
 * - Parallelize Workers
 * - Scale up google scrape to hundreds of workers (heroku)
 *
 * - Company Shortcuts 
 * - Add ability to switch accounts for admins
 * - Add email uneditable email fields
 */

var Prospects = require('./prospects.js.min.js');
var CompanyProspects = require('./company_prospects.js.min.js');
var MiningJob = require('./mining_job.js.min.js');
var Campaigns = require('./email.js.min.js');
var Analytics = require('./analytics.js.min.js');
var SignUp = require('./signup.js.min.js');
var Login = require('./login.js.min.js');
var LandingPage = require('./landing_page.js.min.js');
var LandingPage = require('./landing_page_concept.js.min.js');
var FreeTrial = require('./free_trial.js.min.js');
var Pricing = require('./pricing.js.min.js');
var Signals = require('./signals.js.min.js');
var MouseTrap = require('../lib/mousetrap.min.min.js')
//var checkAuth = require('./auth.min.js')

var Home = React.createClass({
  componentWillMount: function(){
    checkAuth()
  },

  getInitialState: function() {
    // num_of_pages
    return {prospects: [] , 
            currentPage: 1, 
            pages: 1, 
            count:"~", 
            prospectType:'Prospect', 
            selectedScreen: 'Prospects'}
  },

  toggleScreen: function(e) {
    e.preventDefault()
    this.setState({selectedScreen : $(e.target).text().trim()})
  },

  logout: function() {
    localStorage.clear()
    location.href = "#get_started"
  },

  listDropdown: function() {
    console.log('dropdown')
    //$('.dropdown-menu').dropdown()
    $('.prospect-list-select').css('border-bottom-right-radius','0px')
    $('.prospect-list-select').css('border-bottom-left-radius','0px')
      
    $('.list-select-dropdown').css('border-top-left-radius','0px')
    $('.list-select-dropdown').css('border-top-right-radius','0px')
  },

  selectChange : function() {

  },

  stripeCheckout: function() {
    handler.open({
      name: 'Customero',
      description: 'Get 900 free email credits!',
      amount: 0,
      panelLabel: "Start Your Free Trial!",
      opened: function() {
      },
      closed: function() {
        console.log("closed")
        location.reload()
      }
    });
  },

  componentDidMount: function() {
    // Credit Card Verified Check
    localStorage.selectedProspects = "[]"
    currentUser = JSON.parse(localStorage.currentUser)
    if(!currentUser.creditCardVerified)
      this.stripeCheckout()

    /*
     * Make Request To Get Most Up to Date Info
     * On Success Add To Intercom
    */

    /*
    $.ajax({
      url:''
      success: function(res) {
        // Number of Prospects for user
        // Number of Lists
        // Number of Emails found
        Intercom('boot', {
          app_id: 'abc12345',
          email: 'john.doe@example.com',
          created_at: 1234567890,
          name: 'John Doe',
          user_id: '9876'
        });
      },
      error: function(err) {
      }
    });
    */
    // Intercom
    // Mixpanel
  },

  render: function() {
    switch (this.state.selectedScreen) {
      case 'Prospects':
        currentScreen = <Prospects prospectType={this.state.selectedScreen} />
        break;
      case 'Companies':
        currentScreen = <CompanyProspects prospectType={this.state.selectedScreen} />
        break;
      case 'Mining Jobs':
        currentScreen = <MiningJob />
        break;
      case 'Analytics':
        currentScreen = <Analytics />
        break;
      case 'Campaigns':
        currentScreen = <Campaigns />
        break;
      case 'Signals':
        currentScreen = <Signals />
        break;
      case 'Settings':
        currentScreen = <Settings />
        break;
    }

    return (
      <div>
      <br/>
      <br/>
      <div className="container">
      <h1 style={{fontWeight:'bold',display:'inline',fontWeight:'100',color:'#1ca3fd'}}>Customero </h1>
      <span style={{float:'right'}}>
        <img src="build/img/user.png" style={{height:'40px',width:'40px',padding:'2px',marginTop:'5px',borderRadius:'23px',display:'inline'}} className="thumbnail"/>&nbsp;&nbsp;&nbsp; 
        <h6 style={{marginTop:'20px',float:'right',display:'inline'}}>Welcome</h6>
      </span>
      <span style={{float:'right', marginRight:'150px'}}>
        <h6 style={{marginTop:'20px',float:'right',display:'inline',}}><a href="javascript:" onClick={this.logout}>Logout</a></h6>
        <h6 style={{marginTop:'20px',float:'right',display:'inline',marginRight:'10px'}}><a href="#pricing">Pricing</a></h6>
        <h6 style={{marginTop:'20px',float:'right',display:'inline',display:'none', marginRight:'10px'}}><a href="#pricing">Documentation</a></h6>
      </span>
      <br/>
      <br/>
        <div className="panel panel-default">
        <div id="navbar" className="panel-heading"> 

          <div className="btn-group col-md-offset-4" >
            <a className="choose btn btn-primary " style={{display:'block'}} onClick={this.toggleScreen}> 
                <i className="fa fa-wifi" />&nbsp;Signals
            </a>
            <a className="choose btn btn-primary active" onClick={this.toggleScreen}> 
                <i className="fa fa-user" />&nbsp;Prospects
            </a>
            <a className="choose btn btn-primary" style={{display:'none'}} onClick={this.toggleScreen}>
                <i className="fa fa-bar-chart-o" /> Analytics
            </a>
            <a className="choose btn btn-primary" 
                  style={{width:162,display:'none'}}
                  onClick={this.toggleScreen}>
                <i className="fa fa-tasks" /> Mining Jobs &nbsp;
                <span className="label label-default">BETA</span>
            </a>
            <a className="choose btn btn-primary" onClick={this.toggleScreen}>
                <i className="fa fa-building" /> Companies
            </a>
            <a className="choose btn btn-primary" style={{display:'block'}} onClick={this.toggleScreen}>
                <i className="fa fa-envelope" />&nbsp;Campaigns
            </a>
          </div>
          <a href="javascript:" 
            style={{marginTop:7, float:'right'}}
            className="btn btn-success btn-sm"
            onClick={this.downloadSocialProspecter}> 
            Download Social Prospecter
          </a>
        </div>

          {currentScreen}

        </div>
      </div>
      </div>
    );
  },
  
  downloadSocialProspecter: function() {
    //chrome.webstore.install('https://chrome.google.com/webstore/detail/ofcalkjbogaiipekcocdefjenclioeci')
    chrome.webstore.install()
    console.log('download')
  },

  /*
          <a href="#" className="btn btn-success" onClick={this.downloadFile}
                  style={{float:'right',marginTop:'6px'}}>
            <i className="fa fa-download" />&nbsp;&nbsp;
            <h5 style={{display:'inline'}} >Download CSV</h5>
          </a>
  */

  deleteProspect: function(objectId, endpoint) {
    var filtered = _.filter(this.state.prospects, function(item) {
       return item.objectId != objectId
    });
    this.setState({prospects: filtered})

    $.ajax({
      url:'https://api.parse.com/1/classes/'+endpoint+'/'+objectId,
      type:'DELETE',
      headers: parse_headers,
      success: function(res) {
        console.log(res)
      },
      error: function(err) {
      }
    });
  }
});


var Workspace = Backbone.Router.extend({
  routes: {
    //landing_page
    ""            : "home",
    "get_started" : "landing_page",
    "free_trial"  : "free_trial",
    "signup"      : "signup",
    "login"       : "login",
    "pricing"     : "pricing",
  },
  home: function() {
    currentUser = localStorage.getItem('currentUser')
    if (currentUser) 
      React.renderComponent(Home(), document.getElementById('content'));
    else
      location.href = "#get_started"
  },
  landing_page: function() {
    React.renderComponent(LandingPage(), document.getElementById('content'));
  },
  free_trial: function() {
    React.renderComponent(FreeTrial(), document.getElementById('content'));
  },

  signup: function() {
    React.renderComponent(SignUp(), document.getElementById('content'));
  },
  login: function() {
    React.renderComponent(Login(), document.getElementById('content'));
  },
  pricing: function() {
    React.renderComponent(Pricing(), document.getElementById('content'));
  }
});

$(document).ready(function(){
  checkAuth()
  var workspace = new Workspace;
  Backbone.history.start();
});
/*
          <div className="dropdown" style={{display:'block',float:'left'}}>
            <a data-toggle="dropdown" onClick={this.listDropdown} className="prospect-list-select" href="javascript:">Default&nbsp;&nbsp;&nbsp;<i className="fa fa-chevron-circle-down" /></a>
              <ul className="list-select-dropdown dropdown-menu" role="menu" aria-labelledby="dLabel" style={{marginTop:'-1px'}}>
                <li>LOL</li>
                <li>LMAO</li>
                <li>LMFAO</li>
              </ul>
          </div>
*/
