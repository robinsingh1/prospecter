/** @jsx React.DOM */

module.exports = React.createClass({
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
    this.props.setCurrentView('Feed')
  },

  removeProfile: function() {
    if (confirm("Press a button!") == true) {
      this.props.removeProfile(this.props.profile)
    } else {
      x = "You pressed Cancel!";
    }
  },

  render: function() {
    //console.log(this.props.profile)
    signalDetails = []
    for(i=0;i< this.props.profile.profiles.length; i++) {
      signalDetails.push(<ProfileType profile={this.props.profile.profiles[i]} />)
    }
    if(!this.props.profile.mining_job) 
      icon = <i className="fa fa-wifi" style={{marginRight:5}}/>
    else
      icon = <i className="fa fa-cloud-download" style={{marginRight:5}} />
    return (
      <div className="list-group-item ideal-company-profile"
           onClick={this.setCurrentProfile}
           style={{paddingTop:5,borderLeft:0,paddingLeft:10,
                   borderRight:'1px solid #ddd'}}>
        <span className="profile-title">
          <h6 className="label label-default profile-name"> 
            {icon}    
            {this.props.profile.name}
          </h6>
          <a href="javascript:" 
             className="btn btn-primary btn-xs signal-detail-btn"
             onClick={this.removeProfile}>
            <i className="fa fa-trash" /></a>
          <a href="javascript:" 
            style={{display:'none'}}
            className="btn btn-primary btn-xs signal-detail-btn">
            <i className="fa fa-cog" /></a>
          <a href="javascript:" className="btn btn-primary btn-xs signal-detail-btn"
             onClick={this.calendarClick}>
            <i className="fa fa-calendar" /></a>
          <a href="javascript:" 
             onClick={this.launchModal}
             style={(this.props.profile.mining_job) ? {display:'none'}:{display:'block'}}
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
    e.stopPropogation()
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
    } else if (this.props.profile.className  == "CompanySizeProfile") {
      signalIcon = <i className="fa fa-wrench" />
      signalName = "Technology"
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

