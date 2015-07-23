var PressAccordionElementMixin = {
  handleClick: function(event) {
    var newState = !this.state['press-accordion-element-target'];
    if (newState) {
      var accordion = $(React.findDOMNode(this)).parents('.press-accordion');
      var elements = accordion.find('.press-accordion-element.target');
      elements.find('.press-accordion-element-header').click();
    }
    this.setState({
      'press-accordion-element-target': newState,
    });
    event.preventDefault();
  },

  getInitialState: function() {
    return {'press-accordion-element-target': false};
  },

  renderElement: function(header, body) {
    var className = 'press-accordion-element';
    if (this.state['press-accordion-element-target']) {
      className += ' target';
    }
    return (
      <div className={className}>
        <h3
          className='press-accordion-element-header'
          onClick={this.handleClick}
        >{header}</h3>
        <div className='press-accordion-element-body'>
          <div className='press-accordion-element-wrap'>
            {body}
          </div>
        </div>
      </div>
    );
  }
};

var PressAccordion = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
  },

  render: function() {
    var content = $.map(
      this.props.items,
      function(item, i) {
        return <span key={i}>{item}</span>;
      }
    );
    return (
      <div className='press-accordion'>
        {content}
      </div>
    );
  }
});

var press_hide_accordion_under_element = function(element) {
  var node = null;
  try {
    node = React.findDOMNode(element);
  } catch(e) {
    // This will fail first time the object is rendered;
  }
  if (node !== null) {
    // Hide the open accordion elements.
    var elements = $(node).find('.press-accordion-element.target');
    elements.find('.press-accordion-element-header').click();
  }
}
