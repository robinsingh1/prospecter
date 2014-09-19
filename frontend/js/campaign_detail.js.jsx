/** @jsx React.DOM */
var TemplatesMenu = require('./templates_menu.js.min.js');
var EditTemplateView = require('./edit_template.js.min.js');
var CreateTemplateView = require('./create_template.js.min.js');
var FollowupTimeline = require('./followup_timeline.js.min.js');

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
    }
  },

  componentDidMount: function() {
     thissss = this;
     company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
     qry = 'where={"company":'+company+'}'
    $.ajax({
      url:'https://api.parse.com/1/classes/Templates',
      headers: appConfig.headers,
      data: qry,
      success: function(res) {
        //console.log(res.results)
        thissss.setState({templates: res.results})
      },
      error: function(err) {
        console.log('error')
        //console.log(err)
      }
    });

    currentList = JSON.stringify({
      '__type'    : 'Pointer', 
      'className' : 'ProspectList',
      'objectId'  : this.props.selectedCampaign.prospect_list.objectId, 
    })
    qry = 'where={"lists":'+currentList+'}&limit=1000&count=1'
    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospects',
      headers: appConfig.headers,
      data: qry,
      success: function (res) {
        thissss.setState({
          prospects: res.results,
          prospectListCount: res.count 
        })
      },
      error: function(err) {

      }
    })
  },

  returnToOverview: function() {
    this.props.toggleScreen('Campaigns')
  },

  render: function() {
    //console.log('campaign detail')
    thiss = this;
    return (
      <div className="container" 
           style={{width:'100%',height:'100%',paddingLeft:0,paddingRight:0}}>
        <div style={{marginBottom:30}}>
        <h5 style={{marginTop:20,marginLeft:20}}>
          <a href="javascript:" onClick={this.returnToOverview} >Campaigns </a>
          <small>
            <i style={{marginLeft:10, marginRight:10}} 
               className="fa fa-chevron-right" />
          </small>
          {this.props.selectedCampaign.name}
        </h5>
        <h6 style={{marginLeft:20,display:'inline-block',marginRight:15}}>
          <span className="text-muted">Prospect List:</span> &nbsp;
          {(this.props.selectedCampaign.prospect_list.signal_list) ? <span><i className="fa fa-wifi" />&nbsp;</span> : ""}
          {this.props.selectedCampaign.prospect_list.name}
        </h6>
        <span className="badge">{this.state.prospectListCount}</span>

        <h6 style={{marginLeft:20,display:'inline-block',marginRight:15}}>
          Batches :
        </h6>
        <span className="badge">2</span>
        <a href="javascript:" 
           style={{float: 'right', marginTop: -35, marginRight: 30, display:'none'}}
           className="btn btn-success btn-sm">
          <i className="fa fa-envelope" /> Send!
        </a>
        </div>
          <div className="col-md-8 panel panel-default" 
               style={{height:'443px',paddingLeft:305,paddingTop:50,overflow:'auto',borderRight:0,borderRadius:0}}>
               <FollowupTimeline 
                  templates={this.state.templates}
                  prospects={this.state.prospects}
                  currentCampaign={this.props.selectedCampaign}
                  toggleTemplateEditMenu={this.toggleTemplateEditMenu}
                  initialFollowups={this.props.selectedCampaign.followups} />
          </div>
          <div className="col-md-4" 
               style={{paddingLeft:0,paddingRight:0,height:443}}>
            <TemplatesMenu 
              templates={this.state.templates}
              toggleTemplateEditMenu={this.toggleTemplateEditMenu} />
          </div>

          {(this.state.templateDetailMode) ? <EditTemplateView 
            editMode={this.state.editMode}
            initialTemplateValues={this.state.currentTemplate}
            saveTemplate={this.saveTemplate}
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
    } else {
      templates[i].subject = template.subject
      templates[i].body = template.body
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
