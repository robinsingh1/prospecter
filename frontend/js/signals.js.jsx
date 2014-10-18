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

  prospectSignalReport: function(profile, report) {
    profiles = _.map(this.state.profiles, function(_profile) {
                  if(_profile.objectId == profile.objectId){
                    reports = _.map(_profile.reports, function(_report) {
                                if(_report.objectId == report.objectId){
                                  _report.prospected = true
                                  return _report
                                }
                                return _report
                              })
                    _profile.reports = reports
                    return _profile
                  }
                  return _profile
                })
                //console.log(profiles)
    this.setState({profiles: profiles})
    $.ajax({
      url:'https://api.parse.com/1/classes/SignalReport/'+report.objectId,
      type:'PUT',
      headers:appConfig.headers,
      data:JSON.stringify({prospected:moment().valueOf()/1000}),
      success: function(res) {},
      error: function(err) {}
    })
  },

  setCurrentView: function(newSignalView) {
    this.setState({currentView: newSignalView})
  },

  render: function() {
    currentProfile = this.state.currentProfile
    reports = this.state.currentProfile.reports
    reports = (reports) ? reports : []
    reports = _.sortBy(reports, function(o){ return o.createdAt }).reverse()
    //console.log(currentProfile)
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
                                    prospectSignalReport={this.prospectSignalReport}
                                     reports={reports}
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
      // Show Calendar Even When Signal Is Loading
      if(this.state.currentView == "Calendar"){
        signalView = <SignalCalendar currentProfile={this.state.currentProfile}
                                     setCurrentReport={this.setCurrentReport}
                                     reports={reports}
                                     setCurrentView={this.setCurrentView} />
      } else {
        signalView = <SignalLoading currentProfile={this.state.currentProfile}/>
      }
    }

   return (
      <div style={{height:400}}>
        <div className="container" style={{padding:0, width:'100%', height:'100%'}}>
          <div className="col-md-3 signal-list" 
               style={{ height:'102.8%', padding:0}}>
              <SignalsOptions profiles={this.state.profiles}
                              addProfile={this.addProfile}
                              updateMiningJobDone={this.updateMiningJobDone}
                              removeProfile={this.removeProfile}
                              setCurrentView={this.setCurrentView}
                              currentProfile={this.state.currentProfile}
                              setCurrentProfile={this.setCurrentProfile}/>
          </div>
          <div className="col-md-9" style={{height:'100%',padding:0}}>
            {signalView}
          </div>
        </div>

        <CreateMiningJobModal createMiningJob={this.createMiningJob}
                              currentProfile={this.state.currentProfile}/>
        <CreateHiringSignalModal addProfile={this.addProfile}/>
        <CreateFundingSignalModal addProfile={this.addProfile}/>
        <CreateCompanyProfileModal addProfile={this.addProfile}/>
        <CreateProspectProfileModal addProfile={this.addProfile} 
                      updateProfileWithObjectId={this.updateProfileWithObjectId}/>
      </div>
    )
  },

  createMiningJob: function(theProfile, date) {
    console.log('create mining job')
    var thiss = this;
    report = {
      //createdAt: moment().valueOf(),
      company_count: 0,
      people_count: 0,
      list_type:'mining_job',
      done: 0,
      mining_job: true,
    }

    profiles=_.map(this.state.profiles, function(profile) {
      if(_.isEqual(theProfile, profile)){
        if(profile.mining_days){
          profile.mining_days.push(date)
        }else{
          profile.mining_days = [date]
        }

        if(profile.reports){
          profile.reports = [report].concat(profile.reports)
        }else{
          profile.reports = [report]
        }
        
        thiss.setState({currentProfile: profile})
        thiss.persistMiningJob(date, report)
        return profile
      }
      return profile
    })
    thiss.setState({profiles: profiles})
  },

  persistMiningJob: function(date, report) {
    console.log(this.state)
    objectId = this.state.currentProfile.objectId
    $.ajax({
      url:'https://api.parse.com/1/classes/SignalReport',
      type:'POST',
      headers:appConfig.headers,
      data:JSON.stringify(report),
      success: function(res) {
        console.log(res)
        $.ajax({
          url:'https://api.parse.com/1/classes/ProspectProfile/'+objectId,
          type:'PUT',
          headers:appConfig.headers,
          data:JSON.stringify({
            mining_days: {
              __op:'AddUnique',
              objects:[date],
            },
            reports: {
              __op:'AddUnique',
              objects:[appConfig.pointer('SignalReport', res.objectId)]
            }
          }),
          success: function(res) { console.log(res) },
          error: function(err) {},
        })
      },
      error: function(err) {},
    })
  },

  addProfile: function(newProfile) {
    profiles = this.state.profiles
    this.setState({profiles: [newProfile].concat(profiles)})
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

  updateMiningJobDone: function(profile) {
    profiles = _.map(this.state.profiles, function(_profile) {
                  if(_profile.objectId == profile.objectId) {
                    _profile.done = true
                    return _profile
                  }
                  return _profile
                })
    this.setState({profiles: profiles})
  },

  updateProfileWithObjectId: function(timestamp, objectId) {
    console.log('UPDATE PROFILES')
    newProfiles = _.map(this.state.profiles, function(profile) {
        if(profile.timestamp == timestamp) {
          profile.objectId = objectId
          return profile
        }
      return profile
    })
    
    console.log(newProfiles)
    this.setState({profiles: newProfiles})
    console.log(objectId)

    var pusher = new Pusher('1a68a96c8fde938fa75a');
    console.log('new pusher channel ->', objectId)
    var channel = pusher.subscribe(objectId);
    var thiss = this;
    channel.bind("done", function(data) {
      thiss.updateMiningJobDone(_.findWhere(thiss.state.profiles, {timestamp: timestamp}))
      alertify.success("New Success notification");
    });
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
    qry = 'where={"company":'+company+',"user":'+user+'}'
    qry = qry+'&include=profiles,reports,prospect_list&order=-createdAt'
  
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
    this.props.setCurrentProfile(currentProfile)
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
    //console.log('signals render')
    for(i=0; i< this.props.profiles.length;i++) {
      select= this.props.profiles[i].objectId == this.props.currentProfile.objectId
      profs.push(<SignalProfile setCurrentProfile={this.setCurrentProfile} 
                                updateMiningJobDone={this.props.updateMiningJobDone}
                                setCurrentView={this.setCurrentView}
                                currentProfile={this.props.currentProfile}
                                selected={select}
                                removeProfile={this.removeProfile}
                                profile={this.props.profiles[i]} />)
    }

    profiles_num = (this.props.profiles.length) ? this.props.profiles.length : "~"
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
              <a href="javascript:"
                 onClick={this.launchModal}
                 style={{paddingLeft:5}}>
                 <h6 style={{margin:2}}>
                   <i className="fa fa-suitcase" style={{width:10}} />
                  &nbsp;&nbsp;Create Hiring Signal
                </h6>
              </a>
            </li>
            <li role="presentation" style={{display:'none'}}>
              <a href="javascript:"
                 onClick={this.launchModal}
                 style={{paddingLeft:5}}>
                <h6 style={{margin:2}}><i className="fa fa-institution"  style={{width:10}}/>
                  &nbsp;&nbsp;Create Funding Signal
                </h6>
              </a>
            </li>
            <li role="presentation">
              <a onClick={this.launchModal}
                 style={{paddingLeft:5,paddingRight:2}} 
                 href="javascript">
                <h6 style={{margin:2}}>
                  <i className="fa fa-user" style={{width:10}} />
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
    e.preventDefault()
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

  launchDropdown: function(e) {
    e.preventDefault()
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
