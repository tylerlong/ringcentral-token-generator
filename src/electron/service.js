import express from 'express'
import RingCentral from 'ringcentral-js-concise'
import ngrok from 'ngrok'
import path from 'path'
import detectPort from 'detect-port'

export const startService = async (clientId, clientSecret, apiServer,
    errorCallback, redirectUriCallback, tokenCallback) => {
  const port = await detectPort(6789)
  ngrok.connect(port, (error, url) => {
    if (error) {
      errorCallback(error)
      return
    }
    const redirectUri = path.join(url, 'oauth')
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
