import React, { Component } from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { getDiffer, getTimeKeysWithout } from './calculate-date-diff';

class ReactMomentCountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: {},
    }
  }

  componentWillMount() {
    this.timeKeys = getTimeKeysWithout(this.props.excludeTimeKeys);
    this.differ = getDiffer(this.timeKeys);
  }

  componentDidMount() {
    this.tick();
    this.timer = window.setInterval(this.tick.bind(this), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.timeKeys = getTimeKeysWithout(nextProps.excludeTimeKeys);
    this.differ = getDiffer(this.timeKeys);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  tick() {
    const countdown = this.differ(moment(), moment(this.props.toDate));

    if (countdown.complete) {
      window.clearInterval(this.timer);
      this.props.onCountdownEnd();
    }

    this.setState({
      countdown,
    });

    this.props.onTick(countdown);
  }

  render() {
    const {
      classPrefix
    } = this.props;
    const {
      countdown
    } = this.state;

    const times = this.timeKeys.map(key => (
      <span key={key} className={`${classPrefix}countdown-block`}>
        <span className={`${classPrefix}countdown-value`}>
          {countdown[key]}
        </span>
        <span className={`${classPrefix}countdown-label`}>
          {key}
        </span>
      </span>
    ));

    return(
      <span className={`${this.props.classPrefix}countdown`}>{ times }</span>
    );
  }
}

ReactMomentCountDown.propTypes = {
  toDate:React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Date),
    momentPropTypes.momentObj
  ]).isRequired,
  excludeTimeKeys: React.PropTypes.array,
  onTick: React.PropTypes.func,
  onCountdownEnd: React.PropTypes.func,
  classPrefix: React.PropTypes.string
};

ReactMomentCountDown.defaultProps = {
  excludeTimeKeys: ['weeks', 'ms'],
  onTick: () => {},
  onCountdownEnd: () => {},
  classPrefix: ''
};

export default ReactMomentCountDown;
