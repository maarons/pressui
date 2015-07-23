var PressForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    submitLabel: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
  },

  render: function() {
    var className = 'press-form';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    var content = $.map(
      this.props.items,
      function(item, i) {
        return <span key={i}>{item}</span>;
      }
    );
    return (
      <form
        className={className}
        action='#'
        onSubmit={this.handleSubmit}
      >
        <div id='press-form-error'></div>
        {content}
        <input
          type='submit'
          className='press-right press-button'
          value={this.props.submitLabel}
        />
      </form>
    );
  }
});
