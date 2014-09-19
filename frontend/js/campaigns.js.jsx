/** @jsx React.DOM */

module.exports = React.createClass({
  // Campaigns
  getInitialState: function() {
    return {
      selectedScreen: 'Overview',
    }
  },

  changeSelectedCampaign: function(campaign) {
    //this.props.toggleScreen('CampaignDetail')
    this.props.changeSelectedCampaign('CampaignDetail', campaign)
  },

  render: function() {
    campaigns = []
    console.log(this.props)
    for(i=0;i< this.props.campaigns.length; i++){ 
      campaigns.push(<CampaignRow 
                        toggleScreen={this.toggleScreen}
                        changeSelectedCampaign={this.changeSelectedCampaign}
                        campaign={this.props.campaigns[i]}/> )
    }
    return (
      <div style={{overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Campaign Name</th>
            <th>Prospect List</th>
            <th style={{textAlign:'center'}}>Opened</th>
            <th style={{textAlign:'center'}}>Replied</th>
            <th style={{textAlign:'center'}}>Link Clicks</th>
            <th style={{textAlign:'center'}}>Bounces</th>
            <th style={{width:150,textAlign:'center'}}>
              Status
            </th>
          </thead>
          <tbody>
            {campaigns}
          </tbody>
        </table>
      </div>
    );
  }
});

var CampaignRow = React.createClass({
  toggleScreen: function() {
    //this.props.toggleScreen()
    this.props.changeSelectedCampaign(this.props.campaign)
  },

  render: function() {
    return (
      <tr style={{cursor:'pointer'}} onClick={this.toggleScreen}>
        <td></td>
        <td> <h6>
            {this.props.campaign.name}
        </h6> </td>
        <td> <h6>
            {(this.props.campaign.prospect_list.signal_list) ? <i className="fa fa-wifi" style={{marginRight:5}}/> : ""}
            {this.props.campaign.prospect_list.name}
        </h6> </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-success">100%</span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-info">100%</span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-primary">18%</span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-danger">11%</span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <h4 style={{margin:0}}>
            <span className="label label-success">Ready</span>
          </h4>
        </td>
      </tr>
    )
  }
});
