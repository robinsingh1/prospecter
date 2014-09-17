/** @jsx React.DOM */

module.exports = React.createClass({
  // Campaigns
  getInitialState: function() {
    return {
      selectedScreen: 'Overview',
      campaigns: []
    }
  },

  changeSelectedCampaign: function(campaign) {
    //this.props.toggleScreen('CampaignDetail')
    this.props.changeSelectedCampaign('CampaignDetail', campaign)
  },

  componentDidMount: function() {
    thiss = this;
     company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
     qry = 'where={"company":'+company+'}&include=prospect_list,followups,followups.template'
     $.ajax({
       url:'https://api.parse.com/1/classes/Campaign',
      headers: appConfig.headers,
      data: qry,
      success: function(res) {
        console.log(res.results)
        thiss.setState({campaigns: res.results})
        // TODO  - Add Get Prospect List Count
        // Follow Up Feed Feature
        // - Shows what stages different prospects are at and whether you 
        //   should send a follow up to them.
        // How to get the stage of Prospect List
        // - Where to persist last email sent
        // - What is stored at the campaign level
        // - What is stored at the prospect level
        // - Timeline (General 7 x 7 cadences)
        //   - 
        // - Rules (Sankey / Flow View)
        //   - Shows all or only the ones that havent responded 
        //   - Show all the ones hthat haven't replied
      },
      error: function(err) {
        console.log('error')
        console.log(err)
      }
     });
  },

  render: function() {
    campaigns = []
    for(i=0;i< this.state.campaigns.length; i++){ 
      campaigns.push(<CampaignRow 
                        toggleScreen={this.toggleScreen}
                        changeSelectedCampaign={this.changeSelectedCampaign}
                        campaign={this.state.campaigns[i]}/> )
    }
    return (
      <div>
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
