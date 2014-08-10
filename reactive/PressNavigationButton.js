var PressNavigationButton = React.createClass({
  propTypes: {
    uri: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
  },

  handleClick: function(event) {
    if (this.props.onClick === undefined) {
      PressNavigation.switchToUri(this.props.uri, this.props.params);
    } else {
      this.props.onClick(this.props.uri, this.props.params);
    }
    return false;
  },

  render: function() {
    className = 'press-button';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    var uri = this.props.uri;
    if (this.props.params !== undefined) {
      uri += PressNavigation.paramsToQueryStr(this.props.params);
    }
    return (
      <a href={uri} className={className} onClick={this.handleClick}>
        {this.props.label}
      </a>
    );
  }
});
