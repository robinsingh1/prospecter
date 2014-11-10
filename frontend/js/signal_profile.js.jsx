/** @jsx React.DOM */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      reportCount:'~',
      companyCount: '~',
      peopleCount: '~'
    }
  },
  // SignalProfile
  setCurrentView: function(e) {
    if(!this.props.profile.mining_job)
      this.props.setCurrentView('Calendar')
    else
      this.props.setCurrentView('MiningJobCalendar')
    //e.stopPropagation()
  },

  calendarClick:function(e) {
    this.props.setCurrentProfile(this.props.profile)
    if(!this.props.profile.mining_job)
      this.props.setCurrentView('Calendar')
    else
      this.props.setCurrentView('MiningJobCalendar')
    e.stopPropagation()
  },

  setCurrentProfile: function() {
    this.props.setCurrentProfile(this.props.profile)
    if(this.props.profile.list_type == "territory")
      this.props.setCurrentView('TerritoryCalendar')
    else
      this.props.setCurrentView('Calendar')
  },

  removeTheProfile: function() {
    this.props.removeProfile(this.props.profile)
  },

  removeProfile: function() {
    thissss = this;
    console.log(thiss.removeTheProfile)

    swal({   
      title: "Are you sure?",   
      text: "Your will not be able to recover this prospect list!",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Yes, delete it!",   
      closeOnConfirm: false }, 
      function(){   
        swal("Deleted!", "Your prospect list has been deleted.", "success"); 
        thissss.removeTheProfile()
        console.log('deleted')
      });
  },

  //componentDidUpdate: function(prevProps, prevState) { },
  componentWillReceiveProps: function(nextProps) {
  //componentWillUpdate: function(nextProps) {
    if(typeof(this.props.profile.objectId) == "undefined") {
      console.log('RECEIVE PROPS')

      var pusher = new Pusher('1a68a96c8fde938fa75a');
      var thiss = this;
      console.log(nextProps)
      console.log(nextProps.profile)
      console.log(_.keys(nextProps.profile))
      console.log(nextProps.profile.objectId)
      objectId = nextProps.profile.objectId
      console.log('new pusher channel -> '+ objectId)

      var channel = pusher.subscribe(objectId);
      channel.bind("done", function(data) {
        console.log(data)
        console.log(thiss.props)
        //thiss.setState({ done: data.done_timestamp })
        thiss.props.updateMiningJobDone(thiss.props.profile)
        alertify.success("Success notification");
      });
    }
  },

  componentDidMount: function() {
    var pusher = new Pusher('1a68a96c8fde938fa75a');
    objectId = this.props.profile.objectId
    console.log('new pusher channel ->', objectId)
    var channel = pusher.subscribe(objectId);
    var thiss = this;
    channel.bind("done", function(data) {
      console.log(data)
      console.log(thiss.props)
      //thiss.setState({ done: data.done_timestamp })
      thiss.props.updateMiningJobDone(thiss.props.profile)
      alertify.success("Success notification");
    });

    var thiss = this;
    $.ajax({
      url:'https://api.parse.com/1/classes/PeopleSignal',
      headers: appConfig.headers,
      data: {where: JSON.stringify( {profile: appConfig.pointer('ProspectProfile',this.props.profile.objectId)}),
             count: true},
      success: function(res) { thiss.setState({peopleCount: res.count})},
      error: function(err) { }
    })
    $.ajax({
      url:'https://api.parse.com/1/classes/CompanySignal',
      headers: appConfig.headers,
      data: {where: JSON.stringify({profile:
             appConfig.pointer('ProspectProfile',this.props.profile.objectId)}),
             count: true},
      success: function(res) { thiss.setState({companyCount: res.count})},
      error: function(err) { }
    })
    $.ajax({
      url:'https://api.parse.com/1/classes/SignalReport',
      headers: appConfig.headers,
      data: {where: JSON.stringify({profile:
             appConfig.pointer('ProspectProfile',this.props.profile.objectId)}),
             count: true},
      success: function(res) { thiss.setState({reportCount: res.count})},
      error: function(err) { }
    })
  },

  render: function() {
    signalDetails = []
    for(i=0;i< this.props.profile.profiles.length; i++) {
      signalDetails.push(<ProfileType profile={this.props.profile.profiles[i]} />)
    }
    if(this.props.profile.list_type == "signal") 
      icon = <i className="fa fa-wifi" style={{marginRight:5}}/>
    else if(this.props.profile.list_type == "territory") 
      icon = <i className="fa fa-globe" style={{marginRight:5}}/>
    else
      icon = <i className="fa fa-cloud-download" style={{marginRight:5}} />

    loading = (!this.props.profile.done) ? <div className="profile-loading" >
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div> : ""
    
    if(this.props.profile.mining_job && this.props.profile.done)
      mining_job_done = <i className="fa fa-check-circle" style={{color:'#0096ff',marginLeft:5,fontSize:15}}/>
    else
      mining_job_done = ""

    selectedStyle = {paddingTop:5,borderLeft:0,paddingLeft:10, borderRight:'1px solid #ddd', borderLeft: '5px solid #0096ff !important'}
    regularStyle = {paddingTop:5,borderLeft:0,paddingLeft:10, borderRight:'1px solid #ddd', borderLeft: '5px solid red !important'}
    regularStyle = {paddingTop:5,borderLeft:0,paddingLeft:10, borderRight:'1px solid #ddd', borderLeft:'5px solid rgba(0,0,0,0)'}
    selected= this.props.profile.objectId == this.props.currentProfile.objectId
    itemStyle = (selected) ? selectedStyle : regularStyle
    itemClass = (selected) ? "list-group-item ideal-company-profile list-group-selected" : "list-group-item ideal-company-profile"


    signal_type = this.props.profile.signal_type
    return (
      <div className={itemClass}
           onClick={this.setCurrentProfile}
           style={regularStyle}>
        <span className="profile-title">
          <h6 className="label label-primary profile-name" 
              style={{backgroundColor:'rgb(0, 122, 265)'}}> 
            {icon} {this.props.profile.name}
          </h6>
          <h6 className="profile-name">
            <span className="label label-default">
              <i className="fa fa-calendar" /> {this.state.reportCount}
            </span> &nbsp;
            <span className="label label-default">
              <i className="fa fa-building"/> {this.state.companyCount} &nbsp;
              <i className="fa fa-user"/> {this.state.peopleCount}
            </span>
          </h6>
          {loading}{mining_job_done}
          <a href="javascript:" 
             className="btn btn-primary btn-xs signal-detail-btn"
             onClick={this.removeProfile}>
            <i className="fa fa-archive" /></a>
          <a href="javascript:" 
            style={{display:'none'}}
            className="btn btn-primary btn-xs signal-detail-btn">
            <i className="fa fa-cog" /></a>
          <a href="javascript:" className="btn btn-primary btn-xs signal-detail-btn"
             style={{display:'none'}}
             onClick={this.calendarClick}>
            <i className="fa fa-calendar" /></a>
          <a href="javascript:" 
             onClick={this.launchModal}
             style={(signal_type != "signal") ? {display:'block'}:{display:'none'}}
             className="btn btn-primary btn-xs signal-detail-btn">
            <i className="fa fa-cloud-download" /></a>
        </span>

        <div className="profile-body" style={{marginTop:5}}>
          {signalDetails}
        </div>
      </div>
    );
  },

  launchModal: function(e) {
    $('#createMiningJobModal').modal()
    this.props.setCurrentProfile(this.props.profile)
    if(this.props.currentView == 'Calendar')
      this.props.setCurrentView('Calendar')
    else if(this.props.currentView == 'Feed')
      this.props.setCurrentView('Feed')
    e.stopPropagation()
  }
});

var ProfileType = React.createClass({
  render: function() {

  if(this.props.profile){
    if(this.props.profile.className == "HiringProfile") {
      signalIcon = <i className="fa fa-suitcase" />
      signalName = "Hiring"
      signalValue = _.reduce(this.props.profile.roles, function(result, role) {
        return role + ", "+ result
      }, "");
      //console.log('wtf')
      //console.log(signalValue)
    } else if (this.props.profile.className  == "EmployeeProfile") {
      signalIcon = <i className="fa fa-users" />
      signalName = "Company Size"
      signalValue = _.reduce(this.props.profile.employees, function(result, role) {
        return role + ", "+ result
      }, "");
    } else if (this.props.profile.className  == "FundingProfile") {
      signalIcon = <i className="fa fa-institution" />
      signalName = "Funding"
      signalValue = _.reduce(this.props.profile.revenues, function(result, role) {
        return role + ", "+ result
      }, "");
    } else if (this.props.profile.className  == "RevenueProfile") {
      signalIcon = <i className="fa fa-money" />
      signalName = "Revenue"
      signalValue = _.reduce(this.props.profile.revenues, function(result, role) {
        return role + ", "+ result
      }, "");
    } else if (this.props.profile.className  == "TechnologyProfile") {
      signalIcon = <i className="fa fa-wrench" />
      signalName = "Technology"
    } else if (this.props.profile.className  == "LocationProfile") {
      signalIcon = <i className="fa fa-map-marker" />
      signalName = "Locale"
      signalValue = _.reduce(this.props.profile.locale, function(result, role) {
        return role + ", "+ result
      }, "");
    } else if (this.props.profile.className  == "IndustryProfile") {
      signalIcon = <i className="fa fa-building" />
      signalName = "Industries"
      signalValue = _.reduce(this.props.profile.industries, function(result, role) {
        return role + ", "+ result
      }, "");
    } else if (this.props.profile.className  == "TerritoryProfile") {
      console.log()
      signalIcon = <i className="fa fa-globe" />
      signalName = (this.props.profile.territories.length == 1) ? "Territory" : "Territories"
      signalValue = _.reduce(this.props.profile.territories, function(result, role) {
        return role + ", "+ result
      }, "");
    } else if (this.props.profile.className  == "CompanySizeProfile") {
      signalIcon = <i className="fa fa-wrench" />
      signalName = "Technology"
    } else if (this.props.profile.className  == "ListProfile") {
      signalIcon = <i className="fa fa-list-alt" />
      signalName = "Company List"
      signalValue = this.props.profile.listName
    } else if (this.props.profile.className  == "ProspectTitleProfile") {
      signalIcon = <i className="fa fa-user" />
      signalName = "Titles"
      signalValue = _.reduce(this.props.profile.title_keywords, 
     function(result, role) {
        return role + ", "+ result
      }, "");
    } else {
      signalIcon = "not found"
      signalName = "Not found"
      signalValue= "Not found"
    }
  } else {
      signalIcon = "not found"
      signalName = "Not found"
      signalValue= "Not found"

  }

    return (
      <span className="ideal-profile" > {signalIcon}
        <h6 className="profile-signal-name">{signalName} - </h6>
        <span className="profile-signal-value">{" "+signalValue}</span>
      </span>
    );
  }
});

/*
  Funding Profile
  - Amount Raised - btn group
  - Stage - btn group

  People Profile
  - Locale - tags w/ typahead
  - Title - tags w/ typahead

  Company Profile
  - Industries - tags with typahead
  - Revenue - btn group
  - # of Employees - btn group
  - Locale - tags with typahead
*/

