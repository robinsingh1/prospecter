/** @jsx react.dom */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      
    }
  },

  componentDidMount: function() {
    $('.template-body').html(this.state.templateBody)
  },

  clickedOverlay: function() {
    console.log('clicked overlay')
    this.props.toggleTemplateEditMenu()
  },

  changeMode: function() {
    // Update template html on toggle
    console.log('EDIT MODE')
    console.log(this.state.editMode)
    parse_headers = appConfig.parseHeaders
    if(this.state.editMode){
      $('.summer').destroy();
      this.props.saveTemplate({
        name: this.state.name,
        templateBody: $('.summer').code(),
        templateSubject: $('.subject').val(),
      })
      this.setState({
        templateBody: $('.summer').code(),
        templateSubject: $('.subject').val(),
        editMode: !this.state.editMode,
      })
      $.ajax({
        url:'https://api.parse.com/1/classes/Templates/'+this.props.initialTemplateValues.objectId,
        type:'PUT',
        headers:parse_headers,
        data:JSON.stringify({body: $('.summer').code(),subject: $('.subject').val()}),
        success: function(res) {
          console.log(res)
        },
        error: function(err) {
          console.log(err)
        }
      });
    } else {
      this.setState({ editMode: !this.state.editMode })
    }
  },

  componentDidUpdate: function() {
    /* thiss = this; */

    console.log('OTHER')
    if(this.state.editMode){
      console.log('CALLED')
      // Replace Subject 
      $('.subject').val(this.state.templateSubject)

      $('.summer').summernote({
        height: 200,
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
        ]
      })

      // Initialize Editor with html
      $('.summer').code(this.state.templateBody)
    }
  },


  render: function() {
    subjectPlace = (this.state.editMode) ? <input style={{display:'inline',width:480}} className="form-control subject" ></input> : this.state.templateSubject

    if(this.state.editMode){
       toggleButton = <a href="javascript:" 
             onClick={this.changeMode}
             className="btn btn-success btn-xs" 
             style={{display:'block',float:'right',marginTop:5}}>
            <i className="fa fa-save" /> &nbsp; Save Template</a>
    } else {
       toggleButton = <a href="javascript:" 
             onClick={this.changeMode}
             className="btn btn-primary btn-xs" 
             style={{display:'block',float:'right',marginTop:5}}>
            <i className="fa fa-pencil-square" /> &nbsp; Edit Template</a>
    }

    return (
      <div>
      <div onClick={this.clickedOverlay} id="editTemplateOverlay"></div>
      <div id="editTemplateView" 
           className="panel panel-info" 
           style={{display:'block'}}>
           <div className="panel-heading" style={{height:50}}> 
             <h6 style={{float:'left'}}>
               <i className="fa fa-file-text-o" /> 
               {"  " + this.props.initialTemplateValues.name}
             </h6>
          {toggleButton}
        </div>
        <div className="panel-body">
          <div className="editTemplateTitle">
            <span>Subject: </span>
            {subjectPlace}
          </div>
         <br/>
         <div className="templateDetails">
           <h6 style={{marginBottom:'0'}} className="text-muted">
             Created by Mark on Jul. 21, 2014
           </h6>
           <h6 style={{marginTop:'0'}} className="text-muted">
             last updated 7 days ago
           </h6>
         </div>
        <br/>
        <div className="panel panel-default"> 
          <div className="panel-body summer template-body">
          </div>
        </div>
    </div>
</div>
</div>
    );
  }
});
