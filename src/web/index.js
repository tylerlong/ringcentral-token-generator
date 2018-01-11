import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Divider, Radio, Input, Form, Button, Modal } from 'antd'

import './index.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      apiServer: 'https://platform.devtest.ringcentral.com',
      clientId: '',
      clientSecret: '',
      redirectUri: '',
      token: ''
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
                <Radio.Group value={this.state.apiServer} onChange={e => { this.setState({ apiServer: e.target.value }) }}>
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
                <Button type='primary' style={{ width: '100%' }} disabled={this.state.clientId === '' || this.state.clientSecret === ''} onClick={e => {
                  global.startService(this.state.clientId, this.state.clientSecret, this.state.apiServer,
                    error => {
                      Modal.error({ title: 'Something is wrong', content: error })
                    },
                    redirectUri => {
                      this.setState({ current: 1, redirectUri })
                    },
                    token => {
                      this.setState({ current: 2, token })
                    }
                  )
                }}>Next</Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        ) }
        { this.state.current !== 1 ? null : (
          <div>
            Configure RingCentral app and set its redirectUri to <code>{this.state.redirectUri}</code>.
            <Button style={{ width: '100%' }} onClick={e => {
              this.setState({ current: 0 })
              // stop service
            }}>Previous</Button>
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
