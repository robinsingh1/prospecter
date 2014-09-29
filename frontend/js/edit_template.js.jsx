/** @jsx React.DOM */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.initialTemplateValues.name,
      body: this.props.initialTemplateValues.body,
      subject: this.props.initialTemplateValues.subject,
      editMode: this.props.initialTemplateValues.editMode
    }
  },

  componentDidMount: function() {
    console.log('did mount')
    $('.template-body').html(this.state.body)
    if(this.state.editMode) {
      $('.summer').summernote({
        height: 200,
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
        ]
      })
    }

    /*
    var example = {
        "glossary": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        "GlossSee": "markup"
                    }
                }
            },
        "glossary": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        "GlossSee": "markup"
                    }
                }
            }
        }
        },
    };
    */
    renderjson.set_show_to_level('all')
    prospect = _.pick(this.props.prospect, 
      'company_name', 'name', 'pos'
    )
    prospect.first_name = prospect.name.split(' ')[0]
    prospect.last_name = _.last(prospect.name.split(' '))
    prospect = _.omit(prospect, 'name')

    document.getElementById("editTemplate").appendChild(renderjson(prospect));
    $('#editTemplateOverlay').html()
    thiss = this;
    $('.renderjson').click(function() {
      thiss.props.toggleTemplateEditMenu()
    })

    $('.renderjson').css({
      'position': 'absolute',
      'z-index': '1000000000',
      'background-color':'rgba(0,0,0,0)',
      'border':'0',
      'color':'white',
      'margin-top':'-100px',
      'height': '542px',
      'overflow':'auto',
      'width':'380px'
    })

    $('.key').css({
      'cursor':'pointer'
    })

    $('.timeline').css({
      '-webkit-filter': 'blur(10px)',
    })
    $('#campaign-top-detail').css({
      '-webkit-filter': 'blur(10px)',
    })
  },
  componentWillUnmount:function() {
    $('.timeline').css({
      '-webkit-filter': '',
    })
    $('#campaign-top-detail').css({
      '-webkit-filter': '',
    })
  },

  clickedOverlay: function() {
    console.log('clicked overlay')
    this.props.toggleTemplateEditMenu()
  },

  changeMode: function() {
    // Update template html on toggle
    parse_headers = appConfig.parseHeaders
    if(this.state.editMode){
      $('.summer').destroy();
      $('.timeline').css({
        '-webkit-filter': 'blur(20px)',
      })

      console.log('look at this')
      console.log(name)
      name = (this.props.initialTemplateValues.newTemplate) ? $('#template-name').val() : this.state.name
      this.props.saveTemplate({
        name: name,
        body: $('.summer').code(),
        subject: $('.subject').val(),
      }, this.props.initialTemplateValues.newTemplate)

      this.setState({
        name: $('#template-name').val(),
        body: $('.summer').code(),
        subject: $('.subject').val(),
        editMode: !this.state.editMode,
      })

      objId = this.props.initialTemplateValues.objectId
      $.ajax({
        url:'https://api.parse.com/1/classes/Templates/'+objId,
        type:'PUT',
        headers:parse_headers,
        data:JSON.stringify({body: $('.summer').code(),
                             subject: $('.subject').val()}),
        success: function(res) {
          console.log(res)
        },
        error: function(err) {
          console.log(err)
        }
      });
    } else {
      this.setState({ editMode: !this.state.editMode })
      $('.timeline').css({
        '-webkit-filter': 'blur(20px)',
      })
    }
  },

  componentWillUpdate: function(newProps) {
    console.log('THE NEW PROPS')
    console.log(newProps)
  },

  componentDidUpdate: function() {
    /* thiss = this; */
    console.log('OTHER')
    if(this.state.editMode){
      console.log('CALLED')
      // Replace Subject 
      $('.subject').val(this.state.subject)
      $('#template-name').val(this.state.name)

      $('.summer').summernote({
        height: 200,
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
        ]
      })

      // Initialize Editor with html
      $('.summer').code(this.state.body)
    }
  },


  render: function() {
    subjectPlace = (this.state.editMode) ? <input style={{display:'inline',width:480}} className="form-control subject" ></input> : this.state.subject

    if(this.state.editMode){
       toggleButton = <a href="javascript:" 
             onClick={this.changeMode}
             className="btn btn-success btn-xs" 
             style={{display:'block',float:'right',marginTop:5}}>
            <i className="fa fa-save" /> &nbsp; Save Template</a>

       if(this.props.initialTemplateValues.newTemplate){
         the_name = <input className="form-control" 
                           id="template-name" 
                           style={{float:'left',width:200}}/>
       }
    } else {
       toggleButton = <a href="javascript:" 
             onClick={this.changeMode}
             className="btn btn-primary btn-xs" 
             style={{display:'block',float:'right',marginTop:5}}>
            <i className="fa fa-pencil-square" /> &nbsp; Edit Template</a>

       the_name = <h6 style={{float:'left'}}>
                   <i className="fa fa-file-text-o" />&nbsp;
                   {this.state.name}
                  </h6>
    }

    return (
      <div id="editTemplate">
      <div onClick={this.clickedOverlay} id="editTemplateOverlay"></div>
      <div id="editTemplateView" 
           className="panel panel-default" 
           style={{display:'block'}}>
           <div className="panel-heading" style={{height:50}}> 
             {the_name}
          {toggleButton}
        </div>
        <div className="panel-body">
          <div className="editTemplateTitle">
            <span>Subject: </span>
            {subjectPlace}
          </div>
         <br/>
         <div className="templateDetails">
           <h6 style={{marginBottom:'0'}} className="text-muted">
             Created by Mark on Jul. 21, 2014
           </h6>
           <h6 style={{marginTop:'0'}} className="text-muted">
             last updated 7 days ago
           </h6>
         </div>
        <br/>
        <div className="panel panel-default"> 
          <div className="panel-body summer template-body">
          </div>
        </div>
    </div>
</div>
</div>
    );
  }
});
