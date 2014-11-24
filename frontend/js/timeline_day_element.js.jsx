
module.exports = React.createClass({
  // TimelineDayElement
  // TODO
  // - add prospect list progression
  // - add scheduled followup
  //
  getInitialState: function() {
    // 
    return {
      followupCompleted: 0,
    }
  },

  addFollowup: function() {
    this.props.addFollowup(this.props.dayCount)
  },

  render: function() {
    if(this.props.addTemplateMode) {
      mode = <EditTemplate addFollowup={this.props.addFollowup}
                           saveFollowup={this.props.saveFollowup}
                           removeFollowup={this.props.removeFollowup}
                           dayCount={this.props.dayCount}
                           templates={this.props.templates}/>
    } else {
      mode = <TemplateFollowup currentTemplate={this.props.currentTemplate} 
                               editFollowup={this.props.editFollowup}
                               dayCount={this.props.dayCount}
                               currentBatch={this.props.currentBatch}
                               hasBatch={typeof(this.props.batchCount) != "undefined" && this.props.batchCount > 0}
                               setCurrentBatch={this.props.setCurrentBatch}
                               dayCount={this.props.dayCount}
                               removeFollowup={this.props.removeFollowup}
                               setCurrentTemplate={this.props.setCurrentTemplate}/>
    }
    if(this.props.alreadySent) {
      mode = <FollowupCompleted currentTemplate={this.props.currentTemplate} />
    }

    mode = (this.props.elementType) ? "" : mode
    addFollowup = (this.props.elementType) ? this.addFollowup : ""
    if(typeof(this.props.batchCount) != "undefined")
      batchStage = <BatchStage currentBatch={this.props.currentBatch} 
                               newProspects={this.props.newProspects} 
                               prospectListCount={this.props.prospectListCount} 
                               batchCount={this.props.batchCount} 
                               hasScheduledEmail={mode != ""} 
                               dayCount={this.props.dayCount} />
    else
      batchStage = ""

    dayCount = (this.props.dayCount != 0.5) ? "D"+this.props.dayCount : ""

    return (
      <div> 
        <div onClick={addFollowup} className="day" data-trigger="manual" >
          {dayCount} 
        </div>
        {mode}{batchStage}
      </div>
    )
  },

  setCurrentTemplate: function(template) {
    this.props.setCurrentTemplate(template)
  }
});

var FollowupCompleted = React.createClass({
  render: function() {
    return (
      <div className="followup-placement arrow_box_1 tmp_2"> 
        <h6 style={{width:130,display:'inline-block'}}>
          <i className="fa fa-file-text-o" />&nbsp;&nbsp;
          {(this.props.currentTemplate) ? this.props.currentTemplate.name : ""}
        </h6>
        <button className="win-btn btn btn-success btn-xs disabled"
                data-target=".bs-sendEmail-modal-lg"
                onClick={this.setCurrentTemplate}
                data-toggle="modal">
          <i className="fa fa-check"/>&nbsp;Sent</button>&nbsp;
        <button onClick={this.editFollowup}
                className="win-btn btn btn-default btn-xs disabled">
          <i className="fa fa-pencil" /></button>&nbsp;
        <button onClick={this.removeFollowup}
                className="win-btn btn btn-default btn-xs disabled">
          <i className="fa fa-trash-o" /></button>
      </div>
                                         )
  }
})

var TemplateFollowup = React.createClass({
  // EditMode False

  setCurrentTemplate: function() {
    this.props.setCurrentTemplate(this.props.currentTemplate)
    // setCurrentBatch
    this.props.setCurrentBatch(this.props.currentBatch)
    $('.bs-sendEmail-modal-lg').modal()
  },

  waitForBatch: function() {
    alertify.log("You must wait for a batch!");
  },

  render: function() {
    trash = (this.props.dayCount == 0) ?  <button onClick={this.removeFollowup}
                className="win-btn btn btn-default btn-xs disabled">
          <i className="fa fa-trash-o" /></button> : <button onClick={this.removeFollowup} className="win-btn btn btn-default btn-xs">
          <i className="fa fa-trash-o" /></button> 
    return (
      <div className="followup-placement arrow_box_1 tmp_2"> 
        <h6 style={{width:130,display:'inline-block'}}>
          <i className="fa fa-file-text-o" />&nbsp;&nbsp;
          {(this.props.currentTemplate) ? this.props.currentTemplate.name : ""}
        </h6>
        <button className="win-btn btn btn-success btn-xs"
          onClick={(this.props.hasBatch) ? this.setCurrentTemplate : this.waitForBatch}
                data-toggle="modal">
          <i className="fa fa-paper-plane"/>&nbsp;Send</button>&nbsp;
        <button onClick={this.editFollowup}
                className="win-btn btn btn-default btn-xs">
          <i className="fa fa-pencil" /></button>&nbsp;
        {trash}
      </div>
    );
  },

  editFollowup: function(e) { 
    e.preventDefault()
    console.log(this.props.dayCount)
    this.props.editFollowup(this.props.dayCount)
  },

  removeFollowup: function() {
    console.log('remove')
    this.props.removeFollowup(this.props.dayCount)
  }
});

var BatchStage = React.createClass({
  // Different Stages of People Added to Prospect List
  getInitialState: function() {
    return {
      initialBatchCount: this.props.batchCount
    }
  },

  componentDidMount: function() {
    // state
    //console.debug('INSIDE BATCH '+this.props.dayCount)
    console.debug(this.props.currentBatch)
    _batches = appConfig.pointer('ProspectBatch', this.props.currentBatch)
    if(this.props.batchCount == "~") {
      // Why doesnt this work 
      var thissss = this;
      console.debug('INSIDE BATCH '+thiss.props.dayCount)
      console.debug(_batches)
      $.ajax({
        url:'https://api.parse.com/1/classes/Prospect',
        batches: _batches,
        data: {
          where: JSON.stringify({
            batches: _batches
          }),
          count: true,
          limit:1000,
        },
        headers: appConfig.headers,
        success: function(res) { 
          //console.debug('SUCCESS GET COUNT ' + res.count)
          //console.debug(res.results) 
          thissss.setState({initialBatchCount: res.count})
        },
        error: function(err) { 
          thissss.setState({initialBatchCount: 0 })
        }
      })
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.dayCount == 0)
      this.setState({ initialBatchCount: nextProps.batchCount })
  },


  render: function() {
    if(this.props.hasScheduledEmail)
      batchStageStyle = {top:-42, left:6}
    else
      batchStageStyle = {}

    if(this.props.dayCount == 0.5)
      batchStageStyle.left = 7

    //console.log('BATCH STAGE')
    //console.log(this.props)
    //console.debug(this.props.currentBatch)                                                           

    return (
      <div className="followup-placement arrow_box tmp" style={batchStageStyle}>
        <span className="label label-primary">
          <i className="fa fa-user" />&nbsp;
          {this.state.initialBatchCount}
        </span>&nbsp;
        <h6 style={{display:'inline-block'}}> 
          prospects in the sales cycle.</h6>
      </div>
    );
  }
});

var EditTemplate = React.createClass({
  // Edit Mode - True
  render: function() {
    options = []
    for(i=0;i< this.props.templates.length; i++) {
      options.push( <option>{this.props.templates[i].name}</option>)
    }
    trash = (this.props.dayCount == 0) ?  <button onClick={this.removeFollowup}
                className="win-btn btn btn-default btn-xs disabled">
          <i className="fa fa-trash-o" /></button> : <button onClick={this.removeFollowup} className="win-btn btn btn-default btn-xs"> <i className="fa fa-trash-o" /></button> 
    return (
      <div className="followup-placement arrow_box_1 tmp_2"> 
        <h6 style={{width:55,display:'inline-block'}} 
            className="text-muted">
          Choose :
        </h6>
        <select className="form-control input-sm" 
                id="chooseTemplateForFollowup"
                style={{display:'inline-block',width:127,marginRight:5}}>
          {options}
        </select>

        <button className="win-btn btn btn-success btn-xs" 
                onClick={this.saveFollowup}
                style={{marginRight:5}}>
          <i className="fa fa-check" /></button>
        {trash}
      </div>
    )
  },

  saveFollowup: function(e) {
    //get template from currentTemplate
    e.preventDefault()
    chosenTemplate = $('#chooseTemplateForFollowup').val()
    console.log(chosenTemplate)
    for(i=0;i< this.props.templates.length; i++){
      if(this.props.templates[i].name == chosenTemplate){
        chosenTemplate = this.props.templates[i]
        break
      }
    }
    console.log(chosenTemplate)
    
    this.props.saveFollowup(this.props.dayCount, chosenTemplate)
  },

  removeFollowup: function(day) {
    this.props.removeFollowup(this.props.dayCount)
  },
});

