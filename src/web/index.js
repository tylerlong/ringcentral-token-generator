import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Divider, Radio, Input, Form, Button } from 'antd'

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
                <Button type='primary' style={{ width: '100%' }} disabled={this.state.clientId === '' || this.state.clientSecret === ''}>Next</Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        ) }
        { this.state.current !== 1 ? null : (
          <div>
            Hello world
          </div>
        ) }
        { this.state.current !== 2 ? null : (
          <div>
            Hello world
          </div>
        ) }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
