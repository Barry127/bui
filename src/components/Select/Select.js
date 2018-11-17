import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import Downshift from 'downshift';
import find from 'lodash/find';

import styles from './Select.module.scss';
import './icons';

import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import Tooltip from '../Tooltip';
import uniqueId from '../../lib/uniqueId';

/**
 * With Select users can select one item from a list of values
 *
 */
class Select extends Component {
  state = {
    hasFocus: false
  };

  constructor() {
    super();
    this.id = uniqueId();
    this.tooltipId = uniqueId();
  }

  componentDidMount() {
    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('blur', this.onBlur);
  }

  componentWillunmount() {
    this.input.removeEventListener('focus', this.onFocus);
    this.input.removeEventListener('blur', this.onBlur);
  }

  focus = () => this.input.focus();

  onBlur = ev => {
    const { onBlur } = this.props;

    this.setState({ hasFocus: false });
    if (onBlur) onBlur(ev);
  };

  onFocus = ev => {
    const { onFocus } = this.props;

    this.setState({ hasFocus: true });
    if (onFocus) onFocus(ev);
  };

  setRef = ref => {
    const { innerRef } = this.props;
    this.input = ref;

    if (typeof innerRef === 'function') {
      innerRef(ref);
    }
  };

  render() {
    const {
      children,
      className,
      errorMessage,
      errorPosition,
      filter,
      hasError,
      icon,
      id,
      innerRef,
      itemToString,
      labelId,
      onChange,
      onBlur,
      onFocus,
      options,
      renderItem,
      searchable,
      size,
      value,
      ...props
    } = this.props;

    const { hasFocus } = this.state;

    const classes = cx(
      styles.select,
      styles[size],
      {
        [styles.error]: hasError,
        [styles.icon]: icon
      },
      'bui-Select',
      className
    );

    if (errorMessage && hasFocus) {
      props['aria-describedby'] = this.tooltipId;
    }

    return (
      <Downshift
        initialSelectedItem={find(options, { value })}
        onChange={onChange}
        itemToString={itemToString}
        inputId={id}
      >
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => {
          const filteredOptions = searchable
            ? options.filter(item => filter(item, inputValue))
            : options;

          return (
            <div
              id={this.id}
              className={cx(classes, {
                [styles.open]: isOpen && filteredOptions.length > 0
              })}
            >
              <input
                readOnly={!searchable}
                ref={this.setRef}
                {...getInputProps(props)}
                value={
                  getInputProps().value ||
                  '' /* Fix for null value in Downshift */
                }
                onClick={searchable ? null : getToggleButtonProps().onClick}
              />
              {errorMessage && (
                <Tooltip
                  targetId={this.id}
                  color="danger"
                  position={errorPosition}
                  visible={hasFocus && !isOpen}
                  id={this.tooltipId}
                >
                  {typeof errorMessage === 'function'
                    ? errorMessage()
                    : errorMessage}
                </Tooltip>
              )}
              {icon && (
                <div className={styles['icon-container']}>
                  <Icon
                    icon={icon}
                    onClick={
                      searchable
                        ? this.focus
                        : ev => {
                            getToggleButtonProps().onClick(ev);
                            this.focus();
                          }
                    }
                  />
                </div>
              )}
              <ul className={styles.list} {...getMenuProps()}>
                {isOpen &&
                  filteredOptions.map((item, index) => (
                    <li {...getItemProps({ index, item })} key={item.value}>
                      <Text
                        className={cx(styles.item, {
                          [styles.highlighted]: highlightedIndex === index,
                          [styles.selected]: selectedItem === item
                        })}
                      >
                        {renderItem
                          ? renderItem(item, {
                              selected: selectedItem === item,
                              highlighted: highlightedIndex === index,
                              inputValue
                            })
                          : item.value}
                      </Text>
                    </li>
                  ))}
              </ul>
              <Button
                {...getToggleButtonProps({
                  className: styles.toggleButton,
                  color: 'flat',
                  icon: true,
                  size,
                  tabIndex: -1
                })}
                onClick={ev => {
                  !isOpen && searchable && clearSelection(ev);
                  getToggleButtonProps().onClick(ev);
                  this.focus();
                }}
              >
                <Icon icon={isOpen ? 'bui-chevron-up' : 'bui-chevron-down'} />
              </Button>
              {children}
            </div>
          );
        }}
      </Downshift>
    );
  }

  static propTypes = {
    /** Children to render inside Select container */
    children: p.node,
    /** Classname for Select component */
    className: p.string,
    /** Is the Select disabled */
    disabled: p.bool,
    /** ErrorMessage for error tooltip, no message = no tooltip */
    errorMessage: p.oneOfType([p.string, p.func]),
    /** Position for the error tooltip */
    errorPosition: p.oneOf([
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
    /** filter method for searching options, default: (item, inputValue) => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()) */
    filter: p.func,
    /** Does the Select contains an error */
    hasError: p.bool,
    /** Icon for Select */
    icon: p.string,
    /** id for input */
    id: p.string.isRequired,
    /** Used for display text, defaults to item => item && item.value */
    itemToString: p.func,
    /** name for textInput */
    name: p.string.isRequired,
    /** onChange method (selection) => this.setState({value: selection.value}) */
    onChange: p.func,
    /** list of options for Select */
    options: p.any.isRequired,
    /** Custom renderer for items in dropdown (item, { selected, highlighted, inputValue }) => item */
    renderItem: p.func,
    /** Is the options list searchable */
    searchable: p.bool,
    /** Select size */
    size: p.oneOf(['sm', 'md', 'lg']),
    /** Current value */
    value: p.any
  };

  static defaultProps = {
    disabled: false,
    errorMessage: null,
    errorPosition: 'bottom',
    filter: (item, inputValue) =>
      !inputValue ||
      item.value.toLowerCase().includes(inputValue.toLowerCase()),
    hasError: false,
    itemToString: item => item && item.value,
    searchable: false,
    size: 'md'
  };
}

export default Select;
