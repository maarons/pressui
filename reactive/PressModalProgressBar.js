var PressModalProgressBar = React.createClass({
  propTypes: {
    maxValue: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
    var width = Math.round(this.props.value * 100 / this.props.maxValue);
    return (
      <div>
        <div className='press-modal-overlay'></div>
        <div className='press-progress-dialog'>
          <div className='press-progress-header'>
            <div className='press-progress-header-text'>{this.props.title}</div>
          </div>
          <div className='press-progress'>
            <div
              className='press-progress-bar'
              style={{width: width.toString() + '%'}}
            ></div>
          </div>
        </div>
      </div>
    );
  }
});
