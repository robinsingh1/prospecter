/** @jsx React.DOM */
var SendEmailModal = require('./send_email_modal.js.min.js')
var TimelineDayElement = require('./timeline_day_element.js.min.js')

module.exports = React.createClass({
  // FollowupTimeline
  getInitialState: function() {
    initialFollowups = this.props.initialFollowups
    initialFollowups = (initialFollowups) ? initialFollowups : []

    return {
      followups: initialFollowups,
      loading: false,
      currentTemplate:''
    }
  },

  componentDidMount: function() {
    thiss = this;
    $('.day').tooltip({
      placement: 'right',
      title:'+ Add a follow-up'
    })
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
    batches =  _.countBy(this.props.prospects, 
                      function(prospect) { return prospect.last_contacted })

    timelineElements = []
    followups = this.state.followups
    for(i=0;i< 31;i++){
      batchCount = (batches[i]) ? batches[i] : 0
      
      addTemplateMode = false; 
      currentTemplate = false;
      for(ii=0;ii< followups.length; ii++){
        //TODO - Replace with underscore method
        elementType = i == followups[ii].day
        if(elementType) {
          addTemplateMode = (followups[ii].addTemplateMode) ? true : false
          currentTemplate = followups[ii].template
          break
        }
      }

      timelineElements.push(<TimelineDayElement 
                              dayCount={i}
                              templates={this.props.templates}
                              currentTemplate={currentTemplate}
                              batchCount={batchCount}
                              addTemplateMode={addTemplateMode}
                              elementType={!elementType}
                              addFollowup={this.addFollowup}
                              editFollowup={this.editFollowup}
                              saveFollowup={this.saveFollowup}
                              removeFollowup={this.removeFollowup}
                              setCurrentTemplate={this.setCurrentTemplate} />)
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

  createFollowup: function() {
    // needed properties
    /*
     * day
     * campaign
     * template objectId
    */

  },         

  addFollowup: function(day) {
    //console.log('called template edit menu')
    followups = this.state.followups
    followups.push({addTemplateMode: true, day: day})
    this.setState({
      followups: followups
    })
  },

  editFollowup: function(day) {
    // find template set editmode is false
    for(i=0;i< this.state.followups.length; i++){
      if(this.state.followups[i].day == day){
        break
      }
    }

    followups = this.state.followups
    followups[i].addTemplateMode = true
    this.setState({followups: followups})
  },

  saveFollowup: function(day, chosenTemplate) {
    for(i=0;i< this.state.followups.length; i++){
      if(this.state.followups[i].day == day){
        break
      }
    }
    new_followups = this.state.followups
    new_followups[i].addTemplateMode = false
    new_followups[i].template = chosenTemplate

    this.setState({followups: new_followups})
  },

  removeFollowup: function(day) {
    followups = []
    for(i=0;i< this.state.followups.length;i++)
      if(this.state.followups[i].day != day)
        followups.push(this.state.followups[i])
    
    console.log(followups)
    
    this.setState({followups: followups}) 
  },

  setCurrentTemplate: function(template) {
    this.setState({currentTemplate: template })
  }
});


