/** @jsx React.DOM */
var TemplatesMenu = require('./templates_menu.js.min.js');
var EditTemplateView = require('./edit_template.js.min.js');
var CreateTemplateView = require('./create_template.js.min.js');
var Timeline = require('./followup_timeline.js.min.js');
var CampaignActivityView = require('./campaign_activity_view.js.min.js')
var CampaignFollowupFeed = require('./campaign_followup_feed.js.min.js')
var CampaignSentEmail = require('./campaign_sent_email.js.min.js')
var CampaignReport = require('./campaign_report.js.min.js')

module.exports = React.createClass({
  // Campaign Detail
  getInitialState: function() {
    return {
      selectedTemplate: 0,
      templateDetailMode: false,
      editMode: false,
      followupDay: 0,
      templates:[],
      currentTemplate:'',
      prospectListCount:'~',
      prospects:[],
      currentScreen: 'timeline',
      newProspects: [],
      bounced: '~',
      delivered: '~',
      opened: '~',
    }
  },

  changeScreen: function(e) {
    this.setState({currentScreen: $(e.target).text().toLowerCase()})
  },

  componentDidMount: function() {
    thissss = this;
    company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
    qry = 'where={"company":'+company+'}'



    $.ajax({
      url:'https://api.parse.com/1/classes/Template',
      headers: appConfig.headers,
      data: qry,
      success: function(res) { thissss.setState({templates: res.results}) },
      error: function(err) { console.log('error') }
    });

    currentList = JSON.stringify({
      '__type'    : 'Pointer', 
      'className' : 'ProspectList',
      'objectId'  : this.props.selectedCampaign.prospect_list.objectId, 
    })

    qry = 'where={"lists":'+currentList+'}&limit=1000&count=1&include=email_guesses,email_guesses.pattern'
    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospect',
      headers: appConfig.headers,
      data: qry,
      success: function (res) {
        // TODO - why is this being done
        console.log('RESULTS')
        console.log(res)
        console.log(res.results)
        thissss.setState({
          prospects: res.results,
          prospectListCount: res.count 
        })

        if(res.count > 1000){
          for(i=0;i< Math.ceil(res.count/1000); i++) {
            qry = 'where={"lists":'+currentList+'}&limit=1000&count=1'
            $.ajax({
              url: 'https://api.parse.com/1/classes/Prospect',
              headers: appConfig.headers,
              data: qry,
              success: function (res) {
                prospects = thissss.state.prospects
                thissss.setState({prospects:  prospects.concat(res.results)})
              },
              error: function(err) {}
            })
          }
        }
      },
      error: function(err) { }
    })

    var thiss = this;
    selectedCampaign = this.props.selectedCampaign
    console.debug(this.props.selectedCampaign)
    console.debug('Selected Campaign Batches')
    console.debug(this.props.selectedCampaign.batches)
    batches = this.props.selectedCampaign.batches
    if(_.isEqual(batches, [])){ 
      batch_query = { $in: [false, null] }
    } else {
      qry = _.map(batches, function(batch) {
        return appConfig.pointer('ProspectBatch', batch.objectId)
      })
      batch_query = { $nin: qry }
    }
    prospect_list = thiss.props.selectedCampaign.prospect_list.objectId
    // TODO - add support for more than 1000
    $.ajax({
      url:'https://api.parse.com/1/classes/Prospect',
      headers: appConfig.headers,
      selectedCampaign: thiss.props.selectedCampaign,
      data: {
        where: JSON.stringify({
            batches: batch_query,
            lists: appConfig.pointer('ProspectList', prospect_list),
        }), limit:1000
      },
      success: function(res) { thiss.setState({newProspects: res.results}) },
      error: function(err) { console.debug(err.responseText) }
    })
    campaignId = thiss.props.selectedCampaign.objectId
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

  returnToOverview: function() {
    this.props.toggleScreen('Campaigns')
  },

  render: function() {
    //console.log('campaign detail')
    console.log(this.state.currentScreen)
    console.log(this.state.currentScreen.indexOf("sent email"))
    tab_1 = "campaign-tab-link"
    tab_2 = "campaign-tab-link"
    tab_3 = "campaign-tab-link"
    tab_4 = "campaign-tab-link"
    tab_5 = "campaign-tab-link"
    if(this.state.currentScreen == "timeline"){
      //console.debug('SELECTED CAMPAIGN')
      //console.debug(this.props.selectedCampaign)
      lolscreen = <FollowupTimeline 
                  templates={this.state.templates}
                  prospects={this.state.prospects}
                  selectedCampaign={this.props.selectedCampaign}
                  prospectListCount={this.state.prospectListCount}
                  newProspects={this.state.newProspects}
                  toggleTemplateEditMenu={this.toggleTemplateEditMenu}
                  initialFollowups={this.props.selectedCampaign.followups} />
      tab_1 = "active-campaign-tab campaign tab-link"
    } else if(this.state.currentScreen == "recent activity") {
      lolscreen = <CampaignActivityView />
      tab_2 = "active-campaign-tab campaign tab-link"
    } else if(this.state.currentScreen == "scheduled followups") {
      lolscreen = <CampaignFollowupFeed 
                    batches={this.props.selectedCampaign.batches}
                    followups={this.props.selectedCampaign.followups} />
      tab_3 = "active-campaign-tab campaign tab-link"
    } else if(this.state.currentScreen == "sent mail") {
      lolscreen = <CampaignSentEmail 
                      selectedCampaign={this.props.selectedCampaign}/>
      tab_4 = "active-campaign-tab campaign tab-link"
    } else if(this.state.currentScreen == "analytics") {
      lolscreen = <CampaignReport />
      tab_5 = "active-campaign-tab campaign tab-link"
    } else{
      console.log('LOL')
      lolscreen = <FollowupTimeline 
                  templates={this.state.templates}
                  prospects={this.state.prospects}
                  selectedCampaign={this.props.selectedCampaign}
                  prospectListCount={this.state.prospectListCount}
                  newProspects={this.state.newProspects}
                  toggleTemplateEditMenu={this.toggleTemplateEditMenu}
                  templates={this.state.templates}
                  initialFollowups={this.props.selectedCampaign.followups} />
    }
    //activeTab = "active-campaign-tab campaign tab-link"
      

    list_type = this.props.selectedCampaign.prospect_list.list_type
    if(list_type == "mining_job")
      list_type = <span><i className="fa fa-cloud-download" />&nbsp;</span>
    else if(list_type == "signal_list")
      list_type = <span><i className="fa fa-wifi" />&nbsp;</span>
    else
      list_type = <span><i className="fa fa-list-alt" />&nbsp;</span>

    batches = this.props.selectedCampaign.batches
    batches = (batches) ? batches : []
    console.log('BATCHES')
    console.log(batches)
    return (
      <div className="container" 
           style={{width:'100%',height:'100%',paddingLeft:0,paddingRight:0}}>
        <div style={{marginBottom:15}} id="campaign-top-detail">
        <h5 style={{marginTop:20,marginLeft:20}}>
          <a href="javascript:" onClick={this.returnToOverview} >Campaigns </a>
          <small>
            <i style={{marginLeft:10, marginRight:10}} 
               className="fa fa-chevron-right" />
          </small>
          {this.props.selectedCampaign.name}
        </h5>
        <h6 style={{marginLeft:20,display:'inline-block',marginRight:15,marginBottom:0,fontWeight:'bold',fontSize:10}}>
          <span className="text-muted">PROSPECT LIST:</span> &nbsp;
        </h6>
          <span className="label label-success">
          {list_type}
          {this.props.selectedCampaign.prospect_list.name}
          &nbsp; &nbsp; &nbsp;
        <i className="fa fa-user" />&nbsp;{this.state.prospectListCount}
        </span>
        <br />
        <h6 style={{marginLeft:20,display:'inline-block',marginRight:50,marginTop:0,fontWeight:'bold',fontSize:10}}
            className="text-muted">
          BATCHES:
        </h6>
        <span className="label label-primary">
          <i className="fa fa-sitemap" />&nbsp;
          {(_.isEqual(batches, [])) ? 1 : batches.length}
        </span>
        
        <div style={{border:'1px solid #ddd',borderRadius:5,float:'right',marginTop:-45,marginRight:100}}>
            <div className="bg-warning" style={{display:'inline-block',padding:10,fontWeight:'bold',cursor:'pointer',width:70,textAlign:'center'}}>
              <span className="text-warning">
                <i className="fa fa-paper-plane"/> {this.state.delivered}
              </span>
            </div>
            <div className="bg-success" style={{display:'inline-block',padding:10,fontWeight:'bold',cursor:'pointer',width:70,textAlign:'center'}}>
              <span className="text-success">
                <i className="fa fa-eye"/> {this.state.opened}
              </span>
            </div>
            <div className="bg-danger" style={{display:'inline-block',padding:10,fontWeight:'bold',cursor:'pointer',width:70,textAlign:'center'}}>
              <span className="text-danger">
                <i className="fa fa-exclamation-circle"/> {this.state.bounced}
              </span>
            </div>
        </div>
        
        <a href="javascript:" 
           style={{float: 'right', marginTop: -35, marginRight: 30, display:'none'}}
           className="btn btn-success btn-sm">
          <i className="fa fa-envelope" /> Send!
        </a>
        
        </div>
              <ul className="nav nav-tabs campaign-tabs" role="tablist" style={{paddingRight:0}}>
                <li className="campaign-tab"> <a onClick={this.changeScreen} href="javascript:" className={tab_1}>TIMELINE</a></li>
                <li className="campaign-tab" ><a onClick={this.changeScreen} href="javascript:" className={tab_2}>RECENT ACTIVITY</a></li>
                <li className="campaign-tab" >
                  <a onClick={this.changeScreen} href="javascript:" className={tab_3} style={{fontSize:12}}>
                    SCHEDULED FOLLOWUPS</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_4}>SENT MAIL</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_5}>ANALYTICS</a></li>
              </ul>
            {lolscreen}

          {(this.state.templateDetailMode) ? <EditTemplateView 
            editMode={this.state.editMode}
            initialTemplateValues={this.state.currentTemplate}
            saveTemplate={this.saveTemplate}
            prospect={this.state.prospects[0]}
            toggleTemplateEditMenu={this.toggleTemplateEditMenu}
            followupDay={this.state.followupDay} /> : "" }
      </div>
    );
  },

  saveTemplate: function(template, newTemplate) {
    templates = this.state.templates
    for(i=0;i< this.state.templates.length; i++)
      if(this.state.templates[i].name == template.name)
        break
    
    console.log(template)
    if(newTemplate){
      template.subject = template.subject
      template.name = template.name
      template.body = template.body
      templates.push(template)

      $.ajax({
        url:'https://api.parse.com/1/classes/Template',
        headers:appConfig.headers,
        type:'POST',
        data:JSON.stringify({
          name : template.name,
          subject: template.subject,
          body: template.body,
          user:{
            __type: 'Pointer',
            className:'_User',
            objectId:JSON.parse(localStorage.currentUser).objectId,
          },
          company:JSON.parse(localStorage.currentUser).company,
        }),
        success: function(res) {
          console.log(res)
        },
        error: function() {
        }
      })
    } else {
      templates[i].subject = template.subject
      templates[i].body = template.body

      $.ajax({
        url:'https://api.parse.com/1/classes/Template/'+templates[i].objectId,
        type:'PUT',
        headers:appConfig.headers,
        data:JSON.stringify({
          name : template.name,
          subject: template.subject,
          body: template.body,
        }),
        success: function(res) {
          console.log(res)
        },
        error: function() {
        }
      })
    }

    this.setState({templates: templates })

  },

  toggleTemplateEditMenu: function(currentTemplate, editMode) {
    editMode = (editMode) ? true : false
    this.setState({
      currentTemplate: currentTemplate,
      templateDetailMode: !this.state.templateDetailMode,
    })
  }
});

var FollowupTimeline = React.createClass({
  render: function() {
    return (
        <div>
          <div className="col-md-8 panel panel-default" 
               style={{height:436,paddingLeft:305,paddingTop:50,overflow:'auto',borderRight:0,borderRadius:0, borderTop:0}}>
                <Timeline 
                  templates={this.props.templates}
                  prospects={this.props.prospects}
                  selectedCampaign={this.props.selectedCampaign}
                  prospectListCount={this.props.prospectListCount}
                  newProspects={this.props.newProspects}
                  toggleTemplateEditMenu={this.props.toggleTemplateEditMenu}
                  initialFollowups={this.props.initialFollowups} />
          </div>
          <div className="col-md-4" 
               style={{paddingLeft:0,paddingRight:0,height:436}}>
            <TemplatesMenu 
              templates={this.props.templates}
              toggleTemplateEditMenu={this.props.toggleTemplateEditMenu} />
          </div>
        </div>

    )
  }
})
