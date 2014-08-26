/** @jsx React.DOM */

data = require('../lib/data.min.js') 

module.exports = React.createClass({
  // free trial
  open: function() {
    console.log('open')
    handler.open({
      name: 'Customero',
      description: 'Get 900 free email credits!',
      amount: 0,
      panelLabel: "Start Your Free Trial!",
      open: function() {
        console.log($('.close'))
        $('.close').hide()
      },
      closed: function() {
        console.log("closed")
      }
    });
  },

  componentDidMount: function() {
    $('body').css({overflow:'hidden'})


    //console.log(this.getDOMNode())
    /*
    $(this.getDOMNode()).append(' <form action="" method="POST"> <script src="https://checkout.stripe.com/checkout.js" class="stripe-button" data-key="pk_test_4T5Pftl4ho0EgFVo1G7OKRda" data-amount="2000" data-name="Demo Site" data-description="2 widgets ($20.00)" data-image=""> </script> </form>')

  setTimeout(function() {
    console.log($('.stripe-button-el').html())
    $('.stripe-button-el').click()

  }, 400)
*/

  },

  render: function() { 
  data = data()
    imgs_1 = []
    imgs_2 = []
    for(i=0;i < 120; i++) {
      imgs_1.push(<img src={data[i]} className="prospect-img" />)
    }
    for(i=15;i < 30; i++) {
      imgs_2.push(<img src={data[i]} className="prospect-img" />)
    }

  console.log(data)
    return (
      <div>
      <div id="signup"> </div>

      <div>
        <h1 className="title">Customero.</h1>
        <h5 className="tagline">Get 900 free email credits. 100% refund guarantee.  We will only start charging your card after 1 month.</h5>

      </div>

      <div id="" style={{position:'absolute',zIndex:'-2',top:0,left:0}}>
        <div className="" style={{marginLeft:34}}>
        {imgs_1}
        {imgs_2}
        </div>
      </div>
      </div>
    )
  }
});
