/** @jsx React.DOM */

module.exports = React.createClass({
  //SideMenuListOption
  getInitialState: function() {
    return {count: '~'}
  },

  componentDidMount: function() {
    // make ajax request to get each requests 
    /*
    list = {
      '__type'    : 'Pointer',
      'objectId'  : this.props.list.objectId,
      'className' : 'ProspectList', 
    }

    parse_headers = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
    }

    thiss = this;

    //console.log(this.props.list.name)
    $.ajax({
      url:'https://api.parse.com/1/classes/Prospects',
      type:'GET',
      headers:parse_headers,
      data: 'where={"lists":'+JSON.stringify(list)+'}&count=1',
      success: function(res) {
        thiss.setState({count: res.count})
      },
      error: function(err) {
        console.log(err)
      }
    })
    */
  },

  changeList: function() {
    this.props.changeList(this.props.list.name, this.props.list.objectId)
  },

  render: function() {
    listName = this.props.list.name
    propsCount = this.props.count
    count = (typeof(propsCount)== "undefined") ? this.state.count : propsCount

    //console.log(this.props.iconType)
    icon = ""
    if(this.props.iconType == "archive"){
      icon = <i className="fa fa-archive" style={{float:'left',lineHeight:1.5,marginRight:5}}/>
    } else if(this.props.iconType == "users"){
      icon = <i className="fa fa-user" style={{float:'left',lineHeight:1.5,marginRight:5}} />
    } else if(this.props.iconType == "wifi"){
      icon = <i className="fa fa-wifi" style={{float:'left',lineHeight:1.5,marginRight:5}} />
    } else if(this.props.iconType == "cloudDownload"){
      icon = <i className="fa fa-cloud-download" style={{float:'left',lineHeight:1.5,marginRight:5}} />
    }


    countStyle = (this.props.hideCount) ? {'display':'none'} : {backgroundColor:'#999',float:'right',marginTop:2.25}
    listStyle=(icon == "") ? "list-name" : "icon-list-name"
    if(this.props.iconType == "users")
      listStyle = "all-list-name" 
    return (
      <button type="button" 
              onClick={this.changeList} 
              className="list-names btn btn-default">
              {icon}
              &nbsp;
              <span className={listStyle}>{listName}</span>
              <div style={countStyle}
                className="badge badge-default">{this.props.list.count}</div>      
      </button>
    );
  }
});

