var PressLoadingAnimation = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
  },

  render: function() {
    return <img
      id={this.props.id}
      height='20'
      width='20'
      src='/press_images/throbber.svg'
    />;
  }
});
