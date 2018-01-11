import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Divider, Radio, Input, Form, Button, Row, Col } from 'antd'

import './index.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      server: 'https://platform.devtest.ringcentral.com',
      clientId: '',
      clientSecret: ''
    }
  }

  render () {
    return (
      <div>
        <Steps current={this.state.current}>
          <Steps.Step title='Set credentials' />
          <Steps.Step title='Authorization code flow' />
          <Steps.Step title='Save the token' />
        </Steps>
        <Divider />
        { this.state.current !== 0 ? null : (
          <React.Fragment>
            <Form>
              <Form.Item style={{ textAlign: 'center' }}>
                <Radio.Group value={this.state.server} onChange={e => { this.setState({ server: e.target.value }) }}>
                  <Radio.Button value='https://platform.devtest.ringcentral.com'>Sandbox</Radio.Button>
                  <Radio.Button value='https://platform.ringcentral.com'>Production</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Input placeholder='Client ID' value={this.state.clientId} onChange={e => { this.setState({ clientId: e.target.value }) }} />
              </Form.Item>
              <Form.Item>
                <Input placeholder='Client Secret' value={this.state.clientSecret} onChange={e => { this.setState({ clientSecret: e.target.value }) }} />
              </Form.Item>
              <Form.Item>
                <Button type='primary' style={{ width: '100%' }} disabled={this.state.clientId === '' || this.state.clientSecret === ''} onClick={e => { this.setState({ current: 1 }) }}>Next</Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        ) }
        { this.state.current !== 1 ? null : (
          <div>
            Hello world
            <Row gutter={16}>
              <Col span={12}><Button style={{ width: '100%' }} onClick={e => { this.setState({ current: 0 }) }}>Previous</Button></Col>
              <Col span={12}><Button type='primary' style={{ width: '100%' }} onClick={e => { this.setState({ current: 2 }) }}>Next</Button></Col>
            </Row>
          </div>
        ) }
        { this.state.current !== 2 ? null : (
          <div>
            Hello world
            <Button style={{ width: '100%' }} onClick={e => { this.setState({ current: 1 }) }}>Previous</Button>
          </div>
        ) }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
