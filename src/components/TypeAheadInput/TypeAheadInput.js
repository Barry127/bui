import React, { Component } from 'react';
import p from 'prop-types';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';

import TextInput from '../TextInput/TextInput';

/**
 * TypeAheadInput enhances TextInput to inline autocomplete from a list
 *
 */
class TypeAheadInput extends Component {
  state = {
    items: [],
    prevPropsItems: null,
    selectStart: 0
  };

  requests = 0;

  static getDerivedStateFromProps(props, state) {
    if (!props.getItems && props.items !== state.prevPropsItems) {
      return {
        prevPropsItems: props.items,
        items: sortBy(props.items, props.getItemValue).map(props.getItemValue)
      };
    }

    return null;
  }

  propsOnChange(ev) {
    const { onChange } = this.props;
    if (typeof onChange === 'function') onChange(ev);
  }

  selectText = () => {
    const { selectStart } = this.state;

    this.input.setSelectionRange(selectStart, this.input.value.length);
  };

  shouldSelectionUpdate(ev) {
    let value = this.props.value;
    const { items } = this.state;

    if (this.deleteChar) return;

    if (
      this.input.selectionEnd === value.length &&
      this.input.selectionStart < this.input.selectionEnd
    ) {
      value = this.props.value.slice(0, this.input.selectionStart);
    }

    const autocomplete = find(items, item =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );

    if (autocomplete === this.props.value) return;

    ev.target.value = value;
    this.completeFromState(ev);
  }

  completeFromState(ev) {
    const { items } = this.state;

    const autocomplete = find(items, item =>
      item.toLowerCase().startsWith(ev.target.value.toLowerCase())
    );

    if (autocomplete) {
      this.setState(
        {
          selectStart: ev.target.value.length
        },
        this.selectText
      );
      ev.target.value = autocomplete;
    }

    this.propsOnChange(ev);
  }

  getItems(query, ev) {
    clearTimeout(this.getterTimeout);
    ev.persist();

    this.getterTimeout = setTimeout(() => {
      this.requests++;
      const request = this.requests;

      const { getItems, getItemValue } = this.props;

      getItems(query)
        .then(items => {
          if (this.requests !== request) {
            return Promise.reject(null);
          }

          return sortBy(items, getItemValue).map(getItemValue);
        })
        .then(items => {
          this.setState({ items }, () => this.shouldSelectionUpdate(ev));
        })
        .catch(err => {
          if (err) throw err;
        });
    }, 200);
  }

  onKeyDown = ev => {
    const { onKeyDown } = this.props;

    // Backspace & delete
    if (ev.keyCode === 8 || ev.keyCode === 46) {
      this.deleteChar = true;
    }

    if (typeof onKeyDown === 'function') onKeyDown(ev);
  };

  onChange = ev => {
    const { getItems } = this.props;

    if (!this.deleteChar && ev.target.value.length > 0) {
      const { value } = ev.target;
      this.completeFromState(ev);

      if (getItems) {
        this.getItems(value, ev);
      }
    }

    this.deleteChar = false;
    this.propsOnChange(ev);
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
      getItemValue,
      getItems,
      innerRef,
      items,
      onChange,
      ...props
    } = this.props;

    return (
      <TextInput
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        innerRef={this.setRef}
        {...props}
      />
    );
  }

  static propTypes = {
    /** Selector function to get value from item in items array. Defaults to (item) => item */
    getItemValue: p.func,
    /** Async function / promise to retreive items */
    getItems: p.func,
    /** Array of items (if getItems is not specified) */
    items: p.array
  };

  static defaultProps = {
    getItemValue: item => item,
    items: []
  };
}

export default TypeAheadInput;
