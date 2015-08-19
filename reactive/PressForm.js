var PressForm = React.createClass({
  propTypes: {
    submitLabel: React.PropTypes.string.isRequired,
    action: React.PropTypes.string,
    processData: React.PropTypes.func,
    // Can’t be used with `processData`.
    onSubmit: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onError: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      errorMessage: '',
      isSubmitting: false,
      submitProgress: 0,
    };
  },

  handleSubmit: function(event) {
    this.setState({'isSubmitting': true, 'submitProgress': 0});
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
      this.setState({'submitProgress': 50});
      var onError = function(ret) {
        var message = this_.props.onError(ret);
        this_.setState({
          'errorMessage': message,
          'submitProgress': 100,
        });
        setTimeout(function() {
          this_.setState({'isSubmitting': false});
        }, 1000);
      }
      $.ajax({
        url: this_.props.action,
        type: 'POST',
        data: data,
        success: function(ret) {
          this_.setState({'submitProgress': 100});
          setTimeout(function() {
            this_.setState({'isSubmitting': false});
            if (!this_.props.onSuccess(ret)) {
              onError(ret);
            }
          }, 1000);
        },
        error: onError,
      });
    } else {
      this.setState({'isSubmitting': false});
      this.props.onSubmit(data);
    }
    event.preventDefault();
  },


  render: function() {
    var className = 'press-form';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    var overlay = null;
    if (this.state.isSubmitting) {
      overlay = <PressModalProgressBar
        title={'Submitting form'}
        maxValue={100}
        value={this.state.submitProgress}
      />;
    }
    return (
      <form
        className={className}
        action='#'
        onSubmit={this.handleSubmit}
      >
        {overlay}
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
