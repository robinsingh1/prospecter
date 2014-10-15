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

  render: function() {

    signalDetails = []
    for(i=0;i< this.props.profile.profiles.length; i++) {
      signalDetails.push(<ProfileType profile={this.props.profile.profiles[i]} />)
    }
    if(!this.props.profile.mining_job) 
      icon = <i className="fa fa-wifi" style={{marginRight:5}}/>
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


    return (
      <div className={itemClass}
           onClick={this.setCurrentProfile}
           style={regularStyle}>
        <span className="profile-title">
          <h6 className="label label-default profile-name"> 
            {icon}    
            {this.props.profile.name}
          </h6>
          {loading}{mining_job_done}
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
    } else if (this.props.profile.className  == "CompanySizeProfile") {
      signalIcon = <i className="fa fa-wrench" />
      signalName = "Technology"
    } else if (this.props.profile.className  == "ListProfile") {
      signalIcon = <i className="fa fa-list-alt" />
      signalName = "lists"
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

