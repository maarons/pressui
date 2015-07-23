var PressFormInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
  },

  getInitialState: function() {
    var value = this.props.value;
    if (this.props.value === undefined || this.props.value === null) {
      value = '';
    }
    return {value: value};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render: function() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          id={'press-form-' + this.props.name}
          type='text'
          name={this.props.name}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});
