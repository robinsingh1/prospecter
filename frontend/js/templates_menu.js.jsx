/** @jsx React.DOM */

module.exports = React.createClass({
  //TemplatesMenu
  getInitialState: function() {
    return {
      templates: [{'name':'lol'},{'name':'lmao' }],
    }
  },

  componentDidMount: function() {
    //Ajax Request For Templates
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

  toggleTemplateEditMenu: function() {
    this.props.toggleTemplateEditMenu()
  },

  render: function() {
    templates = []
    for(i=0;i< this.state.templates.length; i++)
      templates.push(<a href="javascript:" onClick={this.toggleTemplateEditMenu} className="list-group-item"><h6>{this.state.templates[i].name}</h6></a>)
    return (
      <div className="" style={{padding:'0', borderRight:'2px solid rgba(0,0,0,0)',height:'100%',textAlign:'center'}}>
        <div className="panel panel-default" style={{borderRight:0,borderRadius:0,height:'100%'}}>
          <div className="panel-heading" style={{height:40}}>
            <span style={{float:'left',fontSize:14,fontWeight:'bold'}}>
              <i className="fa fa-file-text-o" /> 
              <span style={{marginLeft:5}}>Templates</span>
            </span>
            <a href="javascript:" 
              className="btn btn-success btn-xs"
              onClick={this.props.toggleTemplateEditMenu}
                style={{float:'right'}}>
              <i className="fa fa-plus" /> 
              <span style={{marginLeft:5}}>Create Template</span>
            </a>
          </div>
          <ul className="list-group" style={{textAlign:'left', borderBottom:'1px solid #ddd'}}>
            {templates}
          </ul>
        </div>
      </div>
    )
  }
});
