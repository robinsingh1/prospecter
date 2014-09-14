/** @jsx React.DOM */

module.exports = React.createClass({
  // FollowupTimeline
  getInitialState: function() {
    return {
      loading: false,
    }
  },

  componentDidMount: function() {
    thiss = this;
    $('.day').tooltip()
    $('.day-popover').popover({
      html: true,
      content: '<h6 style="width:130px;display:inline-block;"><i class="fa fa-file-text-o" ></i>&nbsp;&nbsp;Example Template</h6><button class="win-btn btn btn-success btn-xs"><i class="fa fa-paper-plane"></i>&nbsp;Send</button>&nbsp;<button class="win-btn btn btn-default btn-xs"><i class="fa fa-pencil"></i></button>&nbsp;<button class="win-btn btn btn-default btn-xs"><i class="fa fa-trash-o"></i></button>'
    })

    $('.day-popover').popover('show')
    $('.win-btn').click(function() {
      //console.log('clicked win btn')
    });

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
    //console.log(this.props.followups)
    timelineElements = []
    for(i=0;i< 31;i++){
      for(ii=0;ii< this.props.followups.length; ii++){
        elementType = i == this.props.followups[ii].day
        if(elementType)
          break
      }
      timelineElements.push(<TimelineDayElement 
                              dayCount={i}
                              elementType={!elementType}
                              toggleTemplateEditMenu={this.toggleTemplateEditMenu}/>)
    }
    return (
      <div>
          <div className="timeline" 
               style={{height:'900px',backgroundColor:'rgb(90, 107, 119)',width:5}}>
               {timelineElements}
          </div>
      </div>
    );
  }
});

var TimelineDayElement = React.createClass({
  render: function() {
    timelineDay = "lol"
    if(this.props.elementType) {
      timelineDay = <div className="day" 
                         onClick={this.props.toggleTemplateEditMenu}
                         data-toggle="tooltip" 
                         data-placement="right" 
                         title="+ Add a follow-up">{"D"+this.props.dayCount}</div>
    } else {
      timelineDay = <div className="day day-popover" 
                         onClick={this.props.toggleTemplateEditMenu}
                         data-toggle="popover"
                         data-trigger="manual"
                         data-placement="right">{"D"+this.props.dayCount} </div>
    }
    return (
      <div>
      {timelineDay}
      </div>
    )
  }
});
