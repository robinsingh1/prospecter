/** @jsx React.DOM */

module.exports = React.createClass({
  //Templates
  getInitialState: function() {
    return {
      selectedTemplate: 0,
      editMode: false
    }
  },

  changeMode: function() {
    this.setState({editMode: !this.state.editeMode})
  },

  render: function() {
    templateView = (!this.state.editMode) ? <TemplateView changeMode={this.changeMode}/> : <EditTemplateView />
    return (
      <div style={{height:'100%'}}>
        <TemplateSideMenu />
      <div className="col-md-9" style={{padding:0,height:'100%'}}>
          {templateView}
      </div>
    </div>
    );
  }
});

var EditTemplateView = React.createClass({
  componentDidMount: function() {
    $('.summer').summernote({
      toolbar: [
    //[groupname, [button list]]
     
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
  ]
    })

    $('.subject').val("Followup - Prospecting SAAS Outreach")
  },

  render: function() {
    return (
      <div className="panel panel-info" style={{width:'100%',height:'100%',border:0}}>
        <div className="panel-heading" >
          Template Name 
          <a href="javascript:" 
             onClick={this.changeMode}
             className="btn btn-primary btn-xs" 
             style={{display:'block',float:'right',marginTop:'0px'}}>
            <i className="fa fa-pencil-square" /> &nbsp; Edit Template</a>
        </div>
        <div className="panel-body">
        <span>Subject: </span><input style={{display:'inline',width:500}} className="form-control subject"></input>
        <h6 style={{marginBottom:'0'}} className="text-muted">Created by Mark on Jul. 21, 2014</h6>
        <h6 style={{marginTop:'0'}} className="text-muted">last updated 7 days ago</h6>
        <br/>
        <br/>

        <div className="panel panel-default">

          <div className="panel-body summer">
          15 minutes to get company_name more customers
          Hey first_name,

          Would you like to hear an idea for a 15 minute hack that could significantly increase the number of prospects your sales people have access to ?
           
          Recently one of our B2B clients saw a huge increase in trial sign ups after working with us. first_name, lets schedule a 15 minute call this week to see if this would be a good fit for both of us.
           
          What the best time for you this week ?
           
          --
          Mark 
          Customero
          mark@customerohq.com

    </div>
    </div>
    </div>
</div>
    );
  }
});

var TemplateView = React.createClass({
  changeMode: function() {
    this.props.changeMode()
  },
  render: function() {
    return (
      <div className="panel panel-info" style={{width:'100%',height:'100%',border:0}}>
        <div className="panel-heading" >
          Template Name 
          <a href="javascript:" 
             onClick={this.changeMode}
             className="btn btn-primary btn-xs" 
             style={{display:'block',float:'right',marginTop:'0px'}}>
            <i className="fa fa-pencil-square" /> &nbsp; Edit Template</a>
        </div>
        <div className="panel-body">
        <h4>Followup - Prospecting SAAS Outreach</h4>
        <h6 style={{marginBottom:'0'}} className="text-muted">Created by Mark on Jul. 21, 2014</h6>
        <h6 style={{marginTop:'0'}} className="text-muted">last updated 7 days ago</h6>
        <br/>
        <br/>

        <div className="panel panel-default">

          <div className="panel-body">
          15 minutes to get company_name more customers
          Hey first_name,

          Would you like to hear an idea for a 15 minute hack that could significantly increase the number of prospects your sales people have access to ?
           
          Recently one of our B2B clients saw a huge increase in trial sign ups after working with us. first_name, lets schedule a 15 minute call this week to see if this would be a good fit for both of us.
           
          What the best time for you this week ?
           
          --
          Mark 
          Customero
          mark@customerohq.com
          
          </div>
        </div>
      </div>
    </div>
    );
  },
});

var TemplateSideMenu = React.createClass({
  getInitialState: function() {
    return {
      templates: [],
    }
  },

  componentDidMount: function() {
    //Ajax Request For Components
    /*
     $.ajax({
      url:'',
      headers: "",
      data: "",
      success: function() {
      },
      error: function() {
      }
     });
    */
  },

  render: function() {
    templates = []
    for(i=0;i< this.state.templates.length; i++)
      templates.push(<a href="javascript:" className="list-group-item">templates[i].name</a>)
    return (
      <div className="col-md-3" style={{padding:'0', borderRight:'1px solid #ddd',height:'100%',textAlign:'center'}}>
        <div className="panel panel-default" style={{border:0}}>
          <div className="panel-heading" style={{height:60}}>
            <span style={{float:'left',fontSize:20,fontWeight:'bold'}}>
              Templates
            </span>
            <a href="javascript:" className="btn btn-success "
                style={{float:'right'}}>
              <i className="fa fa-plus" /> 
            </a>
          </div>
          <ul className="list-group" style={{textAlign:'left'}}>
            {templates}
          </ul>
        </div>
      </div>
    )
  }
});
