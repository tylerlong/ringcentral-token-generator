import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Divider, Radio, Input, Form, Button, Modal, Tag, Spin } from 'antd'

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
      token: '',
      loading: false
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
              <Form.Item>
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
              <Divider />
              <Button type='primary' style={{ width: '100%' }} disabled={this.state.loading || this.state.clientId === '' || this.state.clientSecret === ''} onClick={e => {
                this.setState({ loading: true })
                global.startService(this.state.clientId, this.state.clientSecret, this.state.apiServer,
                    error => {
                      Modal.error({ title: 'Something is wrong', content: error })
                    },
                    redirectUri => {
                      this.setState({ current: 1, redirectUri, loading: false })
                    },
                    token => {
                      this.setState({ current: 2, token })
                    }
                  )
              }}>Next</Button>
            </Form>
          </React.Fragment>
        ) }
        { this.state.current !== 1 ? null : (
          <div>
            <h3>Step 1: configure RingCentral app and set its redirectUri to <Tag>{this.state.redirectUri}</Tag></h3>
            <h3>Step 2: trigger the 3-legged oauth flow</h3>
            <Divider />
            <Button style={{ width: '100%' }} onClick={e => {
              this.setState({ current: 0 })
              // stop service
            }}>Previous</Button>
          </div>
        ) }
        { this.state.current !== 2 ? null : (
          <div>
            <pre>
              { this.state.token }
            </pre>
            <p>Compressed version:</p>
            <pre>
              { JSON.stringify(JSON.parse(this.state.token)) }
            </pre>
            <Divider />
            <Button style={{ width: '100%' }} onClick={e => { this.setState({ current: 1 }) }}>Previous</Button>
          </div>
        ) }
        { this.state.loading ? <div className='central-spin'><Spin size='large' /></div> : null }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
