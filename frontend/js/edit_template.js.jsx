/** @jsx React.DOM */

module.exports = React.createClass({
  //EditTemplateView
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
      <div id="editTemplateView" 
           className="panel panel-info" 
           style={{display:'none'}}>
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
