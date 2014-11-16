var PressCard = React.createClass({
  propTypes: {
    header: React.PropTypes.element,
    content: React.PropTypes.element.isRequired,
  },

  render: function() {
    className = 'press-card';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    if (this.props.header !== undefined) {
      var header = (
        <div className='header'>
          {this.props.header}
          <div className='press-clear'></div>
        </div>
      );
    } else {
      var header = null;
    }
    return (
      <div className={className}>
        {header}
        <div className='content'>
          {this.props.content}
        </div>
      </div>
    );
  }
});
