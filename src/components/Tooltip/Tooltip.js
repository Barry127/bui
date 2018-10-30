import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import p from 'prop-types';
import { Transition, config } from 'react-spring';

import styles from './Tooltip.module.scss';
import TooltipContent from './TooltipContent';

const CARET_SIZE = 14;

class Tooltip extends Component {
  state = {
    top: 0,
    left: 0,
    transform: null,
    visible: false,
    hover: false
  };

  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    document.body.appendChild(this.el);

    // for future use of auto changing pos when out of view
    this.state.position = props.position;
  }

  componentDidMount() {
    this.updatePosition();

    const { targetId } = this.props;
    const target = document.getElementById(targetId);

    target.addEventListener('mouseenter', this.show);
    target.addEventListener('mouseleave', this.hide);
  }

  componentWillUnmount() {
    const { targetId } = this.props;
    const target = document.getElementById(targetId);

    target.removeEventListener('mouseenter', this.show);
    target.removeEventListener('mouseleave', this.hide);

    document.body.removeChild(this.el);
  }

  static getDerivedStateFromProps(props) {
    if (props.visible !== 'auto') {
      return { visible: props.visible };
    }

    return null;
  }

  hide = () => {
    this.setState({ visible: false });
  };

  show = () => {
    this.setState({ visible: true });
  };

  setHover = () => {
    this.setState({ hover: true });
  };

  unsetHover = () => {
    this.setState({ hover: false });
  };

  updatePosition = () => {
    const { targetId } = this.props;
    const { position } = this.state;

    const anchor = document.getElementById(targetId);
    if (!anchor || !anchor.getBoundingClientRect) return;

    const anchorRect = anchor.getBoundingClientRect();

    const nextState = { position, transform: null };

    switch (position) {
      case 'topLeft':
        nextState.left = anchorRect.left;
        nextState.top = anchorRect.top - CARET_SIZE;
        nextState.transform = 'translateY(-100%)';
        nextState.transformOrigin = 'left bottom';
        break;

      case 'top':
        nextState.left = anchorRect.left + anchorRect.width / 2;
        nextState.top = anchorRect.top - CARET_SIZE;
        nextState.transform = 'translate(-50%,-100%)';
        nextState.transformOrigin = 'bottom';
        break;

      case 'topRight':
        nextState.left = anchorRect.left + anchorRect.width;
        nextState.top = anchorRect.top - CARET_SIZE;
        nextState.transform = 'translate(-100%,-100%)';
        nextState.transformOrigin = 'right bottom';
        break;

      case 'rightTop':
        nextState.left = anchorRect.left + anchorRect.width + CARET_SIZE;
        nextState.top = anchorRect.top;
        nextState.transformOrigin = 'top left';
        break;

      case 'right':
        nextState.left = anchorRect.left + anchorRect.width + CARET_SIZE;
        nextState.top = anchorRect.top + anchorRect.height / 2;
        nextState.transform = 'translateY(-50%)';
        nextState.transformOrigin = 'left';
        break;

      case 'rightBottom':
        nextState.left = anchorRect.left + anchorRect.width + CARET_SIZE;
        nextState.top = anchorRect.top + anchorRect.height;
        nextState.transform = 'translateY(-100%)';
        nextState.transformOrigin = 'bottom left';
        break;

      case 'bottomLeft':
        nextState.left = anchorRect.left;
        nextState.top = anchorRect.top + anchorRect.height + CARET_SIZE;
        nextState.transformOrigin = 'left top';
        break;

      case 'bottom':
        nextState.left = anchorRect.left + anchorRect.width / 2;
        nextState.top = anchorRect.top + anchorRect.height + CARET_SIZE;
        nextState.transform = 'translateX(-50%)';
        nextState.transformOrigin = 'top';
        break;

      case 'bottomRight':
        nextState.left = anchorRect.left + anchorRect.width;
        nextState.top = anchorRect.top + anchorRect.height + CARET_SIZE;
        nextState.transform = 'translateX(-100%)';
        nextState.transformOrigin = 'right top';
        break;

      case 'leftTop':
        nextState.left = anchorRect.left - CARET_SIZE;
        nextState.top = anchorRect.top;
        nextState.transform = 'translateX(-100%)';
        nextState.transformOrigin = 'top right';
        break;

      case 'left':
        nextState.left = anchorRect.left - CARET_SIZE;
        nextState.top = anchorRect.top + anchorRect.height / 2;
        nextState.transform = 'translate(-100%,-50%)';
        nextState.transformOrigin = 'right';
        break;

      case 'leftBottom':
        nextState.left = anchorRect.left - CARET_SIZE;
        nextState.top = anchorRect.top + anchorRect.height;
        nextState.transform = 'translate(-100%,-100%)';
        nextState.transformOrigin = 'bottom right';
        break;

      default:
        break;
    }

    this.setState(nextState);
  };

  render() {
    const { children, position, targetId, visible, ...props } = this.props;
    const { top, left, transform, transformOrigin, hover } = this.state;

    return ReactDOM.createPortal(
      <Transition
        items={this.state.visible || hover}
        from={{ opacity: 0, transform: 'scale(0.75)' }}
        enter={{ opacity: 1, transform: 'scale(1)' }}
        leave={{ opacity: 0, transform: 'scale(0.75)' }}
        config={config.stiff}
      >
        {visible =>
          visible &&
          (style => (
            <div
              className={styles.tooltip}
              style={{ top, left, transform }}
              ref={c => (this.tooltip = c)}
              onMouseEnter={this.setHover}
              onMouseLeave={this.unsetHover}
            >
              <TooltipContent
                {...props}
                position={this.state.position}
                style={{ ...style, transformOrigin }}
              >
                {children}
              </TooltipContent>
            </div>
          ))
        }
      </Transition>,
      this.el
    );
  }

  static propTypes = {
    /** Tooltip content */
    children: p.node,
    /** Classname for Tooltip component */
    className: p.string,
    /** Tooltip color variant */
    color: p.oneOf([
      'default',
      'primary',
      'success',
      'info',
      'warning',
      'danger'
    ]),
    /* position to render Tooltip */
    position: p.oneOf([
      'bottomLeft',
      'bottom',
      'bottomRight',
      'leftTop',
      'left',
      'leftBottom',
      'rightTop',
      'right',
      'rightBottom',
      'topLeft',
      'top',
      'topRight'
    ]),
    /* Width size for Tooltip */
    size: p.oneOf(['sm', 'md', 'lg']),
    /* Target element the Tooltip points at */
    targetId: p.string.isRequired,
    /* Is the Tooltip visible, auto is at mouse over target */
    visible: p.oneOf(['auto', true, false])
  };

  static defaultProps = {
    color: 'default',
    position: 'top',
    size: 'md',
    visible: 'auto'
  };
}

export default Tooltip;
