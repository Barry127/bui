/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';

// import styles from './App.module.css';

import {
  Affix,
  Alert,
  AlertGroup,
  Anchor,
  AnchorLink,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  Form,
  FormTextArea,
  FormTextInput,
  FormPasswordInput,
  FormTypeAheadInput,
  FormRow,
  TypeAheadInput,
  Button,
  ButtonGroup,
  InputGroup,
  Icon,
  FormRadioGroup,
  Select,
  SideNav,
  Spinner,
  Table,
  TextArea,
  Progress,
  Text,
  Header,
  Modal
} from '@barry127/bui';

const values = [
  { value: 'JavaScript' },
  { value: 'Java' },
  { value: 'PHP' },
  { value: 'Perl' },
  { value: 'C' },
  { value: 'Lua' },
  { value: 'C++' },
  { value: 'Rust' }
];

const data = [
  {
    key: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: 1975
  },
  {
    key: 2,
    title: 'Hotel California',
    artist: 'Eagles',
    year: 1978
  },
  {
    key: 3,
    title: 'Piano Man',
    artist: 'Billy Joel',
    year: 1974
  },
  {
    key: 4,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    year: 1971
  },
  {
    key: 5,
    title: 'Wish You Were Here',
    artist: 'Pink Floyd',
    year: 1975
  },
  {
    key: 6,
    title: 'Child in Time',
    artist: 'Deep Purple',
    year: 1970
  },
  {
    key: 7,
    title: 'Black',
    artist: 'Pearl Jam',
    year: 1992
  },
  {
    key: 8,
    title: 'Africa',
    artist: 'Toto',
    year: 1982
  },
  {
    key: 9,
    title: 'Fix You',
    artist: 'Coldplay',
    year: 2005
  },
  {
    key: 10,
    title: 'Avond',
    artist: 'Boudewijn de Groot',
    year: 1997
  }
];

const columns = [
  {
    dataField: 'key',
    key: 'key',
    title: '#'
  },
  {
    dataField: 'title',
    key: 'title',
    title: 'Title'
  },
  {
    dataField: 'artist',
    key: 'artist',
    title: 'Artist'
  },
  {
    dataField: 'year',
    key: 'year',
    title: 'Year'
  }
];

class App extends Component {
  state = {
    a: false,
    b: true,
    radio: '',
    value: '',
    select: 'Lua',
    progress: 0,
    count2: 0,
    a1: true,
    a2: true,
    a3: true,
    a4: true,
    seven: false,
    loading: true,
    modal: false
  };

  componentDidMount() {
    // setInterval(this.updateProgress, 60000);
    // setTimeout(() => this.setState({ seven: true }), 5000);
  }

  updateProgress = () => {
    const { progress } = this.state;
    this.setState({ progress: Math.min(100, progress + 10) });
  };

  render() {
    return (
      <React.StrictMode>
        <Table dataSource={data} columns={columns} borders={false} />
        <div style={{ display: 'flex' }}>
          <SideNav onResize={console.log} style={{ maxHeight: '90vh' }}>
            <SideNav.Item to="#">BUI</SideNav.Item>
            <SideNav.Item to="#">Getting Started</SideNav.Item>
            <SideNav.Group title="Patterns" collapsible>
              <SideNav.Item to="#">Colors</SideNav.Item>
              <SideNav.Item to="#">Icons</SideNav.Item>
              <SideNav.Item to="#">Typography</SideNav.Item>
              <SideNav.Group title="Sub" collapsible>
                <SideNav.Item to="#">YYY</SideNav.Item>
                <SideNav.Item to="#">ZZZ</SideNav.Item>
              </SideNav.Group>
            </SideNav.Group>
            <SideNav.Group title="Components" collapsible>
              <SideNav.Item to="#">Affix</SideNav.Item>
              <SideNav.Item to="#">Alert</SideNav.Item>
              <SideNav.Item to="#">Anchor</SideNav.Item>
              <SideNav.Item to="#" active>
                Badge
              </SideNav.Item>
              <SideNav.Item to="#">Breadcrumb</SideNav.Item>
              <SideNav.Item to="#">Button</SideNav.Item>
              <SideNav.Item to="#">ButtonGroup</SideNav.Item>
              <SideNav.Item to="#">Checkbox</SideNav.Item>
              <SideNav.Item to="#">Form</SideNav.Item>
              <SideNav.Item to="#">Header</SideNav.Item>
              <SideNav.Item to="#">Icon</SideNav.Item>
            </SideNav.Group>
          </SideNav>
          <div
            style={{
              boxSizing: 'border-box',
              flex: 1,
              maxHeight: '90vh',
              overflow: 'auto',
              padding: 6
            }}
          >
            <Modal
              afterClose={() => console.log('afterClose')}
              afterOpen={() => console.log('afterOpen')}
              visible={this.state.modal}
              onClose={() => this.setState({ modal: false })}
              color="default"
              maximizable
              title="My Modal"
              icon="feather-settings"
              footer={
                <>
                  <Button outline color="primary">
                    Cancel
                  </Button>
                  <Button color="primary">Ok</Button>
                </>
              }
            >
              <Form>
                <FormTextInput
                  icon="feather-user"
                  label="Username"
                  id="username"
                  name="username"
                />
                <FormPasswordInput
                  icon="feather-lock"
                  label="Password"
                  id="password"
                  name="password"
                />
              </Form>
            </Modal>
            <AlertGroup>
              {this.state.a1 && (
                <Alert
                  afterClose={() =>
                    this.setState({
                      a1: false
                    })
                  }
                  type="success"
                  title="Success"
                  closable={false}
                >
                  Well done
                </Alert>
              )}
              {this.state.a2 && (
                <Alert
                  afterClose={() =>
                    this.setState({
                      a2: false
                    })
                  }
                  type="info"
                >
                  New messages!
                </Alert>
              )}
              <p>Whee!! I should not be here</p>
              {this.state.a3 && (
                <Alert
                  afterClose={() =>
                    this.setState({
                      a3: false
                    })
                  }
                  type="danger"
                >
                  Something went very wrong
                </Alert>
              )}
              {this.state.a4 && (
                <Alert
                  afterClose={() =>
                    this.setState({
                      a4: false
                    })
                  }
                  type="warning"
                >
                  Woohoo
                </Alert>
              )}
            </AlertGroup>
            <Breadcrumb
              separator={<Icon icon="feather-chevron-right" size="1.2em" />}
            >
              <BreadcrumbItem>
                <a href="#a">
                  <Icon icon="feather-home" />
                </a>
              </BreadcrumbItem>
              <p>No item</p>
              <BreadcrumbItem>
                <a href="#a">Apps</a>
              </BreadcrumbItem>
              <BreadcrumbItem>Notes</BreadcrumbItem>
            </Breadcrumb>

            <Spinner />
            <Spinner size="lg" />
            <Spinner size="sm" />
            <Spinner type="dots" color="success" />
            <Spinner type="dots" color="warning" />
            <Spinner type="dots" color="danger" />
            <Spinner type="dots" color="info" spinning={false} />
            <div
              style={{ position: 'absolute', right: 0, top: 127, zIndex: 10 }}
            >
              <Affix offsetTop={0} style={{ background: 'white' }}>
                <Anchor>
                  <Anchor.Link to="#one" title="One" />
                  <p>Two and a Half</p>
                  <AnchorLink to="#two" title="Two">
                    <AnchorLink to="#three" title="Three" />
                    <AnchorLink color="purple700" to="#four" title="Four">
                      <AnchorLink color="purple700" to="#five" title="Four" />
                    </AnchorLink>
                    <p>Kinda wrong</p>
                  </AnchorLink>
                  <AnchorLink to="#five" title="Five long title bla bla" />
                  <AnchorLink to="#six" title="No Six" />
                  {this.state.seven && (
                    <AnchorLink to="#seven" title="No Seven" />
                  )}
                </Anchor>
              </Affix>
            </div>
            <h1>
              App{' '}
              <Button
                onClick={() => this.setState({ loading: !this.state.loading })}
              >
                Loading {this.state.loading ? 't' : 'f'}
              </Button>
              <Button onClick={() => this.setState({ modal: true })}>
                Modal
              </Button>
            </h1>
            <hr />

            <Spinner size="sm" />
            <Text inline>Loading Some Shit</Text>

            <Text>
              <Spinner
                spinning={this.state.loading}
                size="lg"
                tip="Loading some more"
                delay={1000}
              >
                <Header id="one">One</Header>
                <p>
                  {
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget dolor non massa luctus eleifend non et ipsum. In ut posuere leo. Mauris vitae maximus est, in maximus risus. Nunc tincidunt, felis a mattis laoreet, magna nunc aliquam dui, eu sodales massa mi sed metus. Maecenas bibendum est a facilisis lacinia. Cras velit felis, fringilla non pulvinar eget, ultrices id massa. Maecenas semper vitae leo nec sagittis.'
                  }
                </p>
              </Spinner>
              <Header id="two" level={2}>
                Two
              </Header>
              <p>
                {
                  'Quisque tempus sed mi ac ultrices. Sed nec dui odio. Nam et convallis sem. Phasellus vitae convallis felis. Curabitur ut dolor sed orci pellentesque tincidunt. In malesuada vehicula urna et blandit. Suspendisse quis tristique magna. Proin cursus egestas sagittis. Quisque non fringilla lectus. Aliquam pulvinar aliquet urna eget egestas. Duis sollicitudin, dui ac suscipit finibus, magna diam rhoncus felis, in dignissim est enim ac augue.'
                }
              </p>
              <p>
                {
                  'Proin euismod faucibus urna eu convallis. Vestibulum molestie maximus nibh, quis ultrices urna auctor sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras at est nunc. Quisque dignissim auctor turpis, vitae pharetra ex suscipit ut. Vivamus mollis lectus sed arcu rhoncus, ut faucibus sapien ultricies. Sed sapien mauris, porta vitae auctor fermentum, tempus in lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sed volutpat felis. Cras in risus elit. Sed vel risus ex. Curabitur quis ex ac neque consectetur vestibulum nec vitae metus. Proin a ligula nisi.'
                }
              </p>
              <Header id="three" level={3}>
                Three
              </Header>
              <p>
                {
                  'Nam dictum eros non eleifend ornare. Cras ornare purus erat, eget dictum ipsum scelerisque sed. Nunc aliquet felis nulla. Pellentesque at odio nulla. Sed tristique tellus rhoncus fermentum semper. Sed eget est dictum, elementum eros gravida, consectetur risus. Cras laoreet ultrices metus, at finibus eros venenatis sit amet. Nullam commodo vitae tellus varius rutrum.'
                }
              </p>
              <p>
                {
                  'Aenean pretium vestibulum est a ultrices. Curabitur aliquam sodales nisl, et rhoncus urna. Phasellus porttitor aliquet turpis, sit amet congue nunc ornare sit amet. Morbi semper vel odio quis maximus. Aenean quis rhoncus tortor, at aliquam lectus. Aliquam erat volutpat. Vivamus quis orci quis justo scelerisque lobortis. Donec rutrum malesuada mauris. Sed quis tempus metus. Donec nec arcu nibh. Curabitur cursus quis leo id rutrum.'
                }
              </p>
              <Header id="four" level={4}>
                Four
              </Header>
              <p>
                {
                  'Cras tempor augue eget libero accumsan varius. Vivamus pulvinar laoreet lobortis. Donec est nisl, pretium eget massa et, congue volutpat nunc. Phasellus euismod quam sollicitudin malesuada posuere. Curabitur non urna porttitor, placerat ipsum consectetur, facilisis est. Etiam eu aliquam mi, in ullamcorper ligula. In lorem enim, pulvinar vitae justo ac, posuere vestibulum nulla.'
                }
              </p>
              <p>
                {
                  'Donec posuere tortor augue, at vehicula quam sodales vehicula. Sed euismod vitae nibh non egestas. Curabitur sodales, dolor sed malesuada iaculis, justo dolor iaculis diam, a tincidunt massa nisi nec leo. Nullam sollicitudin odio id ante finibus, non consectetur neque mollis. Praesent et leo ut arcu scelerisque feugiat eget eu nunc. Nulla facilisi. Nam dolor odio, porttitor a leo vitae, fringilla posuere ante. Suspendisse sapien tortor, aliquam ut rhoncus a, lobortis vel neque. Curabitur feugiat massa nisl, sed placerat est cursus ut. Phasellus dapibus nulla in ornare tempor. Fusce convallis, lorem eget lacinia ultrices, felis mi sollicitudin ipsum, et rhoncus augue velit nec risus. Mauris vitae odio ut lectus auctor mollis. In quis ipsum nisl. Mauris aliquam efficitur purus, eget efficitur risus suscipit sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'
                }
              </p>
              <p>
                {
                  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin velit neque, posuere nec magna eu, tristique finibus augue. Donec tempus, nisi id hendrerit rhoncus, nisi purus vulputate libero, vel commodo elit dui eu eros. Proin ac dui in lorem maximus commodo eu sed mauris. Sed interdum cursus neque, id molestie ante gravida id. Curabitur euismod orci eros, in feugiat nisl volutpat at. Mauris porta quis justo eu pulvinar. Vestibulum vitae tincidunt ligula, eu condimentum ex. Aliquam erat volutpat. Mauris et accumsan enim, et rhoncus tortor. Pellentesque ac augue ut lacus ultrices mattis. Cras eget libero eget erat dictum sagittis tincidunt eget massa. Nam eleifend, odio eget condimentum posuere, enim nisi sollicitudin nulla, sit amet dictum dolor est non lectus. Integer in vehicula magna. Mauris eu felis enim.'
                }
              </p>
              <Header id="five" level={2}>
                Five
              </Header>
              <p>
                {
                  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In mollis, tortor vitae tincidunt maximus, nunc nibh malesuada eros, id bibendum nulla velit ac nunc. Morbi et est laoreet, cursus quam eget, varius turpis. In et semper ex. Praesent viverra consectetur sem, non cursus arcu volutpat sed. Nullam vel mollis est. Maecenas ac aliquam neque, ut tincidunt mi. Cras nec lectus risus. Aenean faucibus dui id tellus fringilla gravida. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec hendrerit volutpat neque mollis porttitor. Mauris sed convallis eros, sit amet viverra orci. Aenean blandit dolor ut lobortis dapibus. Aliquam erat volutpat. Nullam ac tempor mi.'
                }
              </p>
              <p>
                {
                  'Nullam at dictum metus. Donec et tellus sollicitudin, mollis leo dapibus, ornare est. Cras eu tellus neque. Vivamus dictum sapien eget suscipit ultrices. Ut risus lacus, placerat convallis facilisis non, ultrices vel massa. Donec placerat sapien non justo gravida, nec finibus purus tempor. Suspendisse nulla quam, hendrerit in mollis et, auctor eget lorem. Proin augue nunc, sagittis ut diam sit amet, tempus commodo turpis. Duis a mauris laoreet, tincidunt odio ut, commodo odio. Nulla facilisi.'
                }
              </p>
            </Text>
            <hr />
            <Text>
              Hello You <Badge color="info" count={2} />
            </Text>
            <Text>
              Inbox <Badge count={105} />
            </Text>
            <hr />
            <Button color="primary">
              Messages <Badge count={33} countOverflow={10} />
            </Button>
            <Button size="lg">
              Something <Badge color="success" count={4} />
            </Button>
            <Badge color="info" count={this.state.count2}>
              <Button
                size="sm"
                onClick={() =>
                  this.setState({
                    count2: this.state.count2 ? 0 : 1
                  })
                }
              >
                Something {this.state.count2}
              </Button>
            </Badge>
            <hr />
            <Badge color="warning" count={6}>
              <Icon icon="feather-message-square" />
            </Badge>
            <br />
            <br />
            <Badge count={55}>
              <Icon icon="feather-mail" size="3em" />
            </Badge>
            <br />
            <br />
            <Badge count={156} countOverflow={999}>
              <Button icon color="primary">
                <Icon icon="feather-mail" />
              </Button>
            </Badge>
            {/*/}
        <Progress active value={this.state.progress}>
          Bla <Icon icon="feather-check" />
        </Progress>
        <Progress active color="success" indeterminate value={50}>
          50%
        </Progress>
        <Progress active color="warning" value={50}>
          50%
        </Progress>
        <Progress color="danger" value={50}>
          50%
        </Progress>
        <Progress color="info" value={50}>
          50%
        </Progress>
        <hr />
        <Progress type="circle" active value={this.state.progress}>
          Bla <Icon icon="feather-check" />
        </Progress>
        <Progress type="circle" active color="success" indeterminate value={50}>
          50%
        </Progress>
        <Progress type="circle" active color="warning" value={50}>
          50%
        </Progress>
        <Progress type="circle" color="danger" value={50}>
          50%
        </Progress>
        <Progress type="circle" color="info" value={50}>
          50%
        </Progress>
        <Progress type="dash" active value={this.state.progress}>
          Bla <Icon icon="feather-check" />
        </Progress>
        <Progress type="dash" active color="success" indeterminate value={50}>
          50%
        </Progress>
        <Progress type="dash" active color="warning" value={50}>
          50%
        </Progress>
        <Progress type="dash" color="danger" value={50}>
          50%
        </Progress>
        <Progress type="dash" color="info" value={50}>
          50%
        </Progress>
        <hr />
        <Form layout="horizontal">
          <FormRow label="Program" htmlFor="select">
            <Select
              searchable={true}
              icon="feather-code"
              id="select"
              options={values}
              name="select-name"
              ref={console.log}
              onChange={selection => {
                // console.log(selection);
                this.setState({ select: selection && selection.value });
              }}
              value={this.state.select}
            />
          </FormRow>
          <FormTextInput
            icon="feather-user"
            label="Username"
            id="username"
            name="username"
            ref={console.log}
          />
          <FormPasswordInput
            icon="feather-lock"
            label="Password"
            id="password"
            name="password"
            ref={console.log}
          />
          <FormTypeAheadInput
            icon="feather-code"
            label="Language"
            id="language"
            items={[
              'JavaScript',
              'Java',
              'PHP',
              'Perl',
              'C',
              'C++',
              'Rust',
              'Lua'
            ]}
            name="language"
            ref={console.log}
          />
          <FormTextArea
            label="Comment"
            id="comment"
            name="comment"
            ref={console.log}
          />
          <FormRadioGroup
            inline={true}
            label="Superhero"
            name="hero"
            value={this.state.radio}
            onChange={ev => this.setState({ radio: ev.target.value })}
            options={[
              { value: 'dw', label: 'Doctor Who' },
              {
                value: 'dal',
                label: () => <span>Daleks</span>,
                hasError: true
              },
              {
                value: 'ms',
                label: 'The Master',
                disabled: true
              }
            ]}
          />
          <FormRow>
            <Checkbox
              name="all"
              checked={this.state.a && this.state.b}
              indeterminate={this.state.a !== this.state.b}
              onChange={() =>
                this.state.a && this.state.b
                  ? this.setState({ a: false, b: false })
                  : this.setState({ a: true, b: true })
              }
            >
              All
            </Checkbox>
          </FormRow>
          <FormRow>
            <Checkbox
              name="a"
              checked={this.state.a}
              onChange={ev => {
                this.setState({ a: ev.target.checked });
              }}
            >
              Checkbox A
            </Checkbox>
          </FormRow>
          <FormRow>
            <Checkbox
              name="b"
              checked={this.state.b}
              onChange={ev => {
                this.setState({ b: ev.target.checked });
              }}
            >
              Checkbox B
            </Checkbox>
          </FormRow>
          <FormRow>
            <Button id="save" type="submit" color="primary">
              Save
            </Button>
              <Button type="reset">Cancel</Button>
          </FormRow>
        </Form>
        <hr />
        <InputGroup>
          <TypeAheadInput
            id="ac"
            name="ac"
            items={['JavaScript', 'Java', 'PHP', 'Perl', 'C', 'C++', 'Rust']}
            value={this.state.value}
            onChange={ev => this.setState({ value: ev.target.value })}
          />
          <Button color="primary" outline icon>
            <Icon icon="feather-tag" />
          </Button>
        </InputGroup>
        <InputGroup size="lg" id="btns">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </InputGroup>
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="success">Four</Button>
          <Button size="lg" color="warning">
            Five
          </Button>
          <Button color="danger">Six</Button>
        </ButtonGroup>
        <TextArea id="ta" name="ta" rows={10} maxRows={15} />
        {/* */}
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
