/** @jsx React.DOM */
//TODO - move list
//TODO - copy list
//TODO - create new list

module.exports = React.createClass({
  //SideMenuListOption
  getInitialState: function() {
    return {
      count: '~',
    }
  },


  componentDidMount: function() {
  },

  changeList: function() {
    this.props.changeList(this.props.list.name, this.props.list.objectId)
  },

  getIconType: function(iconType) {
    icon = ""
    if(iconType == "archive"){
      icon = <i className="fa fa-archive" style={{float:'left',lineHeight:1.5,marginRight:5}}/>
    } else if(iconType == "users"){
      icon = <i className="fa fa-user" style={{float:'left',lineHeight:1.5,marginRight:5}} />
    } else if(iconType == "wifi"){
      icon = <i className="fa fa-wifi" style={{float:'left',lineHeight:1.5,marginRight:5}} />
    } else if(iconType == "cloudDownload"){
      icon = <i className="fa fa-cloud-download" style={{float:'left',lineHeight:1.5,marginRight:5}} />
    }
    return icon
  },

  render: function() {
    listName = this.props.list.name
    propsCount = this.props.count
    count = (typeof(propsCount)== "undefined") ? this.state.count : propsCount

    icon = ""
    listStyle=(icon == "") ? "list-name" : "icon-list-name"
    if(this.props.iconType == "users")
      listStyle = "all-list-name" 
    count = <div className="badge badge-default cnt-bg">{this.props.list.count}</div>
    count = (this.props.hideCount) ? "" : count
    return (
      <button type="button" 
              onClick={this.changeList} 
              className="list-names btn btn-default">
              {icon} &nbsp; <span className={listStyle}>{listName}</span> {count}
      </button>
    );
  }
});

