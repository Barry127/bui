import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './SideNav.module.scss';
import Group from './Group';
import Item from './Item';

/**
 * SideNav is a navigation list
 */
class SideNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resizing: false,
      width: Math.min(props.maxWidth, Math.max(props.minWidth, props.width))
    };
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  componentDidUpdate(prevProps) {
    const { width } = this.props;

    if (width !== prevProps.width) {
      this.setState({ width });
    }
  }

  onMouseDown = ev => {
    const { width } = this.state;
    const { resizable } = this.props;
    if (!resizable) return;

    ev.preventDefault();

    this.initialWidth = width;
    this.initialClientX = ev.clientX;

    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);

    this.setState({ resizing: true });
  };

  onMouseMove = ev => {
    const { minWidth, maxWidth } = this.props;

    const width = Math.min(
      maxWidth,
      Math.max(minWidth, this.initialWidth - (this.initialClientX - ev.clientX))
    );

    this.setState({
      width
    });
  };

  onMouseUp = ev => {
    const { onResize } = this.props;
    ev.preventDefault();

    this.initialClientX = null;
    this.initialWidth = null;

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    this.setState({ resizing: false });

    onResize(this.state.width);
  };

  render() {
    const {
      children,
      className,
      maxWidth,
      minWidth,
      onResize,
      resizable,
      style,
      width,
      ...props
    } = this.props;
    const classes = cx(
      styles.nav,
      { [styles.resizable]: resizable },
      'bui-SideNav',
      className
    );

    return (
      <nav
        className={classes}
        style={{ ...style, width: this.state.width }}
        {...props}
      >
        <ul className={styles.group}>{children}</ul>
        <div
          className={styles.handle}
          onMouseDown={this.onMouseDown}
          role="presentation"
        />
        {this.state.resizing && <div className={styles.resizing} />}
      </nav>
    );
  }

  static propTypes = {
    /** Children to render inside SideNav */
    children: p.node,
    /** Classname for SideNav component */
    className: p.string,
    /** maximum width for SideNav */
    maxWidth: p.number,
    /** minimum width for SideNav */
    minWidth: p.number,
    /** Resize Handler */
    onResize: p.func,
    /** Wether the SideNav is resizable */
    resizable: p.bool,
    style: p.object,
    /** Width of SideNav */
    width: p.number
  };

  static defaultProps = {
    maxWidth: Infinity,
    minWidth: 128,
    onResize: () => null,
    resizable: true,
    width: 200
  };

  static Group = Group;
  static Item = Item;
}

export default SideNav;
