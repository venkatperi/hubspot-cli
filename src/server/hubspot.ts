import * as ClientOAuth2 from "client-oauth2";
import { config } from "../config";
import { Express } from 'express'

export default ({ name, app, baseUrl }: {
    name: String,
    app: Express,
    baseUrl: String
}) => {
    let cfg = config.get(`oauth2`)
    let host = config.get('host')
    let port = config.get('port')
    let authUrl = `${baseUrl}/${name}`
    let callbackUrl = `${authUrl}/callback`
    let redirectUri = `http://${host}:${port}${callbackUrl}`
    console.log(`callbackUrl: ${callbackUrl}`)
    console.log(`redirectUri: ${redirectUri}`)

    let opts: ClientOAuth2.Options = {
        clientId: cfg.clientId,
        clientSecret: cfg.clientSecret,
        accessTokenUri: cfg.urls.token,
        authorizationUri: cfg.urls.auth,
        redirectUri,
        scopes: cfg.scopes,
        state: 'aksdfj8988sdf22',
    }

    let auth = new ClientOAuth2(opts)

    app.get(`${baseUrl}/${name}`, (req, res) => {
        res.redirect(auth.code.getUri())
    })

    let resolve: any = null
    let reject: any = null

    app.get(callbackUrl, (req, res) => {
        console.log(req.originalUrl)
        auth.code.getToken(req.originalUrl, {
            body: {
                "grant_type": "authorization_code",
                "client_id": cfg.clientId || '',
                "client_secret": cfg.clientSecret || '',
            }
        })
            .then(resolve)
            .catch(reject)
    })

    return new Promise((res, rej) => {
        resolve = res
        reject = rej
    })
}
