var PressButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
  },

  handleClick: function(event) {
    event.preventDefault();
    this.props.onClick();
  },

  render: function() {
    var className = 'press-button';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    return (
      <a href='#' className={className} onClick={this.handleClick}>
        {this.props.label}
      </a>
    );
  }
});
