import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Divider, Radio } from 'antd'

import './index.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      server: 'https://platform.devtest.ringcentral.com'
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
          <Radio.Group value={this.state.server} onChange={e => {
            this.setState({ server: e.target.value })
          }}>
            <Radio.Button value='https://platform.devtest.ringcentral.com'>Sandbox</Radio.Button>
            <Radio.Button value='https://platform.ringcentral.com'>Production</Radio.Button>
          </Radio.Group>
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
