'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _calculateDateDiff = require('./calculate-date-diff');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMomentCountDown = function (_Component) {
  _inherits(ReactMomentCountDown, _Component);

  function ReactMomentCountDown(props) {
    _classCallCheck(this, ReactMomentCountDown);

    var _this = _possibleConstructorReturn(this, (ReactMomentCountDown.__proto__ || Object.getPrototypeOf(ReactMomentCountDown)).call(this, props));

    _this.state = {
      countdown: {}
    };
    return _this;
  }

  _createClass(ReactMomentCountDown, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.timeKeys = (0, _calculateDateDiff.getTimeKeysWithout)(this.props.excludeTimeKeys);
      this.differ = (0, _calculateDateDiff.getDiffer)(this.timeKeys);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.tick();
      this.timer = window.setInterval(this.tick.bind(this), 1000);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.timeKeys = (0, _calculateDateDiff.getTimeKeysWithout)(nextProps.excludeTimeKeys);
      this.differ = (0, _calculateDateDiff.getDiffer)(this.timeKeys);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.clearInterval(this.timer);
    }
  }, {
    key: 'tick',
    value: function tick() {
      var countdown = this.differ((0, _moment2.default)(), (0, _moment2.default)(this.props.toDate));

      if (countdown.complete) {
        window.clearInterval(this.timer);
        this.props.onCountdownEnd();
      }

      this.setState({
        countdown: countdown
      });

      this.props.onTick(countdown);
    }
  }, {
    key: 'render',
    value: function render() {
      var classPrefix = this.props.classPrefix;
      var countdown = this.state.countdown;


      var times = this.timeKeys.map(function (key) {
        return _react2.default.createElement(
          'span',
          { key: key, className: classPrefix + 'countdown-block' },
          _react2.default.createElement(
            'span',
            { className: classPrefix + 'countdown-value' },
            countdown[key]
          ),
          _react2.default.createElement(
            'span',
            { className: classPrefix + 'countdown-label' },
            key
          )
        );
      });

      return _react2.default.createElement(
        'span',
        { className: this.props.classPrefix + 'countdown' },
        times
      );
    }
  }]);

  return ReactMomentCountDown;
}(_react.Component);

ReactMomentCountDown.propTypes = {
  toDate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.instanceOf(Date), _reactMomentProptypes2.default.momentObj]).isRequired,
  excludeTimeKeys: _react2.default.PropTypes.array,
  onTick: _react2.default.PropTypes.func,
  onCountdownEnd: _react2.default.PropTypes.func,
  classPrefix: _react2.default.PropTypes.string
};

ReactMomentCountDown.defaultProps = {
  excludeTimeKeys: ['weeks', 'ms'],
  onTick: function onTick() {},
  onCountdownEnd: function onCountdownEnd() {},
  classPrefix: ''
};

exports.default = ReactMomentCountDown;