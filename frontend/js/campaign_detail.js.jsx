/** @jsx React.DOM */
var TemplatesMenu = require('./templates_menu.js.min.js');
var EditTemplateView = require('./edit_template.js.min.js');

module.exports = React.createClass({
  // Campaign Detail
  getInitialState: function() {
    return {
      selectedTemplate: 0,
      editMode: false,
    }
  },
  componentDidMount: function() {
    thiss = this;
    $('.day').tooltip()
    $('.day-popover').popover({
      html:true,
      //content:'<button class="win-btn btn btn-success btn-xs">Win</button'
      content:'<button class="win-btn btn btn-default btn-xs"><i class="fa fa-pencil"></i></button>'
    })

    $('.day-popover').popover('show')
    $('.win-btn').click(function() {
      console.log('clicked win btn')
    });
  },

  returnToOverview: function() {
    this.props.toggleScreen('Campaigns')
  },

  render: function() {
    thiss = this;
    if(this.state.editMode) {
      $('#editTemplateOverlay').remove()
      $('.col-md-10').append('<div id="editTemplateOverlay"></div>')
      $('#editTemplateView').show()
      $('#editTemplateOverlay').click(function() {
        thiss.toggleTemplateEditMenu()
        console.log('overlay')
      });
    } else {
      $('#editTemplateOverlay').remove()
      $('#editTemplateView').hide()
    }

    timelineElements = []
    for(i=0;i< 31;i++){
      timelineElements.push(<TimelineDayElement 
                              dayCount={i}
                              elementType={true}
                              toggleTemplateEditMenu={this.toggleTemplateEditMenu}
                            />)
    }

    return (
      <div className="container" style={{width:'100%',height:'100%',paddingLeft:0,paddingRight:0}}>
        <div style={{marginBottom:30}}>
        <h5 style={{marginTop:20,marginLeft:20}}>
          <a href="javascript:" onClick={this.returnToOverview} >Campaigns </a>
          <small>
            <i style={{marginLeft:10, marginRight:10}} 
               className="fa fa-chevron-right" />
          </small>
          VP of Business Development Outreach
        </h5>
        <h6 style={{marginLeft:20}}>
          <span className="text-muted">Prospect List:</span> &nbsp;
          VP of Business Developments
        </h6>
        </div>
          <div className="col-md-8 panel panel-default" 
               style={{height:'363px',paddingLeft:305,paddingTop:50,overflow:'auto',borderRight:0,borderRadius:0}}>
            <div className="timeline" 
                 style={{height:'900px',backgroundColor:'rgb(90, 107, 119)',width:5}}>
          
            {timelineElements}
 
            </div>
          </div>
          <div className="col-md-4" 
               style={{paddingLeft:0,paddingRight:0,height:363}}>
            <TemplatesMenu 
              toggleTemplateEditMenu={this.toggleTemplateEditMenu}/>
          </div>

          <EditTemplateView />
      </div>
    );
  },

  toggleTemplateEditMenu: function() {
    console.log(this.getDOMNode())
    this.setState({
      editMode: !this.state.editMode
    })
  }
});

var TimelineDayElement = React.createClass({
  render: function() {
    timelineDay = "lol"
    if(this.props.elementType) {
      timelineDay = <div className="day" 
                         onClick={this.props.toggleTemplateEditMenu}
                         data-toggle="tooltip" 
                         data-placement="left" 
                         title="+ Add a follow-up">{"D"+this.props.dayCount}</div>
    } else {
      timelineDay = <div className="day day-popover" 
                         onClick={this.props.toggleTemplateEditMenu}
                         data-toggle="popover"
                         data-placement="right">{"D"+this.props.dayCount} </div>
    }
    return (
      <div>
      {timelineDay}
      </div>
    )
  }
});
