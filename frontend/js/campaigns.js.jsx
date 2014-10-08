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
            <th style={{textAlign:'center'}}>Delivered</th>
            <th style={{textAlign:'center'}}>Opened</th>
            <th style={{textAlign:'center',display:'none'}}>Replied</th>
            <th style={{textAlign:'center',display:'none'}}>Link Clicks</th>
            <th style={{textAlign:'center'}}>Bounces</th>
            <th style={{width:150,textAlign:'center'}}> </th>
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
    if(this.props.campaign.prospect_list.list_type == "signal_list")
        iconType = <i className="fa fa-wifi" style={{marginRight:5}}/>
    else if(this.props.campaign.prospect_list.list_type == "mining_job")
        iconType = <i className="fa fa-cloud-download" style={{marginRight:5}} />
    else 
        iconType =""
    return (
      <tr style={{cursor:'pointer'}} onClick={this.toggleScreen}>
        <td></td>
        <td> <h6>
            {this.props.campaign.name}
        </h6> </td>
        <td> <h6>
            {iconType}
            {this.props.campaign.prospect_list.name}
        </h6> </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="badge" style={{backgroundColor:'#f0ad4e'}}>
            <i className="fa fa-paper-plane" /> &nbsp;
            100%
          </span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-success">
            <i className="fa fa-eye" /> &nbsp;
            100%</span>
        </td>
        <td style={{textAlign:'center',padding:12,display:'none'}}>
          <span className="label label-primary">
            <i className="fa fa-mail-reply" /> &nbsp;
            100%</span>
        </td>
        <td style={{textAlign:'center',padding:12,display:'none'}}>
          <span className="label label-info">
            <i className="fa fa-external-link-square" /> &nbsp;
            18%</span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-default">
            <i className="fa fa-exclamation-circle" /> &nbsp;
            11%</span>
        </td>
        <td style={{textAlign:'center',paddingTop:12}}>
          <a href="javascript:" className="btn btn-primary btn-xs" 
            style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important;',display:'none'}}> 
            <i className="fa fa-copy" style={{fontWeight:'bold'}}/>&nbsp; Clone</a>
          <a href="javascript:" className="btn btn-primary btn-xs" 
            style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important',marginLeft:5}}> <i className="fa fa-trash" /></a>
        </td>
        <td style={{textAlign:'center',padding:12,display:'none'}}>
          <h4 style={{margin:0}}>
            <span className="label label-success">Ready</span>
          </h4>
        </td>
      </tr>
    )
  }
});
