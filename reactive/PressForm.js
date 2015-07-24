var PressForm = React.createClass({
  propTypes: {
    submitLabel: React.PropTypes.string.isRequired,
    action: React.PropTypes.string,
    processData: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onError: React.PropTypes.func,
  },

  getInitialState: function() {
    return {errorMessage: ''};
  },

  handleSubmit: function(event) {
    var node = React.findDOMNode(this);
    var inputs = $(node).find('input');
    var data = {};
    $.each(
      inputs,
      function(_, input) {
        input = $(input);
        if (input.attr('name') !== undefined) {
          data[input.attr('name')] = input.val();
        }
      }
    );
    var this_ = this;
    if (this.props.processData !== undefined) {
      data = this.props.processData(data);
      var onError = function(ret) {
        var message = this_.props.onError(ret);
        this_.setState({errorMessage: message});
      }
      $.ajax({
        url: this_.props.action,
        type: 'POST',
        data: data,
        success: function(ret) {
          if (!this_.props.onSuccess(ret)) {
            onError(ret);
          }
        },
        error: onError,
      });
    } else {
      this.props.onSubmit(data);
    }
    event.preventDefault();
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
        onSubmit={this.handleSubmit}
      >
        <div>{this.state.errorMessage}</div>
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
