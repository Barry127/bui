import React, { Component, cloneElement } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

import styles from './Anchor.module.scss';
import { makeList, getActive } from './helpers';

import Link from './Link';

class Anchor extends Component {
  static Link = Link;

  state = {
    active: null,
    list: []
  };

  constructor() {
    super();

    this.onScroll = throttle(this._onScroll, 10);
    this.onResize = debounce(this.initialize, 100);
  }

  componentDidMount() {
    this.initialize();

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  initialize() {
    const { children, offsetTop } = this.props;
    const list = makeList(children);

    this.setState({
      active: getActive(list, offsetTop),
      list
    });
  }

  _onScroll = () => {
    const { offsetTop } = this.props;
    const { list } = this.state;

    this.setState({
      active: getActive(list, offsetTop)
    });
  };

  static getDerivedStateFromProps({ children, offsetTop }) {
    const list = makeList(children);
    return {
      active: getActive(list, offsetTop),
      list
    };
  }

  getChildren() {
    const { children } = this.props;
    const { active } = this.state;

    const childrenArray = Array.isArray(children) ? children : [children];
    return React.Children.map(
      childrenArray.filter(child => child.type === Link),
      child =>
        cloneElement(child, {
          active
        })
    );
  }

  render() {
    const { children, className, offsetTop, ...props } = this.props;
    const classes = cx(styles.anchor, 'bui-Anchor', className);

    return (
      <nav className={classes} {...props}>
        <ul>{this.getChildren()}</ul>
      </nav>
    );
  }

  static propTypes = {
    /** Anchor Links */
    children: p.node,
    /** Classname for the Anchor component */
    className: p.string,
    /** offset for active e.g. 50px before element the link gets active state */
    offsetTop: p.number
  };

  static defaultProps = {
    offsetTop: 0
  };
}

export default Anchor;
