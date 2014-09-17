/** @jsx React.DOM */
var SendEmailModal = require('./send_email_modal.js.min.js')

module.exports = React.createClass({
  // FollowupTimeline
  getInitialState: function() {
    return {
      followups: this.props.initialFollowups,
      loading: false,
      currentTemplate:''
    }
  },

  componentDidMount: function() {
    thiss = this;
    $('.day').tooltip()
    // Followups that belong to campaign
     company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
     currentCampaign = {
       '__type': 'Pointer',
       'className':'Campaign',
       'objectId':this.props.currentCampaign.objectId
     }
     currentCampaign = JSON.stringify(currentCampaign)
     //qry = 'where={"company":'+company+',"campaign":'+currentCampaign+'}&include=template'
     qry = 'where={"campaign":'+currentCampaign+'}&include=template'
     $.ajax({
       url:'https://api.parse.com/1/classes/Followup',
       type:'GET',
       headers: appConfig.headers,
       data: qry,
       success: function(res) {
         console.log(res.results)
       },
       error: function(err) {
         console.log('error')
         console.log(err)
       }
     })
  },
  
  render: function() {
    console.log(this.props.prospects)
    
    followupProgression =  _.countBy(this.props.prospects, function(prospect) {
      return prospect.last_contacted
    })
    console.log(followupProgression)
    console.log(followupProgression[0])

    timelineElements = []
    for(i=0;i< 31;i++){
      followupProgressionCount = (followupProgression[i]) ? followupProgression[i] : 0

      addTemplateMode = false
      currentTemplate = false
      for(ii=0;ii< this.state.followups.length; ii++){
        // TODO - Replace this with the underscore method
        elementType = i == this.state.followups[ii].day
        if(elementType) {
          addTemplateMode = (this.state.followups[ii].addTemplateMode) ? true: false
          currentTemplate = this.state.followups[ii].template
          break
        }
      }

      timelineElements.push(<TimelineDayElement 
                              dayCount={i}
                              templates={this.props.templates}
                              currentTemplate={currentTemplate}
                              followupProgressionCount={followupProgressionCount}
                              addTemplateMode={addTemplateMode}
                              elementType={!elementType}
                              setCurrentTemplate={this.setCurrentTemplate}
                              toggleTemplateEditMenu={this.toggleTemplateEditMenu}/>)
    }
    return (
      <div>
        <div className="timeline" 
             style={{height:'900px',backgroundColor:'rgb(90, 107, 119)',
                     width:5,marginTop:-35}}>
             {timelineElements}
        </div>
        <SendEmailModal prospects={this.props.prospects} 
                        currentTemplate={this.state.currentTemplate}/>
      </div>
    );
  },

  toggleTemplateEditMenu: function(day) {
    console.log('called template edit menu')
    //this.props.toggleTemplateEditMenu({name:'', body:'', subject:'', editMode:true})
    followups = this.state.followups
    followups.push({addTemplateMode: true, day: day})
    this.setState({
      followups: followups
    })
  },

  setCurrentTemplate: function(template) {
    this.setState({currentTemplate: template })
  }
});

var TimelineDayElement = React.createClass({
  // TODO - 
  // - add prospect list progression
  // - add scheduled followup
  toggleTemplateEditMenu: function() {
    this.props.toggleTemplateEditMenu(this.props.dayCount)
  },

  render: function() {
    if(this.props.elementType) {
      timelineDay = <div>
                      <div className="day" 
                           onClick={this.toggleTemplateEditMenu}
                           data-toggle="tooltip" 
                           data-placement="right" 
                           title="+ Add a follow-up">{"D"+this.props.dayCount}
                       </div>
                      {(this.props.followupProgressionCount) ? <BatchStage followupProgressionCount={this.props.followupProgressionCount} /> : "" }
                     </div>
    } else {
      timelineDay = <div>
                      <div className="day"
                           data-trigger="manual" >{"D"+this.props.dayCount}
                      </div>
                      {(this.props.followupProgressionCount) ? <BatchStage followupProgressionCount={this.props.followupProgressionCount} /> : ""}
                      
                      {(this.props.addTemplateMode) ? <AddTemplate templates={this.props.templates}/>: <TemplateFollowup currentTemplate={this.props.currentTemplate} setCurrentTemplate={this.props.setCurrentTemplate}/>}
                    </div>
    }
    return (
      <div> {timelineDay} </div>
    )
  },
  setCurrentTemplate: function(template) {
    this.props.setCurrentTemplate(template)
  }
});

var AddTemplate = React.createClass({
  // TODO
  // Add Invisible Div that cover timeline area
  // Onclick should Cause the addtemplate menu to disappear

  render: function() {
    options = []
    for(i=0;i< this.props.templates.length; i++) {
      options.push( <option>{this.props.templates[i].name}</option>)
    }
    return (
      <div className="followup-placement arrow_box_1 tmp_2"> 
        <h6 style={{width:55,display:'inline-block'}} 
            className="text-muted">
          Choose :
        </h6>
        <select className="form-control input-sm" 
                style={{display:'inline-block',width:127,marginRight:5}}>
          {options}
        </select>

        <button className="win-btn btn btn-success btn-xs" 
                onClick={this.chooseTemplate}
                style={{marginRight:5}}>
          <i className="fa fa-check" /></button>
        <button className="win-btn btn btn-default btn-xs"
                onClick={this.closeAddTemplate}>
          <i className="fa fa-times" /></button>
      </div>
    )
  },

  chooseTemplate: function() {
    
  },

  closeAddTemplate: function() {
    
  },
});

var TemplateFollowup = React.createClass({
  setCurrentTemplate: function() {
    this.props.setCurrentTemplate(this.props.currentTemplate)
  },
  render: function() {
    return (
      <div className="followup-placement arrow_box_1 tmp_2"> 
        <h6 style={{width:130,display:'inline-block'}}>
          <i className="fa fa-file-text-o" />&nbsp;&nbsp;
          {this.props.currentTemplate.name}
        </h6>
        <button className="win-btn btn btn-success btn-xs"
                data-target=".bs-sendEmail-modal-lg"
                onClick={this.setCurrentTemplate}
                data-toggle="modal">
          <i className="fa fa-paper-plane"/>&nbsp;Send</button>&nbsp;
        <button className="win-btn btn btn-default btn-xs">
          <i className="fa fa-pencil" /></button>&nbsp;
        <button className="win-btn btn btn-default btn-xs">
          <i className="fa fa-trash-o" /></button>
      </div>
    );
  }
});

var BatchStage = React.createClass({
  render: function() {
    return (
      <div className="followup-placement arrow_box tmp">
        <span className="badge">{this.props.followupProgressionCount}</span>&nbsp;
        <h6 style={{display:'inline-block'}}> prospects in the sales cycle.</h6>
      </div>
    );
  }
});
