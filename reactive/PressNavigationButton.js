var PressNavigationButton = React.createClass({
  render: function() {
    var props = $.extend(true, {}, this.props);
    if (props.className === undefined) {
      props.className = ' ';
    }
    props.className += ' press-button';
    return <PressNavigationLink {...props}/>;
  }
});
