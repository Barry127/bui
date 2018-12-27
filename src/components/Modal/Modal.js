import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import p from 'prop-types';
import cx from 'classnames';
import { Spring, Transition, config } from 'react-spring';
import Mousetrap from 'mousetrap';

import styles from './Modal.module.scss';

import Button from '../Button';
import Icon from '../Icon';
import Header from '../Header';
import Text from '../Text';
import '../icons';

const SIZE_MAP = {
  sm: 288,
  md: 576,
  lg: 864,
  xl: 1152
};

/**
 * Modals provide information or help a user complete a task. They require the user to take an action or to dismiss them
 */
class Modal extends Component {
  state = {
    maximized: false,
    body: {
      width: document.body.clientWidth,
      height: window.innerHeight
    }
  };

  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    document.body.appendChild(this.el);

    this.mousetrap = new Mousetrap();
  }

  componentDidMount() {
    const { visible } = this.props;

    const children = this.getBodyChildren();
    children.forEach(child => child.classList.add(styles.blurAnimated));

    if (visible) {
      this.setBlur();
      this.bindShortcuts();
    }

    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    this.setBlur();

    if (visible !== prevProps.visible) {
      if (visible) {
        this.bindShortcuts();
      } else {
        this.unbindShortcuts();
      }

      document.activeElement.blur();
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    window.removeEventListener('resize', this.handleResize);
  }

  bindShortcuts() {
    const { closable, onClose } = this.props;

    if (closable) this.mousetrap.bind('escape', onClose);
  }

  unbindShortcuts() {
    this.mousetrap.unbind('escape');
  }

  handleResize = () => {
    this.setState({
      body: {
        width: document.body.clientWidth,
        height: window.innerHeight
      }
    });
  };

  toggleMaximized = () => {
    this.setState(({ maximized }) => ({ maximized: !maximized }));
  };

  afterClose = () => {
    const { afterClose } = this.props;
    this.setState({ maximized: false });
    setTimeout(afterClose, 1);
  };

  afterOpen = () => {
    const { afterOpen } = this.props;
    setTimeout(afterOpen, 1);
  };

  getBodyChildren = () =>
    [...document.body.children].filter(child => child !== this.el);

  setBlur() {
    const { visible } = this.props;
    const children = this.getBodyChildren();

    if (visible) {
      children.forEach(child => child.classList.add(styles.blur));
    } else {
      children.forEach(child => child.classList.remove(styles.blur));
    }
  }

  render() {
    const {
      afterClose,
      afterOpen,
      children,
      className,
      closable,
      color,
      flat,
      footer,
      icon,
      maximizable,
      onClose,
      size,
      title,
      visible,
      ...props
    } = this.props;

    const { body, maximized } = this.state;

    const classes = cx(
      styles.modal,
      styles[color],
      styles[size],
      {
        [styles.flat]: flat,
        [styles.maximized]: maximized
      },
      'bui-Modal',
      className
    );

    return ReactDOM.createPortal(
      <Transition
        items={visible}
        from={{ opacity: 0.5, top: -100 }}
        enter={{ opacity: 1, top: -50 }}
        leave={{ opacity: 0, top: -65 }}
        config={visible ? { tension: 180, friction: 15 } : config.stiff}
        onDestroyed={visible ? this.afterOpen : this.afterClose}
      >
        {open =>
          open &&
          (style => (
            <Fragment>
              <div
                className={cx(styles.overlay, 'bui-ModalOverlay')}
                onClick={closable ? onClose : null}
                role="none"
                style={{ opacity: style.opacity, zIndex: visible ? 999 : -1 }}
              />
              <Spring
                from={{
                  borderRadius: 3,
                  width: Math.min(SIZE_MAP[size], body.width - 48),
                  height: 'auto',
                  maxOffset: 48
                }}
                to={{
                  borderRadius: maximized ? 0 : 3,
                  width: maximized
                    ? body.width
                    : Math.min(SIZE_MAP[size], body.width - 48),
                  height: maximized ? body.height : 'auto',
                  maxOffset: maximized ? 0 : 48
                }}
                config={config.default}
              >
                {({ borderRadius, width, height, maxOffset }) => (
                  <div
                    {...props}
                    role="dialog"
                    aria-labelledby="TITLEHERE!"
                    className={classes}
                    style={{
                      ...props.style,
                      borderRadius,
                      opacity: style.opacity,
                      transform: `translate(-50%, ${style.top}%) scale(${
                        style.opacity > 0.1 ? 1 : 0
                      })`,
                      width,
                      height: height,
                      maxHeight: maximized
                        ? '100vh'
                        : `calc(100vh - ${maxOffset}px)`
                    }}
                  >
                    {title && (
                      <div className={styles.title}>
                        <Header level={3} className={styles.titleText}>
                          {icon && <Icon icon={icon} />} {title}
                        </Header>
                        {maximizable && (
                          <Button
                            className={cx(styles.button, styles.maximize)}
                            icon
                            size="sm"
                            color="flat"
                            onClick={this.toggleMaximized}
                          >
                            <Icon
                              icon={maximized ? 'bui-minimize' : 'bui-maximize'}
                            />
                          </Button>
                        )}
                        {closable && (
                          <Button
                            className={cx(styles.button, styles.close)}
                            icon
                            size="sm"
                            color="flat"
                            onClick={onClose}
                          >
                            <Icon icon="bui-close" />
                          </Button>
                        )}
                      </div>
                    )}
                    <Text className={styles.content}>{children}</Text>
                    {footer && <Text className={styles.footer}>{footer}</Text>}
                  </div>
                )}
              </Spring>
            </Fragment>
          ))
        }
      </Transition>,
      this.el
    );
  }

  static propTypes = {
    /** Called when close animation is finished */
    afterClose: p.func,
    /** Called when open animation is finished */
    afterOpen: p.func,
    /** Modal content */
    children: p.node,
    /** Classname for Modal component */
    className: p.string,
    /** wether the Modal has a close Button and closes on clicking overlay */
    closable: p.bool,
    /** Color theme for Modal */
    color: p.oneOf([
      'default',
      'primary',
      'success',
      'info',
      'warning',
      'danger'
    ]),
    /** No padding for children (used when rendering structural elements) */
    flat: p.bool,
    /** Modal footer */
    footer: p.node,
    /** Modal icon */
    icon: p.string,
    /** wether the Modal is maximizable */
    maximizable: p.bool,
    /** Close method */
    onClose: p.func.isRequired,
    /* Size for Modal */
    size: p.oneOf(['sm', 'md', 'lg', 'xl']),
    /** Title for the Modal empty=no title */
    title: p.string,
    /** Wether the modal visible (open) or not */
    visible: p.bool
  };

  static defaultProps = {
    afterClose: () => null,
    afterOpen: () => null,
    closable: true,
    color: 'default',
    flat: false,
    maximizable: false,
    size: 'md',
    visible: false
  };
}

export default Modal;
