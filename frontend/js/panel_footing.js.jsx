/** @jsx React.DOM */

module.exports = React.createClass({
  // Panel Footing
  paginatePrevious: function() {
    thiss = this;

    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospects?skip='+(thiss.props.currentPage-2)*thiss.props.prospectsPerPage,
      type:'GET',
      headers: parse_headers,
      data: 'where={"company":'+company+'}&count=1',
      success: function(res){
        //thiss.setState({prospects: res.results})
        //thiss.setState({currentPage: this.props.currentPage - 1})
        thiss.props.paginate(res.results, thiss.props.currentPage - 1)
      },
      error: function(res){
        console.log(res)
      }
    });
  },


  paginate: function(direction) {
    prospectsPerPage = this.props.prospectsPerPage
    if(direction=='previous')
      skip = (this.props.currentPage - 2)*prospectsPerPage
    else if(direction=="forward")
      skip = this.props.currentPage*prospectsPerPage

    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospect?skip='+skip,
      type:'GET',
      headers: parse_headers,
      data: 'where={"company":'+company+'}&count=1',
      success: function(res){
        //thiss.setState({prospects: res.results})
        //thiss.setState({currentPage: this.props.currentPage + 1})
        this.props.paginate(res.results, this.props.currentPage + 1)
      },
      error: function(res){
        console.log(res)
      }
    });
  },

  paginateForward: function() {
    thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospects?skip='+thiss.props.currentPage*thiss.props.prospectsPerPage,
      type:'GET',
      headers: parse_headers,
      data: 'where={"company":'+company+'}&count=1',
      success: function(res){
        //thiss.setState({prospects: res.results})
        //thiss.setState({currentPage: thiss.props.currentPage + 1})
        console.log("success")
        thiss.props.paginate(res.results, thiss.props.currentPage + 1)
      },
      error: function(res){
        console.log(res)
      }
    });
  },
  componentDidMount: function() {
    paginateForward = this.paginateForward
    paginatePrevious = this.paginatePrevious

    Mousetrap.bind('l', function() { 
      console.log('new forward')
      paginateForward()
    });

    Mousetrap.bind('h', function() { 
      console.log('new back')
      paginatePrevious()
    });
  },

  render: function() {
    // Should be handled by Panle Footing


    previous = (this.props.currentPage - 1) ? '' : 'disabled'
    forward = (this.props.currentPage == this.props.pages) ? 'disabled' : ''

    lowerLimit = (this.props.currentPage-1)*this.props.prospectsPerPage
    upperLimit = this.props.currentPage*this.props.prospectsPerPage

    lowerLimit = (lowerLimit) ? lowerLimit : 1
    upperLimit = (upperLimit > this.props.count) ? this.props.count : upperLimit

    return (
      <div className="panel-footing" 
           id="navbar" 
           style={{height:'35px',padding:'0px', paddingTop:'7px'}}>
          <span style={{float:'right',marginRight:'20px'}}>
            <a href="javascript:" 
               style={{marginRight:'5px'}} 
               onClick={this.paginatePrevious} 
               className={"blue-gradient btn btn-primary btn-xs "+previous} >
            <i className="fa fa-fast-backward" />
          </a>
          <a href="javascript:" 
             onClick={this.paginatePrevious} 
             className={"paginate-back-btn blue-gradient btn btn-primary btn-xs "+previous} >
            <i className="fa fa-chevron-left" />
          </a>
          <span style={{marginLeft:5, marginRight:5}}>
            {lowerLimit+' - '+upperLimit+' of '+this.props.count}
          </span>
          <a href="javascript:" 
             onClick={this.paginateForward} 
             className={"paginate-forward-btn blue-gradient btn btn-primary btn-xs "+forward}>
            <i className="fa fa-chevron-right" />
          </a>
          <a href="javascript:" 
             style={{marginLeft:'5px'}} 
             onClick={this.paginateForward} 
             className={"blue-gradient btn btn-primary btn-xs "+forward}>
            <i className="fa fa-fast-forward" /></a>
          </span>
        </div>
    );
  }
});
