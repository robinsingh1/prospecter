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
     //qry = 'where={"campaign":'+currentCampaign+'}'
     $.ajax({
       url:'https://api.parse.com/1/classes/Followup',
       type:'GET',
       headers: appConfig.headers,
       data: qry,
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
    batches =  _.countBy(this.props.prospects, 
                      function(prospect) { return prospect.last_contacted })

    timelineElements = []
    followups = (this.state.followups) ? this.state.followups : []
    console.log(followups)
    for(i=0;i< 31;i++){
      batchCount = (batches[i]) ? batches[i] : 0
      
      addTemplateMode = false; 
      currentTemplate = false;
      elementType = false
      for(ii=0;ii< followups.length; ii++){
        // TODO - Replace with underscore method
        //console.log('FOLLOWUPS ERROR')
        //console.log(followups)
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
             style={{height:'100%',backgroundColor:'rgb(90, 107, 119)',
                     width:5,marginTop:-35}}>
             {timelineElements}
        </div>
        <SendEmailModal prospects={this.props.prospects} 
                        currentTemplate={this.state.currentTemplate}/>
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
    new_followups[day].addTemplateMode = false
    new_followups[day].template = chosenTemplate

    this.setState({followups: new_followups})

    if(new_followups[day].objectId){
      url = "/"+new_followups[i].objectId; type="PUT"

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
          objectId: this.props.currentCampaign.objectId
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
      url:'https://api.parse.com/1/classes/Followup',
      type:type,
      data:JSON.stringify(data),
      headers:appConfig.headers,
      success: function(res) {
        
        new_followups[day].objectId = res.objectId
        thiss.setState({followups: new_followups})

        console.log(res)
        $.ajax({
          url:'https://api.parse.com/1/classes/Campaign/'+thiss.props.currentCampaign.objectId,
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
          success: function() {
          },
          error: function() {
          }
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
        url:'https://api.parse.com/1/classes/Campaign/'+thiss.props.currentCampaign.objectId,
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

  setCurrentTemplate: function(template) {
    this.setState({currentTemplate: template })
  }
});


