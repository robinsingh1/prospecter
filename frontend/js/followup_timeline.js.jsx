/** @jsx React.DOM */
var SendEmailModal = require('./send_email_modal.js.min.js')
var TimelineDayElement = require('./timeline_day_element.js.min.js')
var BatchStage = require('./batch_stage.js.min.js')

module.exports = React.createClass({
  // FollowupTimeline
  getInitialState: function() {
    initialFollowups = this.props.initialFollowups
    initialFollowups = (initialFollowups) ? initialFollowups : []
    return {
      followups: initialFollowups,
      loading: false,
      currentTemplate:'',
      currentBatch: '',
    }
  },

  componentDidMount: function() {
    thiss = this;
    $('.day').tooltip({
      placement: 'right',
      title:'+ Add a follow-up'
    })

    console.log(this.props.selectedCampaign)
     company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
     currentCampaign = appConfig.pointer('Campaign', this.props.selectedCampaign.objectId)
     $.ajax({
       url:'https://api.parse.com/1/classes/Followup',
       type:'GET',
       headers: appConfig.headers,
       data: {
         where: JSON.stringify({
           campaign: currentCampaign,
           company: appConfig.company
         }),
         include:'template',
       },
       success: function(res) {
         console.log('followup timeline')
         console.log(res.results)
       },
       error: function(err) {
         console.log('error')
         console.log(err)
       }
     })
  },
  
  render: function() {
    timelineElements = []

    batches = _.map(this.props.selectedCampaign.batches, function(batch) {
      batch.currentDay = moment(batch.started).diff(moment(),  'days') * -1
      return batch
    })
    console.debug(batches)

    for(i=0;i< 31;i++){
      followup = _.findWhere(this.state.followups, {day: i})
      var elementType = (followup) ? true : false
      var currentTemplate = (followup) ? followup.template : false
      var addTemplateMode = (followup) ? followup.addTemplateMode : true
      campaign = this.props.selectedCampaign

      currentBatch = {}
      batch_started_today = false
      if(i == 0) {
        batchCount = (batches) ? this.props.newProspects.length : this.props.prospects.length
        console.debug('0 batchCount '+batchCount)
      } else {
        batchCount = _.findWhere(batches, {currentDay: i})
        //console.debug(batches)
        if(batchCount) {
          //console.debug('CURRENT BATCH'); console.debug(batchCount);
          currentBatch = batchCount.objectId
          batchCount = "~"
        }
      }

      timelineElements.push(<div><TimelineDayElement 
                                    dayCount={i}
                                    elementType={!elementType}
                                    currentTemplate={currentTemplate}
                                    batchCount={batchCount}
                                    currentBatch={currentBatch}
                                    addTemplateMode={addTemplateMode}
                                    templates={this.props.templates}
                                    newProspects={this.props.newProspects}
                                    addFollowup={this.addFollowup}
                                    editFollowup={this.editFollowup}
                                    saveFollowup={this.saveFollowup}
                                    removeFollowup={this.removeFollowup}
                                    batches={this.props.selectedCampaign.batches}
                                    prospectListCount={this.props.prospectListCount}
                                    setCurrentBatch={this.setCurrentBatch}
                                    setCurrentTemplate={this.setCurrentTemplate} />
                                  </div>)

      if(i == 0 && _.findWhere(batches, {currentDay: 0})){
          currentBatch = _.findWhere(batches, {currentDay: 0}).objectId
          batchCount = "~"
          timelineElements.push(<div><TimelineDayElement 
                                  dayCount={0.5}
                                  batchCount={batchCount}
                                  currentBatch={currentBatch}
                                  newProspects={this.props.newProspects}
                                  elementType={true}
                                  batches={this.props.selectedCampaign.batches}
                                  prospectListCount={this.props.prospectListCount}
                                  setCurrentBatch={this.setCurrentBatch} />
                                </div>)
      }
    }
    return (
      <div>
        <div className="timeline" 
             style={{height:'100%',backgroundColor:'rgb(90, 107, 119)', width:5,marginTop:-35}}>
             {timelineElements}
        </div>
        <SendEmailModal prospects={this.props.prospects} 
                        selectedCampaign={this.props.selectedCampaign}              
                        currentBatch={this.state.currentBatch}
                        currentTemplate={this.state.currentTemplate}  />
      </div>
    );
  },

  createFollowup: function() {
    //
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
    new_followups = this.state.followups
    new_followups = _.map(new_followups, function(followup) {
      if(followup.day == day){
        followup.addTemplateMode = false
        followup.template = chosenTemplate
      }
      return followup
    })

    this.setState({followups: new_followups})
    followup = _.findWhere(new_followups, {day: day})
    if(followup.objectId){
      url = "/"+followup.objectId; type="PUT"

      data = {template:{
        __type:'Pointer',
        className:'Template',
        objectId: chosenTemplate.objectId
      }}
    } else {
      url = ""; type="POST";

      data = {
        day: day,
        campaign: {
          __type: 'Pointer',
          className:'Campaign',
          objectId: this.props.selectedCampaign.objectId
        },
        template: {
          __type: 'Pointer',
          className:'Template',
          objectId:chosenTemplate.objectId,
        }
      }
    }

    thiss = this;
    $.ajax({
      url:'https://api.parse.com/1/classes/Followup'+url,
      type:type,
      data:JSON.stringify(data),
      headers:appConfig.headers,
      success: function(res) {
        
        new_followups = _.map(new_followups, function(followup) {
          if(followup.day == day)
            followup.objectId = false
          return followup
        })
        thiss.setState({followups: new_followups})

        console.log(res)
        $.ajax({
          url:'https://api.parse.com/1/classes/Campaign/'+thiss.props.selectedCampaign.objectId,
          type:'PUT',
          data:JSON.stringify({followups: {
            __op: 'AddUnique',
            objects:[{
              __type:'Pointer', 
              className:'Followup',
              objectId:res.objectId
            }]
          }}),
          headers:appConfig.headers,
          success: function() { },
          error: function() { }
        })
      },
      error: function() {

      },
    })
  },

  removeFollowup: function(day) {
    followups = []
    for(i=0;i< this.state.followups.length;i++)
      if(this.state.followups[i].day != day)
        followups.push(this.state.followups[i])
      
    for(i=0;i< this.state.followups.length;i++)
      if(this.state.followups[i].day == day)
        break
    
    this.setState({followups: followups}) 
    id = this.state.followups[i]

    thiss = this;
    if(id) {
      id = id.objectId
      $.ajax({
        url:'https://api.parse.com/1/classes/Followup/'+id,
        headers:appConfig.headers,
        type:'DELETE',
        success: function(res) {
          console.log(res)
        }
      })

     console.log('REMOVE ARRAY')
      $.ajax({
        url:'https://api.parse.com/1/classes/Campaign/'+thiss.props.selectedCampaign.objectId,
        headers:appConfig.headers,
        type:'PUT',
        data: JSON.stringify({
          followups: {
            __op : 'Remove',
            objects: [{
              __type: 'Pointer',
              className: 'Followup',
              objectId: id
            }]
          }
        }),
        success: function(res){
          console.log(res)
        },
        error: function() {
        }
      })
    }
  },

  setCurrentBatch: function(currentBatch) {
    this.setState({currentBatch: currentBatch})
  },

  setCurrentTemplate: function(template) {
    this.setState({currentTemplate: template })
  }
});


