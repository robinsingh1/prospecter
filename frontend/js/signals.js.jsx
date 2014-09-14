/** @jsx React.DOM */

var CreateSignalModal = require('./create_signal_modal.js.min.js')
var SignalProfile = require('./signal_profile.js.min.js')
var SignalCard = require('./signal_card.js.min.js')

module.exports = React.createClass({
  render: function() {
    // Signals
    /*
      - Feed
      - Research
      - Create Ideal People Profile
        - modal
      - Create Ideal Company Profile
        - modal
    */
   return (
      <div style={{height:400}}>
        <div className="container" style={{padding:0, width:'100%', height:'100%'}}>
          <div className="col-md-3" style={{borderRight:'1px solid #ddd',height:'100%',padding:0}}>
            <SignalsOptions />
          </div>
          <div className="col-md-9" style={{height:'100%',padding:0}}>
            <SignalDetailButtons />
            <SignalsFeed />
          </div>
        </div>
        <CreateSignalModal createSignal={this.createSignal}/>
      </div>
    )
  }
});

var SignalDetailButtons = React.createClass({
  render: function() {
    return (
      <div>
        <div id="prospectDetailButtons" style={{height:50}}>
          <div className="btn-group col-md-offset-4" >
            <a className="choose btn btn-primary" 
               style={{display:'block',padding:5}} 
               onClick={this.toggleScreen}> 
                <i className="fa fa-user" />&nbsp;People
            </a>
            <a className="choose btn btn-primary active" 
               style={{padding:5}}
               onClick={this.toggleScreen}> 
                <i className="fa fa-building" />&nbsp;Companies
            </a>
          </div>
        </div>
      </div>
    );
  }
});

var SignalsOptions = React.createClass({
  getInitialState: function() {
    return {
      profiles: []
    }
  },
  componentDidMount: function() {
    currentUser = JSON.parse(localStorage.currentUser)
    user = {
      '__type'    : 'Pointer',
      'className' : '_User',
      'objectId'  : currentUser.objectId
    }
    user = JSON.stringify(user)
    company = JSON.stringify(currentUser.company)
    qry = 'where={"company":'+company+',"user":'+user+'}&include=profiles'
  
    thisss = this
    $.ajax({
      url: 'https://api.parse.com/1/classes/ProspectProfile',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log('Prospect Profile')
        console.log(res.results)
        thisss.setState({profiles: res.results})
      },
      error: function(err) {
        console.log(err)
      }
    });
  },
  createSignal: function() {
    console.log('create signal')
  },
  render: function() {
    profs = []
    for(i=0; i< this.state.profiles.length;i++){
      profs.push(<SignalProfile profile={this.state.profiles[i]} />)
    }
    console.log(profs)
    return (
      <div className="list-group" >
        <li className="list-group-item" style={{borderLeft:0,height:44,paddingRight:5}}> 
          <h4 style={{margin:0,textAlign:'center',float:'left'}}>Profiles</h4> 
          <a href="javascript:" 
            data-toggle="modal"
            data-target=".bs-createSignal-modal-md"
            className="btn btn-xs btn-success" 
            style={{float:'right'}}>
            <i className="fa fa-plus" />&nbsp;
            Create Profile
          </a>
        </li>
        {profs}
      </div>
    );
  }
});

var SignalsFeed = React.createClass({
  getInitialState: function() {
    return {
      signals: []
    }
  },

  componentDidMount: function() {
    currentUser = JSON.parse(localStorage.currentUser)
    user = {
      '__type'    : 'Pointer',
      'className' : '_User',
      'objectId'  : currentUser.objectId
    }
    user = JSON.stringify(user)
    company = JSON.stringify(currentUser.company)
    qry = 'where={"company":'+company+',"user":'+user+'}&include=signals'
  
    thiss = this
    $.ajax({
      url: 'https://api.parse.com/1/classes/CompanySignal',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log(res.results)
        thiss.setState({signals: res.results})
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  render: function() {
    signalCards = []
    for(i=0;i< this.state.signals.length;i++) {
      signalCards.push(<SignalCard company={this.state.signals[i]}/>)
    }
    return (
      <div className="container signal-card-background" style={{height:350, overflow:'auto'}}>
        <div className="col-md-8 col-md-offset-2">
          {signalCards}
        </div>
      </div>
    );
  }
});
