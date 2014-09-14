/** @jsx React.DOM */

var Templates = require('./templates.js.min.js');
var Schedules = require('./schedule.js.min.js');
var Campaigns = require('./campaigns.js.min.js');
var SentMail = require('./sent_mail.js.min.js');
var FollowupFeed = require('./followup_feed.js.min.js');
var CampaignDetail = require('./campaign_detail.js.min.js');
var CreateCampaignModal = require('./create_campaign.js.min.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedScreen: 'Campaigns',
      selectedCampaign:'',
    }
  },
  
  toggleScreen: function(screen) {
    this.setState({selectedScreen : screen})
  },

  changeSelectedCampaign: function(screen, selectedCampaign) {
    console.log(selectedCampaign)
    this.setState({
      selectedCampaign : selectedCampaign,
      selectedScreen: screen,
    })
  },

  render: function() {
    thiss = this
    console.log(this.state.selectedCampaign)
    switch (this.state.selectedScreen){
      case 'Campaigns':
        CurrentScreen = <Campaigns 
                            changeSelectedCampaign={thiss.changeSelectedCampaign} 
                            toggleScreen={thiss.toggleScreen}/>
        break;
      case 'CampaignDetail':
        CurrentScreen = <CampaignDetail 
                        selectedCampaign={thiss.state.selectedCampaign}
                        selectedCampaignObjectId={thiss.state.selectedCampaginObjectId}
                        toggleScreen={thiss.toggleScreen}/>
        break;
      case 'Templates':
        CurrentScreen = <Templates />
        break;
      case 'Overview':
        CurrentScreen = <Campaigns 
                            changeSelectedCampaign={thiss.changeSelectedCampaign} 
                            toggleScreen={thiss.toggleScreen}/>
        break;
      case 'Sent Mail':
        CurrentScreen = <SentMail />
        break;
      case 'Followup Feed':
        CurrentScreen = <FollowupFeed />
        break;
      case 'Schedules':
        CurrentScreen = <Schedules />
        break;
    }

    return (
      <div className="" style={{height:'450px'}}>
        <div className="container" style={{padding:'0',width:'100%',height:'100%'}}>
            <SideMenu toggleScreen={this.toggleScreen}/>
          <div className="col-md-10" style={{padding:'0',height:'100%'}}>
            {CurrentScreen}
          </div>
        </div>
      </div>
    );
  }
});

var SideMenu = React.createClass({
  toggleScreen: function(e) {
    this.props.toggleScreen($(e.target).text().trim())
  },

  /*
    <button type="button" className="sharp btn btn-default" onClick={this.toggleScreen}>
      <i className="fa fa-file-text" /> &nbsp; Templates
    </button>
    <button type="button" className="sharp btn btn-default" onClick={this.toggleScreen}>
      <i className="fa fa-clock-o" /> &nbsp; Schedules
    </button>
  */
  createCampaignModal: function() {

  },

  render: function() {
    return (
      <div className="col-md-2" 
        style={{padding:'0',height:'100%', backgroundColor:'rgb(90, 107, 119)',borderBottomLeftRadius:'3px'}}>
        <div className="btn-group-vertical" style={{width:'100%'}}>
          <button type="button" 
                  className="sharp btn btn-default"
                  onClick={this.toggleScreen}>
            <span style={{marginLeft:'27px'}}>Overview</span>
          </button>
          <button type="button" 
                  className="sharp btn btn-default"
                  onClick={this.toggleScreen}>
            <i className="fa fa-newspaper-o" /> &nbsp; 
            <span style={{marginLeft:'4px'}}>Followup Feed</span>
          </button>
          <button type="button" style={{display:'none'}}
                  className="sharp btn btn-default">
            <i className="fa fa-code-fork" /> &nbsp; 
            <span style={{marginLeft:'4px'}}>Rules</span>
          </button>
          <button type="button" style={{display:'none'}}
                  className="sharp btn btn-default" onClick={this.toggleScreen}>
            <i className="fa fa-pie-chart" /> &nbsp; Analytics
          </button>
          <button type="button" 
                  className="sharp btn btn-default" 
                  onClick={this.toggleScreen}>
            <i className="fa fa-paper-plane" /> &nbsp; Sent Mail
          </button>
        </div>

        <div className="" style={{width:'100%',textAlign:'center',marginTop:100}}>
          <a href="javascript:" className="btn btn-primary new-list-btn" 
                data-toggle="modal" data-target=".bs-createCampaign-modal-sm"
                style={{ backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}>
            <i className="fa fa-plus-circle" />&nbsp;&nbsp;New Campaign
          </a>
        </div>
        <CreateCampaignModal createCampaignModal={this.createCampaignModal}/>
      </div>
    );
  }
});
