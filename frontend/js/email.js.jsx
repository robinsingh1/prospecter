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
      prospectLists: [],
      campaigns: []
    }
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
    $.ajax({
      url: 'https://api.parse.com/1/classes/ProspectList',
      headers: appConfig.headers,
      // TODO
      // - Company Specific
      success: function(res) {
        thiss.setState({prospectLists: res.results})
      },
      error: function(err) {

      }
    })


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
    console.log(this.state.selectedScreen)
    console.log(this.state.campaigns)
    switch (this.state.selectedScreen){
      case 'Campaigns':
        CurrentScreen = <Campaigns campaigns={thiss.state.campaigns}
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
        CurrentScreen = <Campaigns campaigns={thiss.state.campaigns}
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
      <div className="" style={{height:'550px'}}>
        <div className="container" style={{padding:'0',width:'100%',height:'100%'}}>
          <SideMenu 
                createCampaign={this.createCampaign}
                prospectLists={this.state.prospectLists}
                toggleScreen={this.toggleScreen}/>
              <div className="col-md-10" 
                   style={{padding:'0',height:'100%'}}>
            {CurrentScreen}
          </div>
        </div>
      </div>
    );
  },

  persistCampaign: function(newCampaign) {
    Campaign = {}
    Campaign.name = newCampaign.name
    Campaign.company = JSON.parse(localStorage.currentUser).company
    thiss = this;

    $.ajax({
      url:'https://api.parse.com/1/classes/Campaign',
      type:'POST',
      headers:appConfig.headers,
      data:JSON.stringify(Campaign),
      success: function(res) {
        the_campaign = _.find(thiss.state.campaigns, function(campaign){
          first = campaign.name == newCampaign.name 
          second = campaign.prospect_list == newCampaign.prospect_list
          return first && second
        })
        console.log(res)
        console.log(res.objectId)

        the_campaign.objectId = res.objectId
        campaigns = _.filter(thiss.state.campaigns, function(campaign){
          first = campaign.name == newCampaign.name 
          second = campaign.prospect_list == newCampaign.prospect_list
          return !(first && second)
        })
        campaigns.push(the_campaign)
        console.log(campaigns)

        thiss.setState({campaigns:  campaigns})

        $.ajax({
          url:'https://api.parse.com/1/classes/Campaign/'+res.objectId,
          type:'PUT',
          data: JSON.stringify({prospect_list:{
            '__type':'Pointer',
            'className':'ProspectList',
            'objectId':newCampaign.prospect_list.objectId,
          }}),
          headers:appConfig.headers,
          success: function(res){
          },
          error: function() {

          }
        })
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  createCampaign: function(newCampaign) {
    campaigns = this.state.campaigns
    campaigns.push(newCampaign)
    this.setState({campaigns: campaigns})
    console.log(newCampaign)

    $('.modal').click()
    $('.modal-backdrop').click()

    this.persistCampaign(newCampaign)
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
        <CreateCampaignModal prospectLists={this.props.prospectLists}
                             createCampaign={this.createCampaign}/>
      </div>
    );
  },

  createCampaign: function(newCampaign) {
    this.props.createCampaign(newCampaign)
  }
});
