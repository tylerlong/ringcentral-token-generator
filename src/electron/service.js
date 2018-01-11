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
          errorCallback(e.response.data)
        } else {
          errorCallback(e)
        }
        return
      }
      tokenCallback(rc.token())
      res.send('')
    })
    app.listen(port)
  })
}
