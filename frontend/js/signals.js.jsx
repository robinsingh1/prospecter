/** @jsx React.DOM */

var SignalProfile = require('./signal_profile.js.min.js')
var SignalLoading = require('./signal_loading.js.min.js')
var CompanySignalCard = require('./company_signal_card.js.min.js')
var PeopleSignalCard = require('./people_signal_card.js.min.js')
var SignalCalendar = require('./signal_calendar.js.min.js')
var MiningJobCalendar = require('./mining_job_calendar.js.min.js')
var SignalsDetail = require('./signal_detail.js.min.js')

var CreateHiringSignalModal = require('./create_hiring_signal_modal.js.min.js')
var CreateFundingSignalModal = require('./create_funding_signal_modal.js.min.js')
var CreateProspectProfileModal = require('./create_prospect_profile_modal.js.min.js')
var CreateCompanyProfileModal = require('./create_company_profile_modal.js.min.js')
var CreateMiningJobModal = require('./create_mining_job_modal.js.min.js')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      signalType: 'CompanySignal',
      currentProfile: {name:'All'},
      currentProfileObjectId: {},
      currentProfileReport: {},
      signals: [],
      currentView: 'Feed',
      profiles: [],
    }
  },

  setCurrentReport: function(newProfileReport) {
    console.log('NEW REPORT')
    console.log(newProfileReport)

    this.setState({ 
      currentView:'Detail',
      currentProfileReport: newProfileReport 
    })
  },

  setCurrentView: function(newSignalView) {
    this.setState({currentView: newSignalView})
  },

  render: function() {
    currentProfile = this.state.currentProfile
    if(currentProfile.name == "All" || currentProfile.done){
      if(this.state.currentView == "Feed") {
        signalView = <div>
            <SignalDetailButtons signalType={this.state.signalType} 
                                 currentProfile={this.state.currentProfile}
                                 setSignalType={this.setSignalType}/>
            <SignalsFeed setCurrentView={this.setCurrentView}
                         signalType={this.state.signalType} 
                         profile={this.state.currentProfile}
                         signals={this.state.signals}/>
            </div>
      } else if(this.state.currentView == "Calendar"){
        signalView = <SignalCalendar currentProfile={this.state.currentProfile}
                                     setCurrentReport={this.setCurrentReport}
                                     setCurrentView={this.setCurrentView} />
      } else if(this.state.currentView == "Detail"){
        signalView = <SignalsDetail currentProfile={this.state.currentProfile}
                                    currentProfileReport={this.state.currentProfileReport}
                                    setCurrentView={this.setCurrentView}/>
      } else if(this.state.currentView == "MiningJobCalendar"){
        signalView = <MiningJobCalendar currentProfile={this.state.currentProfile}
                                        setCurrentReport={this.setCurrentReport}
                                        setCurrentView={this.setCurrentView}/>
      }
    } else {
      signalView = <SignalLoading currentProfile={this.state.currentProfile}/>
    }

   return (
      <div style={{height:400}}>
        <div className="container" style={{padding:0, width:'100%', height:'100%'}}>
          <div className="col-md-3 signal-list" 
               style={{ height:'102.8%', padding:0}}>
            <SignalsOptions profiles={this.state.profiles}
                            addProfile={this.addProfile}
                            removeProfile={this.removeProfile}
                            setCurrentView={this.setCurrentView}
                            setCurrentProfile={this.setCurrentProfile}/>
          </div>
          <div className="col-md-9" style={{height:'100%',padding:0}}>
            {signalView}
          </div>
        </div>

        <CreateMiningJobModal />
        <CreateHiringSignalModal addProfile={this.addProfile}/>
        <CreateFundingSignalModal addProfile={this.addProfile}/>
        <CreateCompanyProfileModal addProfile={this.addProfile}/>
        <CreateProspectProfileModal addProfile={this.addProfile} updateProfileWithObjectId={this.updateProfileWithObjectId}/>
      </div>
    )
  },

  addProfile: function(newProfile) {
    profiles = this.state.profiles
    this.setState({profiles: [newProfile].concat(profiles)})
    // Set Current Profile 
    this.setCurrentProfile(newProfile)
  },

  removeProfile: function(oldProfile) {
    this.setState({profiles: _.reject(this.state.profiles, function(profile) {
      return _.isEqual(oldProfile, profile)
    })})

    if(oldProfile.objectId){
      $.ajax({
        url:'https://api.parse.com/1/classes/ProspectProfile/'+oldProfile.objectId,
        headers:appConfig.headers,
        type:'DELETE',
      })
    }
  },

  updateProfileWithObjectId: function(oldProfile, objectId) {
    // find where profile == profile
    // replace element
    profiles = this.state.profiles
    count = 0
    console.log('UPDATE PROFILES')

    newProfiles = _.map(profiles, function(profile) {
      profile = _.omit(profile, ['mining_job_list','profiles'])
      oldProfile = _.omit(oldProfile, 'profiles')

      console.log(_.isEqual(_.omit(profile, ['mining_job_list','profiles']),
                            _.omit(oldProfile,'profiles')))
      if(_.isEqual(profile, oldProfile)) {
        profile.objectId = objectId
        return profile
      }
      return profile
    })
    console.log(newProfiles)

    currentProfile = _.omit(this.state.currentProfile,['mining_job_list','profiles'])
    if(_.isEqual(currentProfile, oldProfile)) {
      currentProfile = this.state.currentProfile
      currentProfile.objectId = objectId
      this.setState({currentProfile: currentProfile})
    }
    this.setState({profiles: newProfiles})
  },

  setCurrentProfile: function(newProfile) {
    if(newProfile.only_people) {
      this.getSignals('PeopleSignal', 
                      JSON.stringify({
                         __type: 'Pointer',
                         className: 'ProspectProfile', 
                         objectId: newProfile.objectId}))
      this.setState({
        signalType: 'PeopleSignal',
        currentProfile: newProfile 
      })
    } else {
      this.setState({currentProfile: newProfile })
    }

    this.getSignals('PeopleSignal', newProfile)
  },

  componentDidMount: function() {
    this.getSignals(this.state.signalType)
    currentUser = JSON.parse(localStorage.currentUser)
    user = JSON.stringify(appConfig.pointer('_User', currentUser.objectId))
    company = JSON.stringify(currentUser.company)
    qry = 'where={"company":'+company+',"user":'+user+'}&include=profiles,prospect_list&order=-createdAt'
  
    thisss = this
    $.ajax({
      url: 'https://api.parse.com/1/classes/ProspectProfile',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log('Prospect Profile')
        console.log(res.results)
        //thisss.setCurrentProfile(res.results[0])
        thisss.setState({profiles: res.results})
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  setSignalType: function(labelText) {
    if(labelText == "People")
      currentSignal = "PeopleSignal"
    else if(labelText == "Companies")
      currentSignal = "CompanySignal"
    this.getSignals(currentSignal)
    this.setState({signalType: currentSignal})
  },

  componentDidUpdate: function(nextProps, nextState) {
  },

  getSignals: function(signalType, currentProfile) {
    currentUser = JSON.parse(localStorage.currentUser)
    user = {
      '__type'    : 'Pointer',
      'className' : '_User',
      'objectId'  : currentUser.objectId
    }

    user = JSON.stringify(user)
    company = JSON.stringify(currentUser.company)
    profiles = this.state.currentProfile.profiles

    if(profiles){
      //qry = 'where={"company":'+company+',"user":'+user+',"profile":'+currentProfile+'}'
      profile = JSON.stringify({
        __type:'Pointer',
        className:'ProspectProfile',
        objectId:currentProfile.objectId
      })
      qry = 'where={"profile":'+profile+'}'
      //qry = qry + ',"profiles":{"$all":'+JSON.stringify(profiles)+'}}'
      if(signalType == 'PeopleSignal')
        qry = qry + '&include=signals'
      else
        qry = qry + '&include=signals,company'

    } else {
      qry = {'include':['signals','company']}
    }
  
    thiss = this
    $.ajax({
      url: 'https://api.parse.com/1/classes/'+signalType,
      //url: 'https://api.parse.com/1/classes/CompanySignal',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        //console.log(res.results)
        thiss.setState({signals: res.results})
      },
      error: function(err) { console.log(err) }
    });
  },
});

var SignalDetailButtons = React.createClass({
  setSignalType: function(e) {
    this.props.setSignalType($(e.target).text().trim())
  },

  render: function() {
    ppl = (this.props.signalType == "PeopleSignal") ? "choose btn btn-primary app-active" : "choose btn btn-primary"
    cmp = (this.props.signalType == "CompanySignal") ? "choose btn btn-primary app-active" : "choose btn btn-primary"

    cmp = (this.props.currentProfile.only_people)  ? cmp + " disabled" : cmp

    return (
      <div>
        <div id="signalDetailButtons" style={{height:44}}>
          <h4 style={{display:'inline-block',float:'left',width:300,
                      fontWeight:200,marginTop:4,paddingLeft:20}}>
            <i className="fa fa-newspaper-o" />&nbsp; 
            {this.props.currentProfile.name}
          </h4>
          <div className="btn-group" style={{marginLeft:'0%'}}>
            <a className={ppl}
               style={{padding:2}} 
               onClick={this.setSignalType}> 
                <i className="fa fa-user" />&nbsp;People
            </a>
            <a className={cmp}
               style={{padding:2}}
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
  addProfile: function(newProfile) {
    this.props.addProfile(newProfile)
  },

  setCurrentProfile: function(currentProfile) {
    // Set Current Profile
    this.props.setCurrentProfile(currentProfile)
    // Update Request To New Profile
  },

  removeProfile: function(oldProfile) {
    this.props.removeProfile(oldProfile)
  },

  componentDidMount: function() {
  },

  setCurrentView: function(newView) {
    console.log(newView)
    this.props.setCurrentView(newView)
  },

  render: function() {
    profs = []
    for(i=0; i< this.props.profiles.length;i++) {
      profs.push(<SignalProfile setCurrentProfile={this.setCurrentProfile} 
                                setCurrentView={this.setCurrentView}
                                removeProfile={this.removeProfile}
                                profile={this.props.profiles[i]} />)
    }

    profiles_num = (this.props.profiles.length) ? this.props.profiles.length : "~"
    /* border-left: 5px solid #0096ff !important; for selected profile */
    return (
      <div>
      <div className="list-group" >
        <li className="list-group-item" 
            style={{borderTop:0,borderLeft:0,height:44,paddingRight:5,paddingLeft:10,
                    backgroundColor:'#e0e6ea',
                    backgroundImage:'linear-gradient(#f5f7f8,#e0e6ea);'}}>
            <h4 style={{margin:0,textAlign:'center',fontWeight:200,
                        float:'left',marginTop:2}}>Profiles ({profiles_num})</h4> 
          <a href="javascript:" 
             className="btn btn-xs btn-primary create-profile-dropdown" 
             data-toggle="dropdown"
             onClick={this.launchDropdown}
             style={{float:'right',
              backgroundImage:'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}>
            <i className="fa fa-plus" />&nbsp; Create Profile
          </a>

          <ul className="dropdown-menu" 
              style={{marginLeft:175,marginTop:-10}}
              role="menu" aria-labelledby="dropdownMenu1">
            <li role="presentation">
              <a role="menuitem" tabindex="-1" 
                 onClick={this.launchModal}
                 style={{paddingLeft:5}} href="#">
                 <h6 style={{margin:2}}>
                   <i className="fa fa-suitcase" style={{width:10}} />
                  &nbsp;&nbsp;Create Hiring Signal
                </h6>
              </a>
            </li>
            <li role="presentation" style={{display:'none'}}>
              <a role="menuitem" tabindex="-1" 
                 onClick={this.launchModal}
                 style={{paddingLeft:5}} href="#">
                <h6 style={{margin:2}}><i className="fa fa-institution"  style={{width:10}}/>
                  &nbsp;&nbsp;Create Funding Signal
                </h6>
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" tabindex="-1" 
                 onClick={this.launchModal}
                 style={{paddingLeft:5,paddingRight:2}} href="#">
                <h6 style={{margin:2}}><i className="fa fa-user" style={{width:10}} />
                  &nbsp;&nbsp;Create Prospect Profile
                </h6>
              </a>
            </li>
            <li role="presentation" style={{display:'none'}}>
              <a role="menuitem" tabindex="-1" 
                 onClick={this.launchModal}
                 style={{paddingLeft:5,paddingRight:2}} href="#">
                 <h6 style={{margin:2}}>
                   <i className="fa fa-building" style={{width:10}}/>
                   &nbsp;&nbsp;Create Company Profile
                 </h6>
              </a>
            </li>
          </ul>
        </li>
        <div id="profiles-menu" style={{height:356, overflow:'auto',marginTop:1}}>
          {profs}
        </div>
      </div>
    </div>
    );
  },

  launchModal: function(e) {
    console.log($(e.target).text().trim())
    if($(e.target).text().trim() == 'Create Hiring Signal')
      $('#createHiringSignalModal').modal()
    else if($(e.target).text().trim() == 'Create Funding Signal')
      $('#createFundingSignalModal').modal()
    else if($(e.target).text().trim() == 'Create Prospect Profile')
      $('#createProspectProfileModal').modal()
    else if($(e.target).text().trim() == 'Create Company Profile')
      $('#createCompanyProfileModal').modal()
  },

  launchDropdown: function() {
    $('.create-profile-dropdown').dropdown()
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

    signalCards = []
    for(i=0;i< this.props.signals.length;i++) {
      if(this.props.signalType == "CompanySignal")
        signalCards.push(<CompanySignalCard company={this.props.signals[i]}/>)
      else if(this.props.signalType == "PeopleSignal")
        signalCards.push(<PeopleSignalCard profile={this.props.profile} person={this.props.signals[i]}/>)
    }
    return (
      <div className="container signal-card-background" style={{height:356, overflow:'auto'}}>
        <div className="col-md-8 col-md-offset-2">
          {signalCards}
        </div>
      </div>
    );
  }
});
