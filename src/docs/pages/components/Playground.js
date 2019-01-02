import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import p from 'prop-types';

import { Header, Form, FormTextInput } from '../../../components';

class Playground extends Component {
  state = {
    mounted: false,
    props: {}
  };

  constructor(props) {
    super(props);

    props.props.forEach(({ name, value }) => {
      this.state.props[name] = value; // eslint-disable-line react/no-direct-mutation-state
    });
  }

  componentDidMount() {
    this.iframe.onload = () => {
      this.iframe.contentWindow.document.body.innerHTML = '';
      this.iframe.contentWindow.document.body.style.padding = '8px';
      this.contentEl = this.iframe.contentWindow.document.createElement('div');
      this.iframe.contentWindow.document.body.appendChild(this.contentEl);

      this.setState({ mounted: true });
    };
  }

  onChange(prop) {
    if (prop.type === 'number') {
      prop.value = Number(prop.value);
      if (prop.min && prop.value < prop.min) return;
      if (prop.max && prop.value > prop.max) return;
    }

    const { props } = this.state;
    props[prop.name] = prop.value;
    this.setState({ props });
  }

  render() {
    const { after, before, content, Component, props } = this.props;
    const { mounted } = this.state;

    return (
      <React.Fragment>
        <Header id="playground">Playground</Header>
        <div id="playground-container">
          <div className="props">
            <Header level={6}>Props</Header>
            <Form layout="vertical">
              {props.map(prop => {
                if (prop.type === 'number') {
                  return (
                    <NumberType
                      key={prop.name}
                      {...prop}
                      value={this.state.props[prop.name]}
                      onChange={ev =>
                        this.onChange({ ...prop, value: ev.target.value })
                      }
                    />
                  );
                }
                return null;
              })}
            </Form>
          </div>
          <iframe
            ref={iframe => (this.iframe = iframe)}
            className="output"
            title="Playground"
            src="/index.html"
            style={{
              opacity: mounted ? 1 : 0
            }}
          />
        </div>
        {mounted && (
          <Content el={this.contentEl}>
            {before}
            <Component {...this.state.props}>{content}</Component>
            {after}
          </Content>
        )}
      </React.Fragment>
    );
  }

  static propTypes = {
    after: p.node,
    before: p.node,
    props: p.array
  };
}

const Content = ({ children, el }) => ReactDOM.createPortal(children, el);

const NumberType = ({ name, value, onChange, min, max }) => (
  <FormTextInput
    name={name}
    id={name}
    label={name}
    value={value}
    onChange={onChange}
    type="number"
    min={min}
    max={max}
  />
);

NumberType.propTypes = {
  name: p.string,
  value: p.number,
  onChange: p.func,
  min: p.number,
  max: p.number
};

export default Playground;
