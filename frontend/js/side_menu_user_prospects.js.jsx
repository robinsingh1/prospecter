/** @jsx React.DOM */

var SideMenuListOption = require('./user_side_menu_list.js.min.js');
var createListModal = require('./create_list_modal.js.min.js')

module.exports = React.createClass({
  //SideMenuProspects - SideList
  getInitialState: function() {
    return {
      /*
      createList: 
      changeList:
      currentList
      totalCount
      lists
      */
    }
  },
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
    if(this.props.currentList == "All")
      styles = {'backgroundColor':'rgb(0, 122, 255)', 'color':'white'} 
    else
      styles =  {}

    lists = [<SideMenuListOption list={{name: 'All',count: this.props.totalCount}} 
                                 iconType={'users'} 
                                 changeList={this.props.changeList} />, 
             <SideMenuListOption list={{name: 'Archived', count: '~'}} 
                                 iconType={'archive'} 
                                 changeList={this.props.changeList} 
                                 hideCount={true}/>]

    for(i=0;i< this.props.lists.length;i++){
      list = this.props.lists[i]
      if(list.signal_list)
        lists.push( <SideMenuListOption list={list} 
                                        iconType={'wifi'}
                                        changeList={this.props.changeList}/>)
      else 
        lists.push( <SideMenuListOption list={list} 
                                        changeList={this.props.changeList}/>)
    }

    return (
      <div className="col-md-2" 
           style={{padding:'0',height:'438px',backgroundColor:'#e0e9ee',
                   borderRight:'1px solid #b0b8bf',textAlign:'center'}}>
        <div className="prospect-list-header"> Lists </div>
        <div className="btn-group-vertical" 
             style={{width:'100%', height: '320px', overflow: 'auto'}}>
          {lists}
        </div>
        <br/><br/>
        <a href="javascript:" className="btn btn-primary new-list-btn" 
              data-toggle="modal" data-target=".bs-example-modal-sm"
              style={{ backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}>
          <i className="fa fa-plus-circle" />&nbsp;&nbsp;New List
        </a>
        <createListModal createList={this.createList} /> <br/>
      </div>
    );
  },
});
