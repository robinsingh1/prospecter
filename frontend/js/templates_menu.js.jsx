/** @jsx React.DOM */

module.exports = React.createClass({
  //TemplatesMenu

  toggleTemplateEditMenu: function(currentTemplate) {
    this.props.toggleTemplateEditMenu(currentTemplate)
  },

  render: function() {
    //console.log(this.props.templates)
    templates = []
    for(i=0;i< this.props.templates.length; i++) {
      templates.push(
        <TemplateListItem 
          toggleTemplateEditMenu={this.toggleTemplateEditMenu}
          template={this.props.templates[i]} />
      )
    }

    return (
      <div className="" style={{padding:'0', borderRight:'2px solid rgba(0,0,0,0)',height:'100%',textAlign:'center'}}>
        <div className="panel panel-default" 
             style={{borderRight:0,borderRadius:0,height:'100%'}}>
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
          <ul className="list-group" 
              style={{textAlign:'left', borderBottom:'1px solid #ddd'}}>
            {templates}
          </ul>
        </div>
      </div>
    )
  }
});

var TemplateListItem = React.createClass({
  toggleTemplateEditMenu: function() {
    console.log(this.props.template)
    this.props.toggleTemplateEditMenu(this.props.template)
  },
  render: function() {
    return (
      <div>
        <a href="javascript:" 
           onClick={this.toggleTemplateEditMenu} 
           className="list-group-item">
           <span className="label label-default">
             {this.props.template.name}
           </span>
           <h6>Subject:<span className="text text-muted"> 
             {" " + this.props.template.subject}
           </span></h6>
         </a>
      </div>
    );
  }
});
