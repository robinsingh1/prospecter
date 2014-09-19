/** @jsx React.DOM */

var CreateSignalModal = require('./create_signal_modal.js.min.js')
var SignalProfile = require('./signal_profile.js.min.js')
var CompanySignalCard = require('./company_signal_card.js.min.js')
var PeopleSignalCard = require('./people_signal_card.js.min.js')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      signalType: 'CompanySignal',
      currentProfile: '',
      signals: [],
    }
  },
  render: function() {
   return (
      <div style={{height:400}}>
        <div className="container" style={{padding:0, width:'100%', height:'100%'}}>
          <div className="col-md-3" style={{borderRight:'1px solid #ddd',height:'100%',padding:0}}>
            <SignalsOptions setCurrentProfile={this.setCurrentProfile}/>
          </div>
          <div className="col-md-9" style={{height:'100%',padding:0}}>
            <SignalDetailButtons signalType={this.state.signalType} 
                                 setSignalType={this.setSignalType}/>
           <SignalsFeed signalType={this.state.signalType} 
                        profile={this.state.currentProfile}
                        signals={this.state.signals}/>
          </div>
        </div>
        <CreateSignalModal createSignal={this.createSignal}/>
      </div>
    )
  },

  setCurrentProfile: function(currentProfile) {
    this.setState({currentProfile: currentProfile })
  },

  componentDidMount: function() {
    this.getSignals(this.state.signalType)
  },

  setSignalType: function(labelText) {
    if(labelText == "People")
      currentSignal = "PeopleSignal"
    else if(labelText == "Companies")
      currentSignal = "CompanySignal"
    this.getSignals(currentSignal)
    this.setState({signalType: currentSignal})
  },

  getSignals: function(signalType) {
    currentUser = JSON.parse(localStorage.currentUser)
    user = {
      '__type'    : 'Pointer',
      'className' : '_User',
      'objectId'  : currentUser.objectId
    }
    user = JSON.stringify(user)
    company = JSON.stringify(currentUser.company)
    qry = 'where={"company":'+company+',"user":'+user+'}&include=signals'
    qry = '&include=signals,company'
  
    thiss = this
    $.ajax({
      url: 'https://api.parse.com/1/classes/'+signalType,
      //url: 'https://api.parse.com/1/classes/CompanySignal',
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
});

var SignalDetailButtons = React.createClass({
  setSignalType: function(e) {
    this.props.setSignalType($(e.target).text().trim())
  },

  render: function() {
    ppl = (this.props.signalType == "PeopleSignal") ? "choose btn btn-primary active" : "choose btn btn-primary"
    cmp = (this.props.signalType == "CompanySignal") ? "choose btn btn-primary active" : "choose btn btn-primary"
    return (
      <div>
        <div id="prospectDetailButtons" style={{height:50}}>
          <div className="btn-group col-md-offset-4" >
            <a className={ppl}
               style={{display:'block',padding:5}} 
               onClick={this.setSignalType}> 
                <i className="fa fa-user" />&nbsp;People
            </a>
            <a className={cmp}
               style={{padding:5}}
               onClick={this.setSignalType}> 
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

  setCurrentProfile: function(currentProfile) {
    // Set Current Profile
    this.props.setCurrentProfile(currentProfile)
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
    qry = 'where={"company":'+company+',"user":'+user+'}&include=profiles,prospect_list'
  
    thisss = this
    $.ajax({
      url: 'https://api.parse.com/1/classes/ProspectProfile',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log('Prospect Profile')
        console.log(res.results)
        thisss.setCurrentProfile(res.results[0])
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
    for(i=0; i< this.state.profiles.length;i++) {
      profs.push(<SignalProfile setCurrentProfile={this.setCurrentProfile} 
                                profile={this.state.profiles[i]} />)
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

  render: function() {
    //this.getSignals()
    console.log('render is being called')

    signalCards = []
    for(i=0;i< this.props.signals.length;i++) {
      if(this.props.signalType == "CompanySignal")
        signalCards.push(<CompanySignalCard company={this.props.signals[i]}/>)
      else if(this.props.signalType == "PeopleSignal")
        signalCards.push(<PeopleSignalCard profile={this.props.profile} person={this.props.signals[i]}/>)
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
