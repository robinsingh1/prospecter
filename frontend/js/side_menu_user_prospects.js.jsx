/** @jsx React.DOM */

var SideMenuListOption = require('./user_side_menu_list.js.min.js');
var createListModal = require('./create_list_modal.js.min.js')

module.exports = React.createClass({
  //SideMenuProspects
  createList: function (data) {
    this.props.createList(data)
  },

  componentDidMount: function() {
  },

  changeList: function(e) {
    /*
    currentList = $(e.target).parent()//.data('list')
    console.log(currentList)
    this.props.changeList(currentList.name, currentList.objectId)
    */
  },

  render: function() {
    
    styles = (this.props.currentList == "All") ? {'backgroundColor':'rgb(0, 122, 255)', 'color':'white'} : {}

    lists  = [ <button type="button" onClick={this.props.changeList} style={styles} className="list-names btn btn-default all">{'All'} 
      <span style={{float:'right',marginTop:'1px', backgroundColor:'#999'}} className="badge badge-default">{this.props.count}</span></button>,
      <button type="button" onClick={this.props.changeList} style={styles} className="list-names btn btn-default all">
        <i className="fa fa-archive" />&nbsp;&nbsp;
        {'Archived'} <span style={{float:'right',marginTop:'1px', backgroundColor:'#999'}} className="badge badge-default">{this.props.count}</span></button> ]
  
    for(i=0;i<this.props.lists.length;i++){
      list = this.props.lists[i]
      lists.push(
        <button type="button" onClick={this.props.changeList} data-list={JSON.stringify(list)} className="list-names btn btn-default">{list.name}<span style={{backgroundColor:'#999',float:'right',marginTop:'1px'}}className="badge badge-default">{list.count}</span>      </button>
      )
    }
    lists = [<SideMenuListOption list={{name: 'All',count: this.props.totalCount}} 
                iconType={'users'} 
                changeList={this.props.changeList} />, <SideMenuListOption list={{name: 'Archived', count: '~'}} iconType={'archive'} changeList={this.props.changeList} hideCount={true}/>]
    for(i=0;i<this.props.lists.length;i++){
      list = this.props.lists[i]
      lists.push(
        <SideMenuListOption list={list} changeList={this.props.changeList}/>
      )
    }

    
    return (
      <div className="col-md-2" style={{padding:'0',height:'438px',backgroundColor:'#e0e9ee',borderRight:'1px solid #b0b8bf',textAlign:'center'}}>
        <div className="prospect-list-header">
          Lists
        </div>
        <div className="btn-group-vertical" style={{width:'100%', height: '320px', overflow: 'auto'}}>
          {lists}
        </div>
        <br/>
        <br/>
        <a href="javascript:" className="btn btn-primary" 
              data-toggle="modal" data-target=".bs-example-modal-sm"
              style={{ backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}>
          <i className="fa fa-plus-circle" />&nbsp;&nbsp;New List
        </a>
        <createListModal createList={this.createList} />
        <br/>
      </div>
    );
  },

});
