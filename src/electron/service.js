import express from 'express'
import RingCentral from 'ringcentral-js-concise'
import detectPort from 'detect-port'

import { startNgrok } from './ngrok'

export const startService = async (clientId, clientSecret, apiServer, errorCallback, redirectUriCallback, tokenCallback) => {
  const port = await detectPort(6789)
  startNgrok(port, publicUrl => {
    const redirectUri = `${publicUrl}/oauth`
    redirectUriCallback(redirectUri)
    const app = express()
    app.get('/oauth', async (req, res) => {
      const rc = new RingCentral(clientId, clientSecret, apiServer)
      try {
        await rc.authorize({ code: req.query.code, redirect_uri: redirectUri })
      } catch (e) {
        if (e.response) {
          errorCallback(JSON.stringify(e.response.data, null, 2))
        } else {
          errorCallback(e.message)
        }
        return
      }
      tokenCallback(JSON.stringify(rc.token(), null, 2))
      res.send('')
    })
    app.listen(port)
  })
}
