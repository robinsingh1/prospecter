/** @jsx React.DOM */

//SideMenuListOption
module.exports = React.createClass({
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
      icon = <i className="fa fa-archive" />
    } else if(this.props.iconType == "users"){
      icon = <i className="fa fa-user" />
    }


    countStyle = (this.props.hideCount) ? {'display':'none'} : {backgroundColor:'#999',float:'right',marginTop:'1px'}
    return (
      <button type="button" 
              onClick={this.changeList} 
              className="list-names btn btn-default">
              {icon}
              &nbsp;
              {listName}
              <span style={countStyle}
                className="badge badge-default">{this.props.list.count}</span>      
      </button>
    );
  }
});

