
module.exports = React.createClass({
  // TimelineDayElement
  // TODO
  // - add prospect list progression
  // - add scheduled followup
  //

  addFollowup: function() {
    this.props.addFollowup(this.props.dayCount)
  },

  render: function() {
    batchCount = this.props.batchCount
    batchStage = (batchCount) ? <BatchStage batchCount={this.props.batchCount} /> : ""

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
                               removeFollowup={this.props.removeFollowup}
                               setCurrentTemplate={this.props.setCurrentTemplate}/>
    }
    mode = (this.props.elementType) ? "" : mode
    addFollowup = (this.props.elementType) ? this.addFollowup : ""

    return (
      <div> 
        <div onClick={addFollowup} className="day" data-trigger="manual" >
          {"D"+this.props.dayCount} 
        </div>
        {batchStage}{mode}
      </div>
    )
  },

  setCurrentTemplate: function(template) {
    this.props.setCurrentTemplate(template)
  }
});

var TemplateFollowup = React.createClass({
  // EditMode False

  setCurrentTemplate: function() {
    this.props.setCurrentTemplate(this.props.currentTemplate)
  },

  render: function() {
    return (
      <div className="followup-placement arrow_box_1 tmp_2"> 
        <h6 style={{width:130,display:'inline-block'}}>
          <i className="fa fa-file-text-o" />&nbsp;&nbsp;
          {(this.props.currentTemplate) ? this.props.currentTemplate.name : ""}
        </h6>
        <button className="win-btn btn btn-success btn-xs"
                data-target=".bs-sendEmail-modal-lg"
                onClick={this.setCurrentTemplate}
                data-toggle="modal">
          <i className="fa fa-paper-plane"/>&nbsp;Send</button>&nbsp;
        <button onClick={this.editFollowup}
                className="win-btn btn btn-default btn-xs">
          <i className="fa fa-pencil" /></button>&nbsp;
        <button onClick={this.removeFollowup}
                className="win-btn btn btn-default btn-xs">
          <i className="fa fa-trash-o" /></button>
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
  render: function() {
    return (
      <div className="followup-placement arrow_box tmp">
        <span className="badge">
          {this.props.batchCount}
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
        <button className="win-btn btn btn-default btn-xs"
                onClick={this.removeFollowup}>
          <i className="fa fa-trash-o" /></button>
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

