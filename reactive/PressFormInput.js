var PressFormInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    type: React.PropTypes.string,
  },

  getInitialState: function() {
    var value = this.props.value;
    if (this.props.value === undefined || this.props.value === null) {
      value = '';
    }
    return {value: value};
  },

  componentWillReceiveProps: function(props) {
    this.setState({value: props.value});
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render: function() {
    var type = 'text';
    if (this.props.type !== undefined) {
      type = this.props.type;
    }
    var label = null;
    if (this.props.label !== undefined) {
      label = <label htmlFor={this.props.name}>{this.props.label}</label>;
    }
    var className = '';
    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }
    return (
      <div>
        {label}
        <input
          type={type}
          name={this.props.name}
          value={this.state.value}
          onChange={this.handleChange}
          className={className}
        />
      </div>
    );
  }
});
