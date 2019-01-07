import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import p from 'prop-types';
import omit from 'lodash/omit';

import {
  Header,
  Form,
  FormTextInput,
  FormTextArea,
  FormRow
} from '../../../components';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Select from '../../../components/Select/Select';

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
    if (prop.type === 'boolean') {
      prop.value = !prop.value;
    }

    if (prop.type === 'enum') {
      // no actions
    }

    if (prop.type === 'number') {
      prop.value = Number(prop.value);
      if (prop.min && prop.value < prop.min) return;
      if (prop.max && prop.value > prop.max) return;
    }

    if (prop.type === 'string') {
      // no actions
    }

    if (prop.type === 'text') {
      // no actions
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
                if (prop.type === 'boolean') {
                  return (
                    <BooleanType
                      key={prop.name}
                      {...prop}
                      value={this.state.props[prop.name]}
                      onChange={ev =>
                        this.onChange({
                          ...prop,
                          value: this.state.props[prop.name]
                        })
                      }
                    />
                  );
                }
                if (prop.type === 'enum') {
                  return (
                    <EnumType
                      key={prop.name}
                      {...prop}
                      value={this.state.props[prop.name]}
                      onChange={selection =>
                        selection &&
                        this.onChange({ ...prop, value: selection.value })
                      }
                    />
                  );
                }
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
                if (prop.type === 'string') {
                  return (
                    <StringType
                      key={prop.name}
                      {...prop}
                      value={this.state.props[prop.name]}
                      onChange={ev =>
                        this.onChange({ ...prop, value: ev.target.value })
                      }
                    />
                  );
                }
                if (prop.type === 'text') {
                  return (
                    <TextType
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
            <Component {...omit(this.state.props, 'children')}>
              {this.state.props.children || content}
            </Component>
            {after}
          </Content>
        )}
      </React.Fragment>
    );
  }

  static propTypes = {
    after: p.node,
    before: p.node,
    content: p.node,
    props: p.array
  };

  static defaultProps = {
    props: []
  };
}

const Content = ({ children, el }) => ReactDOM.createPortal(children, el);

const BooleanType = ({ name, value, onChange }) => (
  <FormRow size="sm" label={name} htmlFor={name}>
    <Checkbox
      size="sm"
      name={name}
      id={name}
      checked={value}
      onChange={onChange}
    >
      {value ? 'true' : 'false'}
    </Checkbox>
  </FormRow>
);

BooleanType.propTypes = {
  name: p.string,
  value: p.bool,
  onChange: p.func
};

const EnumType = ({ name, value, options, onChange }) => (
  <FormRow size="sm" label={name} htmlFor={name}>
    <Select
      size="sm"
      name={name}
      searchable={true}
      id={name}
      options={options.map(option => ({ value: option }))}
      value={value}
      onChange={onChange}
    />
  </FormRow>
);

EnumType.propTypes = {
  name: p.string,
  value: p.string,
  options: p.array,
  onChange: p.func
};

const NumberType = ({ name, value, onChange, min, max }) => (
  <FormTextInput
    name={name}
    id={name}
    size="sm"
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

const StringType = ({ name, value, onChange }) => (
  <FormTextInput
    name={name}
    id={name}
    size="sm"
    label={name}
    value={value}
    onChange={onChange}
    type="text"
  />
);

StringType.propTypes = {
  name: p.string,
  value: p.string,
  onChange: p.func
};

const TextType = ({ name, value, onChange }) => (
  <FormTextArea
    name={name}
    id={name}
    size="sm"
    label={name}
    value={value}
    onChange={onChange}
    type="text"
    rows={1}
  />
);

TextType.propTypes = {
  name: p.string,
  value: p.string,
  onChange: p.func
};

export default Playground;
