var PressForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    submitLabel: React.PropTypes.string.isRequired,
  },

  render: function() {
    var className = 'press-form';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    return (
      <form
        className={className}
        action='#'
        onSubmit={this.props.onSubmit}
      >
        <div id='press-form-error'></div>
        {this.props.children}
        <input
          type='submit'
          className='press-right press-button'
          value={this.props.submitLabel}
        />
      </form>
    );
  }
});
