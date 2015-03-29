var PressListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.element.isRequired,
  },

  render: function() {
    return (
      <li className='press-list-item'>
        {this.props.item}
      </li>
    );
  }
});

var PressList = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
  },

  render: function() {
    var content = $.map(
      this.props.items,
      function(item, i) {
        return <PressListItem key={i} item={item}/>;
      }
    );
    return (
      <div className='press-list'>
        {content}
      </div>
    );
  }
});
