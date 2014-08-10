var PressLoadingAnimation = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
  },

  render: function() {
    return <div id={this.props.id}>Loading…</div>;
  }
});
