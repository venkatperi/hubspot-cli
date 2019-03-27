import * as cors from 'cors'
import * as express from 'express'
import { NotFound } from 'http-errors'
import { config } from '../config'
import oauthHandler from './hubspot'

const openurl = require('openurl')

export function authenticate() {
    const app = express()
    const host = config.get('host')
    const port = config.get('port')

    app.use(cors())

    app.use((req, res, next) => {
        console.log(req.url)
        next()
    })

    let promise = oauthHandler({
        baseUrl: '/auth',
        name: 'hubspot',
        app
    })

    // annoying
    app.get('/favicon.ico', (req, res) => {
        res.send('')
    })

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new NotFound()
        return next(err)
    })


    app.listen(port, () => {
        console.info(`server started on port ${port} (${config.get('env')})`)
    })

    setTimeout(() => {
        openurl.open(`http://${host}:${port}/auth/hubspot`)
    }, 500)

    return promise

}
