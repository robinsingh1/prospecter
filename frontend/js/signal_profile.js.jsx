/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    signalDetails = []
    for(i=0;i< this.props.profile.profiles.length; i++) {
      signalDetails.push(<ProfileType profile={this.props.profile.profiles[i]} />)
    }
    return (
      <div className="list-group-item ideal-company-profile"
        style={{paddingTop:5}}>
        <span className="profile-title">
          <h6 className="label label-default"> {this.props.profile.name}</h6>
          <a href="javascript:" className="btn btn-default btn-xs"
            style={{float:'right'}}>
            <i className="fa fa-trash-o" /></a>
          <a href="javascript:" className="btn btn-default btn-xs"
            style={{float:'right',marginRight:5}}>
            <i className="fa fa-cog" /></a>
        </span>

        <div className="profile-body" style={{marginTop:5}}>
          {signalDetails}
        </div>
        
      </div>
    );
  }
});

var ProfileType = React.createClass({
  render: function() {
    //console.log(this.props.profile)
    //console.log(this.props.profile.className)
    if(this.props.profile.className == "HiringProfile") {
      signalIcon = <i className="fa fa-suitcase" />
      signalName = "Hiring"
      signalValue = this.props.profile.job_title
    } else if (this.props.profile.className  == "CompanySizeProfile") {
      signalIcon = <i className="fa fa-users" />
      signalName = "Company Size"
    } else if (this.props.profile.className  == "FundingProfile") {
      signalIcon = <i className="fa fa-institutions" />
      signalName = "Funding"
    } else if (this.props.profile.className  == "RevenueProfile") {
      signalIcon = <i className="fa fa-money" />
      signalName = "Revenue"
    } else if (this.props.profile.className  == "TechnologyProfile") {
      signalIcon = <i className="fa fa-wrench" />
      signalName = "Technology"
    }else{
      signalIcon = "not found"
      signalName = "Not found"
      signalValue= "Not found"
    }

    return (
      <span className="ideal-profile">
        {signalIcon}
        <h6 className="profile-signal-name">{signalName} - </h6>
        <span className="profile-signal-value">{signalValue}</span>
      </span>
    );
  }
});
