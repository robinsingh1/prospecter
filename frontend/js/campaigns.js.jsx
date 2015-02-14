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
                        deleteCampaign={this.props.deleteCampaign}
                        changeSelectedCampaign={this.changeSelectedCampaign}
                        campaign={this.props.campaigns[i]}/> )
    }
    return (
      <div style={{overflow:'auto',height:550}}>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Campaign Name</th>
            <th>Prospect List</th>
            <th>Size</th>
            <th style={{textAlign:'center'}}>Delivered</th>
            <th style={{textAlign:'center'}}>Opened</th>
            <th style={{textAlign:'center',display:'none'}}>Replied</th>
            <th style={{textAlign:'center',display:'none'}}>Link Clicks</th>
            <th style={{textAlign:'center'}}>Bounced</th>
            <th style={{width:150,textAlign:'center'}}> </th>
          </thead>
          <tbody>
            {campaigns}
          </tbody>
        </table>
      </div>
    );
  },
});

var CampaignRow = React.createClass({
  getInitialState: function() {
    return {
      delivered: '~',
      opened: '~',
      bounced: '~',
      prospectListCount: '~'
    }
  },

  DeleteCampaign: function(e) {
    var thiss = this;
    console.log('DELETE CAMPAIGN')
    e.stopPropagation()
    swal({   
      title: "Are you sure?",   
      text: "You will not be able to recover this Campaign!",
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Yes, delete it!",   
      closeOnConfirm: false }, 
      function(){   
        swal("Deleted!", "Your campaign has been deleted.", "success"); 
        console.log('deleted')
        thiss.props.deleteCampaign(thiss.props.campaign.objectId)
      });
  },

  toggleScreen: function() {
    //this.props.toggleScreen()
    this.props.changeSelectedCampaign(this.props.campaign)
  },

  componentDidMount: function() {
    var thiss = this;
    list = this.props.campaign.prospect_list
    list = (list) ? list.objectId : ""
    qry = {
      where: JSON.stringify({lists: appConfig.pointer('ProspectList',list)}),
      count: true
    }
    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospect',
      headers: appConfig.headers,
      data: qry,
      success: function(res) { thiss.setState({prospectListCount: res.count})},
      error: function(err) { console.log(err.responseText) }
    })
    campaignId = this.props.campaign.objectId
    qry = {
      where: JSON.stringify({campaign: appConfig.pointer('Campaign', campaignId)}),
      limit: 1000,
      count: true
    }
    $.ajax({
      url:'https://api.parse.com/1/classes/SentEmail',
      data: qry,
      headers: appConfig.headers,
      success: function(res) { thiss.setState({delivered: res.count})},
      error: function(err) { console.log(err.responseText) }
    })
    qry_1 = {
      where: JSON.stringify({
        campaign: appConfig.pointer('Campaign', campaignId),
        opened: {"$gte": 0} 
      }),
      count: true
    }
    $.ajax({
      url:'https://api.parse.com/1/classes/SentEmail',
      data: qry_1,
      headers: appConfig.headers,
      success: function(res) { thiss.setState({opened : res.count}) },
      error: function(err) { console.log(err.responseText) }
    })
    qry_2 = {
      where: JSON.stringify({
        campaign: appConfig.pointer('Campaign', campaignId),
        failed: {"$gte": 0} 
      }),
      count: true
    }
    $.ajax({
      url:'https://api.parse.com/1/classes/SentEmail',
      data: qry_2,
      headers: appConfig.headers,
      success: function(res) { thiss.setState({bounced : res.count}) },
      error: function(err) { console.log(err.responseText) }
    })
  },

  render: function() {
    prospect_list = (this.props.campaign.prospect_list) ? this.props.campaign.prospect_list : {list_type:"", name:""}
    if(prospect_list.list_type == "signal_list")
        iconType = <i className="fa fa-wifi" style={{marginRight:5}}/>
    else if(prospect_list.list_type == "mining_job")
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
            {prospect_list.name}
        </h6> </td>
        <td>
          <div className="label label-primary">
            <i className="fa fa-user" />&nbsp;&nbsp;
            {this.state.prospectListCount}
          </div>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="badge" style={{backgroundColor:'#f0ad4e',width:50}}>
            <i className="fa fa-paper-plane" style={{float:'left'}}/> &nbsp;
            {this.state.delivered}
          </span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-success">
            <i className="fa fa-eye" /> &nbsp; {this.state.opened} </span>
        </td>
        <td style={{textAlign:'center',padding:12,display:'none'}}>
          <span className="label label-primary">
            <i className="fa fa-mail-reply" /> &nbsp;
            {this.state.bounced}</span>
        </td>
        <td style={{textAlign:'center',padding:12,display:'none'}}>
          <span className="label label-info">
            <i className="fa fa-external-link-square" /> &nbsp;
            18%</span>
        </td>
        <td style={{textAlign:'center',padding:12}}>
          <span className="label label-default">
            <i className="fa fa-exclamation-circle" /> &nbsp;
            {this.state.bounced}</span>
        </td>
        <td style={{textAlign:'center',paddingTop:12}}>
          <a href="javascript:" className="btn btn-primary btn-xs" 
            style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important;',display:'none'}}> 
            <i className="fa fa-copy" style={{fontWeight:'bold'}}/>&nbsp; Clone</a>

          <a href="javascript:" 
             className="btn-default" 
             onClick={this.DeleteCampaign}
             style={{marginLeft:5}}> <i className="fa fa-trash-o" /></a>
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
